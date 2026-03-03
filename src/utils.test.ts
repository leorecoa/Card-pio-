import { describe, it, expect } from 'vitest';
import { formatCurrency, cn } from './utils';

describe('utils', () => {
  describe('formatCurrency', () => {
    it('formats numbers as BRL currency', () => {
      const result = formatCurrency(10.5);
      // Use a regex to match the currency format, as space characters can vary (non-breaking space)
      expect(result).toMatch(/R\$\s?10,50/);
    });

    it('formats zero correctly', () => {
      const result = formatCurrency(0);
      expect(result).toMatch(/R\$\s?0,00/);
    });
  });

  describe('cn', () => {
    it('merges tailwind classes correctly', () => {
      expect(cn('px-2', 'py-2')).toBe('px-2 py-2');
      expect(cn('px-2', 'px-4')).toBe('px-4');
      expect(cn('text-red-500', { 'bg-blue-500': true, 'bg-green-500': false })).toBe('text-red-500 bg-blue-500');
    });
  });
});
