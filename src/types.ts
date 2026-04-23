export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  isVeteran?: boolean;
  description: string;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}
