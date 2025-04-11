'use client';

import type React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCart();

  const currentItem = items.find((item) => item.productId === product.id);
  const maxReached = currentItem && currentItem.quantity >= product.quantity;

  const isDiscounted =
    product.originalPrice && product.originalPrice > product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    e.stopPropagation(); // Stop event propagation

    if (product.inStock) {
      addItem(product, 1);
    }
  };

  return (
    <Card className="h-full overflow-hidden group relative">
      <Link href={`/products/${product.slug}`} className="block h-full">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.thumbnail || '/placeholder.svg?height=600&width=600'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {isDiscounted && (
            <Badge className="absolute top-2 right-2 bg-red-600 hover:bg-red-700">
              {product.discountPercentage}% OFF
            </Badge>
          )}
          {product.isFeatured && (
            <Badge className="absolute top-2 left-2 bg-purple-600 hover:bg-purple-700">
              Featured
            </Badge>
          )}
          {!product.inStock && (
            <Badge
              variant="outline"
              className="absolute top-2 right-2 border-red-500 text-red-500 bg-black/50"
            >
              Out of Stock
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold line-clamp-1">{product.name}</h3>
            <Badge
              variant="outline"
              className="capitalize border-zinc-700 text-zinc-400"
            >
              {product.category}
            </Badge>
          </div>

          <div className="flex items-center mb-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.ratings.averageRating)
                      ? 'fill-current'
                      : 'text-zinc-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-zinc-500 ml-1">
              ({product.ratings.reviewCount})
            </span>
          </div>

          <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-auto pt-2 border-t border-zinc-800">
            <div className="flex flex-col">
              <span className="text-xl font-bold">
                ${formatPrice(product.price)}
              </span>
              {isDiscounted && (
                <span className="text-sm text-zinc-500 line-through">
                  ${formatPrice(product.originalPrice || 0)}
                </span>
              )}
            </div>
            <Button
              size="sm"
              className="bg-purple-600 hover:bg-purple-700"
              disabled={!product.inStock || maxReached}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {product.inStock
                ? maxReached
                  ? 'Max Reached'
                  : 'Add to Cart'
                : 'Sold Out'}
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
