import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from './store';
import { Product } from './types';

const mockProduct: Product = {
  id: 1,
  name: 'Test Burger',
  description: 'Delicious test burger',
  price: 25.9,
  category_id: 1,
  category_name: 'Burgers',
  image_url: 'test.jpg',
  active: true
};

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('starts with an empty cart', () => {
    expect(useCartStore.getState().items).toEqual([]);
  });

  it('adds an item to the cart', () => {
    useCartStore.getState().addItem(mockProduct);
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual({ ...mockProduct, quantity: 1 });
  });

  it('increments quantity when adding the same item', () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().addItem(mockProduct);
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  it('removes an item from the cart', () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().removeItem(mockProduct.id);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('updates item quantity', () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().updateQuantity(mockProduct.id, 5);
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it('removes item if quantity is set to 0', () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().updateQuantity(mockProduct.id, 0);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('clears the cart', () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
