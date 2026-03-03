import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import { BrowserRouter } from 'react-router-dom';
import { Product } from '../types';
import { useCartStore } from '../store';

// Mock the store
vi.mock('../store', () => ({
  useCartStore: vi.fn(),
}));

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

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    // Mock useCartStore implementation
    (useCartStore as any).mockReturnValue(vi.fn());

    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Burger')).toBeInTheDocument();
    expect(screen.getByText(/R\$\s?25,90/)).toBeInTheDocument();
    expect(screen.getByText('Burgers')).toBeInTheDocument();
  });

  it('calls addItem when the add button is clicked', () => {
    const addItemMock = vi.fn();
    (useCartStore as any).mockImplementation((selector: any) => selector({ addItem: addItemMock }));

    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );

    const addButton = screen.getByRole('button');
    fireEvent.click(addButton);

    expect(addItemMock).toHaveBeenCalledWith(mockProduct);
  });
});
