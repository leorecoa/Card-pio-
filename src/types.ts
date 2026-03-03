export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface Category {
  id: number;
  name: string;
  active: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: number;
  category_name?: string;
  active: boolean;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  user_id: number | null;
  user_name?: string;
  status: 'pending' | 'preparing' | 'delivered' | 'cancelled';
  total: number;
  created_at: string;
}

export interface CartItem extends Product {
  quantity: number;
}
