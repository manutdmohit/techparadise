'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import type { Product } from '@/types/product';

interface AddToCartButtonProps {
  product: Product;
  showQuantity?: boolean;
}

export function AddToCartButton({
  product,
  showQuantity = true,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (product.inStock) {
      addItem(product.id, quantity);
      setQuantity(1); // Reset quantity after adding to cart
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {showQuantity && (
        <div className="flex items-center">
          <span className="mr-4 text-zinc-400">Quantity:</span>
          <div className="flex items-center border border-zinc-700 rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-none text-zinc-400 hover:text-white"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-none text-zinc-400 hover:text-white"
              onClick={increaseQuantity}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className="ml-4 text-zinc-400">
            {product.inStock ? `${product.quantity} in stock` : 'Out of stock'}
          </span>
        </div>
      )}

      <Button
        size="lg"
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 w-full"
        disabled={!product.inStock}
        onClick={handleAddToCart}
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        {product.inStock ? 'Add to Cart' : 'Sold Out'}
      </Button>
    </div>
  );
}
