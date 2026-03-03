import { Product, Category, Order } from './types';

const API_URL = '/api';

export const api = {
  async getCategories(): Promise<Category[]> {
    const res = await fetch(`${API_URL}/categories`);
    return res.json();
  },

  async getProducts(): Promise<Product[]> {
    const res = await fetch(`${API_URL}/products`);
    return res.json();
  },

  async createOrder(order: { items: any[]; total: number; userId?: number }): Promise<any> {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    return res.json();
  },

  async login(credentials: any): Promise<any> {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) throw new Error('Falha no login');
    return res.json();
  },

  async getAdminOrders(token: string): Promise<Order[]> {
    const res = await fetch(`${API_URL}/admin/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
};
