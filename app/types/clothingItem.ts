
export interface ClothingItem {
  id: number;
  title: string;
  brand: string;
  imageUrl: string;
  owned?: boolean;
  size?: string;
  price?: number;
  created_at?: string;
  user_id?: string;
}

export interface FilterState {
    owned: boolean | null; // null = all, true = owned, false = wishlist
    brand: string;
    maxPrice: number;
}


