// POS Types
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  popular?: boolean;
  discount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export type ViewMode = "grid" | "list";
