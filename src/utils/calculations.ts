import type { Product, CartItem, StockStatus } from '../types/product';

/**
 * Calculates individual product subtotal: Price * Quantity
 */
export function calculateSubtotal(price: number, quantity: number): number {
  const p = Number(price) || 0;
  const q = Number(quantity) || 0;
  return p * q;
}

/**
 * Calculates overall inventory value across all products using Array.prototype.reduce()
 * Subtotal = Sum of (product.price * product.quantity)
 */
export function calculateOverallTotal(products: Product[]): number {
  return products.reduce((total, product) => {
    return total + (Number(product.price) || 0) * (Number(product.quantity) || 0);
  }, 0);
}

/**
 * Calculates overall total quantity in inventory
 */
export function calculateTotalStockQuantity(products: Product[]): number {
  return products.reduce((acc, p) => acc + (Number(p.quantity) || 0), 0);
}

/**
 * Returns the stock status based on CCDI requirement:
 * - Low Stock highlight if quantity < 5 and > 0
 * - In Stock if quantity >= 5
 * - Out of Stock if quantity === 0
 */
export function getStockStatus(quantity: number): StockStatus {
  const q = Number(quantity) || 0;
  if (q <= 0) return 'Out of Stock';
  if (q < 5) return 'Low Stock';
  return 'In Stock';
}

/**
 * Counts how many products have low stock (< 5 and > 0) or are out of stock
 */
export function calculateLowStockCount(products: Product[]): number {
  return products.filter((p) => p.quantity < 5).length;
}

/**
 * Calculates total cost of items in the shopping cart using .reduce()
 */
export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/**
 * Calculates total count of items in the shopping cart
 */
export function calculateCartItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

