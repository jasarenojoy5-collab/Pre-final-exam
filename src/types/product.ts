export type ProductCategory = 
  | 'All Products'
  | 'Electronics'
  | 'Accessories'
  | 'Stationery & Crafts'
  | 'Home & Workspace';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  quantity: number;
  image: string;
  description: string;
  specifications: string[];
  rating: number;
  featured?: boolean;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  maxStock: number;
}

export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface ProductFormData {
  name: string;
  category: ProductCategory;
  price: number | '';
  quantity: number | '';
  image: string;
  description: string;
  specifications: string;
  rating: number;
}

