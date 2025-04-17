import bags_products from "@/static-data/products";

interface HeroCards {
    src: {
        src: string;
        vendor_id: number;
    };
    id: string;
    top: string;
    rotation: string;
    zIndex: string;
}

const cards = [
  {
    id: "card1",
    top: "top-[35px]",
    rotation: "rotate-[-20deg]",
    zIndex: "z-[1]",
    src: "https://picsum.photos/200/300?random=1",
  },
  {
    id: "card2",
    top: "top-[-3px]",
    rotation: "rotate-[-6deg]",
    zIndex: "z-[2]",
    src: "https://picsum.photos/200/300?random=2",
  },
  {
    id: "card3",
    top: "top-[-10px]",
    rotation: "rotate-[0deg]", //middle card
    zIndex: "z-[3]",
    src: "https://picsum.photos/200/300?random=3",
  },
  {
    id: "card4",
    top: "top-[-3px]",
    rotation: "rotate-[6deg]",
    zIndex: "z-[4]",
    src: "https://picsum.photos/200/300?random=4",
  },
  {
    id: "card5",
    top: "top-[35px]",
    rotation: "rotate-[20deg]",
    zIndex: "z-[5]",
    src: "https://picsum.photos/200/300?random=5",
  },
];

async function get5HeroProducts(): Promise< ({top5: HeroCards[] })> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const top5Products = bags_products
        .slice(0, 5)
        .map((image) => ({ src: image.images[0], vendor_id: image.vendor_id }));
      const _cardsCopy = cards.map((item, index) => ({
        ...item,
        src: top5Products[index],
      }));
      resolve({ top5: _cardsCopy });
    }, 2000);
  });
}

export default get5HeroProducts;
