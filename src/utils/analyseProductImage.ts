import { GeminiAnalyseProductImageResponseType } from "@/types";
import { GoogleGenerativeAI } from "@google/generative-ai";

const errorMessage = "Image Analyzing Failed";

const onErrorReturnData = {
  "Product Name": errorMessage,
  "Item Description": errorMessage,
  "Item Specifications": [errorMessage],
  "About the Item": errorMessage,
};

const onSuccessReturnData = {
  "Product Name": "The North Face Borealis Backpack",
  "Item Description":
    "The North Face Borealis backpack is a versatile and durable daypack designed for everyday use and outdoor adventures.  It features a large main compartment, multiple pockets for organization, and comfortable padded shoulder straps.  The design incorporates a modern aesthetic with classic outdoor functionality.",
  "Item Specifications": [
    "Dimensions:  (Specific dimensions not available from image)",
    "Weight: (Specific weight not available from image)",
    "Materials:  Polyester (assumed based on appearance)",
    "Capacity: (Specific capacity not available from image)",
    "Color: Black",
  ],
  "About the Item":
    "This North Face Borealis backpack offers a balance of style and practicality. Its multiple compartments provide excellent organization, and the padded straps ensure comfortable carrying even with a full load. While the exact specifications like dimensions and weight are not visible in the provided image, the backpack is clearly constructed from durable material and designed for reliable performance.  It's suitable for students, commuters, and outdoor enthusiasts alike.",
};

export default async function analyseProductImage(
  image_url: string,
  test = true
) {
  if (test) {
    return new Promise<GeminiAnalyseProductImageResponseType>(
      (resolve, reject) => {
        const randomIndex = Math.round(Math.random() * 1);
        const response = {
          status: [200, 500][randomIndex],
        };
        setTimeout(() => {
          if (response.status === 200) {
            resolve(onSuccessReturnData);
          } else {
            reject(onErrorReturnData);
          }
        }, 2000);
      }
    );
  } else {
    try {
      console.log("Image Analyse Start");
      const fileType = image_url.split(".").reverse()[0];
      const prompt =
        "Respond ONLY in pure JSON format, following this typescript schema {Product Name: string;Item Description: string;Item Specifications: string[];About the Item: string;} without explanations. GIVE A PURE JSON FORMAT RESPONSE THAT CAN BE PASSED TO json.parse() directly without errors. Don't add the ```json before the object. Don't add ``` after the object also. As a professional e-commerce analyst, please analyze the provided product images and provide detailed information as follows:\n\nProduct Name: Clearly state the name of the product.\nItem Description: Provide a comprehensive description of the product, including all relevant details.\nItem Specifications: List all technical and physical attributes of the product, including dimensions , weight, materials, power requirements, and any other relevant specifications.\nAbout the Item: Offer a detailed overview of the product, highlighting key features, specifications, and any other pertinent information.";
      const genAI = new GoogleGenerativeAI(
        process.env.NEXT_PUBLIC_GEMINI_API_KEY as string
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const image = {
        inlineData: {
          mimeType: `image/${fileType}`,
          data: (await urlToBase64(image_url)) as string,
        },
      };

      const result = await model.generateContent([prompt, image]);
      const text = result.response.text();
      console.log("Image Analyse End");
      // console.log(text);
      const parsedText = JSON.parse(text);
      if (parsedText as GeminiAnalyseProductImageResponseType) {
        // console.log(parsedText);
        return parsedText as GeminiAnalyseProductImageResponseType;
      } else {
        return onErrorReturnData;
      }
    } catch (error) {
      console.error(error);
      return onErrorReturnData;
    }
  }
}

// this function turns a hosted image url like "https://ola.jpg" into something like this "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
// This is Base64 encoding
// A Base64-encoded image is an image that has been converted into a text format using Base64 encoding.
// Instead of storing the image as a regular file (.jpg, .png), it is transformed into a long string of characters that represents the binary data.

// "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..." => ["data:image/png;base64", "iVBORw0KGgoAAAANSUhEUgAA..."]
// The [1] is what is needed in the Gemini API
async function urlToBase64(imageUrl: string) {
  try {
    const response = await fetch(imageUrl, { mode: "cors" });
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (result) {
          resolve((result as string).split(",")[1]);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error converting URL to Base64:", error);
    return "";
  }
}
