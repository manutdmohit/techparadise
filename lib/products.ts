import type { Product } from '@/types/product';
import { products } from '@/data/products';

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return getAllProducts().find((product) => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return getAllProducts().filter((product) => product.category === category);
}

export function getProductCategories(): string[] {
  const categories = new Set<string>();
  getAllProducts().forEach((product) => {
    categories.add(product.category);
  });
  return Array.from(categories);
}

export function getFilteredProducts(
  search = '',
  category = '',
  minPrice = 0,
  maxPrice: number = Number.POSITIVE_INFINITY,
  minRating = 0
): Product[] {
  return getAllProducts().filter((product) => {
    const matchesSearch =
      search === '' ||
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === '' || product.category === category;

    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

    const matchesRating = product.ratings.averageRating >= minRating;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });
}
