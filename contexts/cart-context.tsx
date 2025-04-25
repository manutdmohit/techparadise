'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { toast } from 'sonner';
import { getProductById } from '@/lib/products';
import type { Product, CartItem } from '@/types/product';

type CartContextType = {
  items: CartItem[];
  addItem: (product: any, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Failed to parse cart from localStorage:', error);
        }
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items]);

  const addItem = async (product: Product, quantity = 1) => {
    if (quantity < 1 || isAdding) return;

    setIsAdding(true);

    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.productId === product.id
      );
      const existingQuantity = existingItem ? existingItem.quantity : 0;
      const totalQuantity = existingQuantity + quantity;

      if (totalQuantity > product.quantity) {
        toast.error(`Only ${product.quantity} items available in stock`, {
          className: 'bg-zinc-900 border-zinc-800 text-white',
        });
        return prevItems; // No update
      }

      let updatedItems: CartItem[];

      if (existingItem) {
        updatedItems = prevItems.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: totalQuantity }
            : item
        );

        toast.success(`${product.name} quantity updated to ${totalQuantity}`, {
          className: 'bg-zinc-900 border-zinc-800 text-white',
        });
      } else {
        updatedItems = [
          ...prevItems,
          {
            productId: product.id,
            quantity,
            price: product.price,
          },
        ];

        toast.success(`${product.name} added to cart`, {
          className: 'bg-green-900 border-zinc-800 text-white',
        });
      }

      return updatedItems;
    });

    setIsAdding(false);
  };

  const removeItem = async (productId: string) => {
    const product = await getProductById(productId);
    if (product) {
      toast.success(`${product.name} removed from cart`, {
        className: 'bg-zinc-900 border-zinc-800 text-white',
      });
    }
    setItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const product = getProductById(productId);

    if (quantity < 1) {
      removeItem(productId);
      return;
    }

    if (product && quantity > product.quantity) {
      toast.error(`Only ${product.quantity} items available in stock`, {
        className: 'bg-zinc-900 border-zinc-800 text-white',
      });
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.success('Cart cleared', {
      className: 'bg-zinc-900 border-zinc-800 text-white',
    });
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
