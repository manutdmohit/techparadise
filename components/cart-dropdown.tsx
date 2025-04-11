'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, Plus, Minus, X } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { formatPrice } from '@/lib/utils';
import { getProductById } from '@/lib/products';

export default function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, clearCart, itemCount, subtotal } =
    useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close the menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={toggleCart}
        aria-label="Shopping cart"
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs text-white">
            {itemCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          ></div>
          <div className="absolute right-0 top-12 z-50 w-80 rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Your Cart</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-400 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {items.length === 0 ? (
              <div className="py-8 text-center">
                <ShoppingCart className="mx-auto h-12 w-12 text-zinc-600 mb-4" />
                <p className="text-zinc-400">Your cart is empty</p>
                <Button
                  className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90"
                  onClick={() => setIsOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <div className="max-h-80 overflow-y-auto space-y-4 mb-4 pr-1">
                  {items.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;

                    return (
                      <div
                        key={item.productId}
                        className="flex gap-3 border-b border-zinc-800 pb-4"
                      >
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-zinc-800">
                          <Image
                            src={product.thumbnail || '/placeholder.svg'}
                            alt={product.name}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between text-sm font-medium">
                            <Link
                              href={`/products/${product.slug}`}
                              className="hover:text-purple-400"
                              onClick={() => setIsOpen(false)}
                            >
                              {product.name}
                            </Link>
                            <p className="ml-4">
                              ${formatPrice(product.price * item.quantity)}
                            </p>
                          </div>
                          <p className="text-xs text-zinc-500 capitalize">
                            {product.category}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-zinc-700 rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-none text-zinc-400 hover:text-white"
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.quantity - 1
                                  )
                                }
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-none text-zinc-400 hover:text-white"
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.quantity + 1
                                  )
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-zinc-400 hover:text-red-500"
                              onClick={() => removeItem(item.productId)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-zinc-800 pt-4">
                  <div className="flex justify-between text-sm mb-4">
                    <p className="text-zinc-400">Subtotal</p>
                    <p className="font-medium">${formatPrice(subtotal)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-zinc-700 hover:bg-zinc-800"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                    <Link
                      href="/checkout"
                      className="flex-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90"
                      >
                        Checkout
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
