
export interface ClothingItem {
  id: number;
  title: string;
  brand: string;
  imageUrl: string;
  status?: "owned" | "wishlist";
  size?: string;
  price?: number;
  created_at?: string;
  user_id?: string;
}

