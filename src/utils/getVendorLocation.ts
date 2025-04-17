import axios from "axios";

interface LocationType {
  status?: string;
  country: string;
  city: string;
  regionName: string;
}

export async function getVendorLocation() {
  try {
    const response = await axios.get(`http://ip-api.com/json`);
    const data = response.data as LocationType;
    if (data.status) {
      return {
        country: data.country,
        city: data.city,
        state: data.regionName,
      };
    } else {
      return {
        country: "Unknown",
        city: "Unknown",
        state: "Unknown",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      country: "Unknown",
      city: "Unknown",
      state: "Unknown",
    };
  }
}
