
export interface ClothingItem {
  title: string;
  brand: string;
  imageUrl: string;
  status?: "owned" | "wishlist";
  category?: string;
  size?: string;
  color?: string;
  price?: number;
}

export const items: Record<string, ClothingItem> = {
  jeans: {
    title: "Classic Blue Jeans",
    brand: "Weekday",
    size:
      "29/30",
    imageUrl: "/styles/flame.png",
  },
  Tshirt: {
    title: "Long Sleeve T-Shirt",
    brand: "Weekday",
    size:
      "S",
    imageUrl: "/styles/flame.png",
    status: "owned",
  },
  panties: {
    title: "Everyday panties",
    brand: "Lager 157",
    size:
      "S",
    imageUrl: "/styles/flame.png",
    status: "owned",
  },
  Shirts: {
    title: "Casual Shirt",
    brand: "Wera",
    size:
      "S",
    imageUrl: "/styles/flame.png",
    status: "owned",
  },
  jumpers: {
    title: "Cozy Jumper",
    brand: "Åhléns",
    size:
      "S",
    imageUrl: "/styles/flame.png",
    status: "owned",
  },
};
