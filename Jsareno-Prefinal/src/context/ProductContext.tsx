import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product, CartItem } from '../types/product';
import { DEFAULT_PRODUCTS } from '../data/defaultProducts';
import { calculateOverallTotal, calculateCartTotal, calculateCartItemCount, calculateLowStockCount } from '../utils/calculations';
import confetti from 'canvas-confetti';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface ProductContextType {
  products: Product[];
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addProduct: (productData: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProductQuantity: (id: string, delta: number) => void;
  deleteProduct: (id: string) => void;
  addToCart: (product: Product, qty?: number) => boolean;
  updateCartItemQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  resetToDefaults: () => void;
  overallInventoryTotal: number;
  totalProductsCount: number;
  lowStockCount: number;
  cartTotal: number;
  cartItemCount: number;
  toasts: Toast[];
  removeToast: (id: string) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'pastelstock_products_v1',
  CART: 'pastelstock_cart_v1',
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load products from localStorage or default
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved products:', e);
    }
    return DEFAULT_PRODUCTS;
  });

  // Load cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse saved cart:', e);
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Persist products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products:', e);
    }
  }, [products]);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cart]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add a new product dynamically
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Added "${newProduct.name}" to inventory! ✨`, 'success');

    // Trigger sweet confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C5EFFA', '#87A9C2', '#FFFDD0', '#F5D7E5'],
      });
    } catch (e) {
      // ignore
    }
  };

  // Update product inventory quantity (+1 / -1 or custom delta)
  const updateProductQuantity = (id: string, delta: number) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, (item.quantity || 0) + delta);
          return {
            ...item,
            quantity: newQty,
          };
        }
        return item;
      })
    );
  };

  // Delete product
  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((c) => c.productId !== id));
    showToast(`Removed "${target?.name || 'Product'}" from catalogue`, 'info');
  };

  // Add product to cart with conditional checks
  const addToCart = (product: Product, qty: number = 1): boolean => {
    if (product.quantity <= 0) {
      showToast(`"${product.name}" is currently out of stock!`, 'warning');
      return false;
    }

    let addedSuccessfully = false;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.productId === product.id);
      if (existing) {
        const potentialQty = existing.quantity + qty;
        if (potentialQty > product.quantity) {
          showToast(`Cannot add more than available stock (${product.quantity})`, 'warning');
          return prevCart;
        }
        addedSuccessfully = true;
        return prevCart.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: potentialQty, maxStock: product.quantity }
            : item
        );
      } else {
        if (qty > product.quantity) {
          showToast(`Cannot add more than available stock (${product.quantity})`, 'warning');
          return prevCart;
        }
        addedSuccessfully = true;
        const newItem: CartItem = {
          id: `cart-${product.id}-${Date.now()}`,
          productId: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          quantity: qty,
          image: product.image,
          maxStock: product.quantity,
        };
        return [...prevCart, newItem];
      }
    });

    if (addedSuccessfully) {
      showToast(`Added ${qty}x "${product.name}" to cart ♡`, 'success');
      try {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.7 },
          colors: ['#C5EFFA', '#F5D7E5', '#FFFDD0'],
        });
      } catch (e) {
        // ignore
      }
    }

    return addedSuccessfully;
  };

  // Update item quantity in cart
  const updateCartItemQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null; // remove if reaches 0
            if (newQty > item.maxStock) {
              showToast(`Stock limit reached for ${item.name}`, 'warning');
              return item;
            }
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove from cart
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from cart', 'info');
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    showToast('Shopping cart cleared', 'info');
  };

  // Reset products to default
  const resetToDefaults = () => {
    setProducts(DEFAULT_PRODUCTS);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
    showToast('Reset catalogue to original default products! 🌸', 'info');
  };

  // Computed totals using .reduce() as required by CCDI Exam specification
  const overallInventoryTotal = calculateOverallTotal(products);
  const totalProductsCount = products.length;
  const lowStockCount = calculateLowStockCount(products);
  const cartTotal = calculateCartTotal(cart);
  const cartItemCount = calculateCartItemCount(cart);

  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        isCartOpen,
        setIsCartOpen,
        addProduct,
        updateProductQuantity,
        deleteProduct,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        resetToDefaults,
        overallInventoryTotal,
        totalProductsCount,
        lowStockCount,
        cartTotal,
        cartItemCount,
        toasts,
        removeToast,
        showToast,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
