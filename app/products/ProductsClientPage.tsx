'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/product-card';
import ProductsFilter from '@/components/products-filter';
import { getAllProducts, getProductCategories } from '@/lib/products';
import type { Product } from '@/types/product';

export default function ProductsClientPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{
    search: string;
    categories: string[];
    tiers: string[];
    tags: string[];
    price: [number, number];
    rating: number;
    sort: string;
  }>({
    search: '',
    categories: [],
    tiers: [],
    tags: [],
    price: [0, 10000],
    rating: 0,
    sort: 'featured',
  });

  // Load products on mount
  useEffect(() => {
    const allProducts = getAllProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
    setCategories(getProductCategories());
  }, []);

  // Extract unique tiers and tags
  const tiers = Array.from(new Set(products.map((product) => product.tier)));
  const allTags = products.flatMap((product) => product.tags);
  const tags = Array.from(new Set(allTags));

  // Get min and max prices
  const prices = products.map((product) => product.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 10000;

  useEffect(() => {
    // Apply filters
    let result = [...products];

    // Search filter
    if (activeFilters.search) {
      const searchTerm = activeFilters.search.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.keyFeatures.processor.toLowerCase().includes(searchTerm) ||
          product.keyFeatures.graphics.toLowerCase().includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm) ||
          product.model.toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    if (activeFilters.categories.length > 0) {
      result = result.filter((product) =>
        activeFilters.categories.includes(product.category)
      );
    }

    // Tier filter
    if (activeFilters.tiers.length > 0) {
      result = result.filter((product) =>
        activeFilters.tiers.includes(product.tier)
      );
    }

    // Tags filter
    if (activeFilters.tags.length > 0) {
      result = result.filter((product) =>
        activeFilters.tags.some((tag) => product.tags.includes(tag))
      );
    }

    // Price filter
    result = result.filter(
      (product) =>
        product.price >= activeFilters.price[0] &&
        product.price <= activeFilters.price[1]
    );

    // Rating filter
    if (activeFilters.rating > 0) {
      result = result.filter(
        (product) => product.ratings.averageRating >= activeFilters.rating
      );
    }

    // Sort
    switch (activeFilters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating-desc':
        result.sort(
          (a, b) => b.ratings.averageRating - a.ratings.averageRating
        );
        break;
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    setFilteredProducts(result);
  }, [activeFilters, products]);

  const handleFilterChange = (filters: any) => {
    setActiveFilters((prev) => ({
      ...prev,
      ...filters,
    }));
  };

  const handleSearchChange = (search: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      search,
    }));
  };

  const handleResetFilters = () => {
    setActiveFilters({
      search: '',
      categories: [],
      tiers: [],
      tags: [],
      price: [minPrice, maxPrice],
      rating: 0,
      sort: 'featured',
    });
  };

  const clearFilter = (type: string, value?: string) => {
    if (type === 'search') {
      setActiveFilters((prev) => ({ ...prev, search: '' }));
    } else if (type === 'category' && value) {
      setActiveFilters((prev) => ({
        ...prev,
        categories: prev.categories.filter((c) => c !== value),
      }));
    } else if (type === 'tier' && value) {
      setActiveFilters((prev) => ({
        ...prev,
        tiers: prev.tiers.filter((t) => t !== value),
      }));
    } else if (type === 'tag' && value) {
      setActiveFilters((prev) => ({
        ...prev,
        tags: prev.tags.filter((f) => f !== value),
      }));
    } else if (type === 'price') {
      setActiveFilters((prev) => ({ ...prev, price: [minPrice, maxPrice] }));
    } else if (type === 'rating') {
      setActiveFilters((prev) => ({ ...prev, rating: 0 }));
    } else if (type === 'all') {
      handleResetFilters();
    }
  };

  // Count active filters
  const activeFilterCount =
    (activeFilters.search ? 1 : 0) +
    activeFilters.categories.length +
    activeFilters.tiers.length +
    activeFilters.tags.length +
    (activeFilters.price[0] > minPrice || activeFilters.price[1] < maxPrice
      ? 1
      : 0) +
    (activeFilters.rating > 0 ? 1 : 0);

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
        </div>
        <div className="container relative z-10 mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200 mb-6">
              High-Performance Computing Solutions
            </h1>
            <p className="text-xl text-zinc-400 mb-8">
              Explore our range of custom-built systems designed for gaming,
              content creation, and enterprise applications. Each system is
              meticulously crafted for exceptional performance and reliability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90">
                Gaming PCs
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90">
                Workstations
              </Button>
              <Button className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:opacity-90">
                Servers
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 relative">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden md:block w-full md:w-80 shrink-0">
              <ProductsFilter
                categories={categories}
                tiers={tiers}
                tags={tags}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onFilterChange={handleFilterChange}
                onSearchChange={handleSearchChange}
                onReset={handleResetFilters}
              />
            </div>

            {/* Mobile Filter Button */}
            <div className="md:hidden flex justify-between items-center mb-4">
              <Button
                variant="outline"
                className="border-zinc-700 hover:bg-zinc-800"
                onClick={() => setShowFilters(true)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </Button>

              <p className="text-zinc-400 text-sm">
                {filteredProducts.length}{' '}
                {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>

            {/* Mobile Filters Sidebar */}
            {showFilters && (
              <div className="fixed inset-0 bg-black/80 z-50 md:hidden flex">
                <div className="w-full max-w-xs ml-auto h-full overflow-y-auto">
                  <ProductsFilter
                    categories={categories}
                    tiers={tiers}
                    tags={tags}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    onFilterChange={handleFilterChange}
                    onSearchChange={handleSearchChange}
                    onReset={handleResetFilters}
                    isMobile={true}
                    onClose={() => setShowFilters(false)}
                  />
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              {/* Active Filters */}
              {activeFilterCount > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">Active Filters</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-zinc-400 hover:text-white"
                      onClick={() => clearFilter('all')}
                    >
                      Clear All
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeFilters.search && (
                      <Badge
                        variant="outline"
                        className="border-zinc-700 text-zinc-300 px-3 py-1 flex items-center gap-1"
                      >
                        Search: {activeFilters.search}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1 hover:bg-transparent"
                          onClick={() => clearFilter('search')}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    {activeFilters.categories.map((category) => (
                      <Badge
                        key={category}
                        variant="outline"
                        className="border-purple-500 text-purple-400 px-3 py-1 flex items-center gap-1"
                      >
                        Category: {category}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1 hover:bg-transparent"
                          onClick={() => clearFilter('category', category)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                    {activeFilters.tiers.map((tier) => (
                      <Badge
                        key={tier}
                        variant="outline"
                        className="border-blue-500 text-blue-400 px-3 py-1 flex items-center gap-1"
                      >
                        Tier: {tier}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1 hover:bg-transparent"
                          onClick={() => clearFilter('tier', tier)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                    {activeFilters.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-cyan-500 text-cyan-400 px-3 py-1 flex items-center gap-1"
                      >
                        Tag: {tag}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1 hover:bg-transparent"
                          onClick={() => clearFilter('tag', tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                    {(activeFilters.price[0] > minPrice ||
                      activeFilters.price[1] < maxPrice) && (
                      <Badge
                        variant="outline"
                        className="border-teal-500 text-teal-400 px-3 py-1 flex items-center gap-1"
                      >
                        Price: ${activeFilters.price[0].toLocaleString()} - $
                        {activeFilters.price[1].toLocaleString()}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1 hover:bg-transparent"
                          onClick={() => clearFilter('price')}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    {activeFilters.rating > 0 && (
                      <Badge
                        variant="outline"
                        className="border-purple-500 text-purple-400 px-3 py-1 flex items-center gap-1"
                      >
                        Rating: Min {activeFilters.rating}/5
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1 hover:bg-transparent"
                          onClick={() => clearFilter('rating')}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Results Count - Desktop */}
              <div className="hidden md:flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">All Products</h2>
                <p className="text-zinc-400">
                  {filteredProducts.length}{' '}
                  {filteredProducts.length === 1 ? 'product' : 'products'}
                </p>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-12 text-center">
                  <h3 className="text-xl font-medium mb-2">
                    No products found
                  </h3>
                  <p className="text-zinc-400 mb-6">
                    Try adjusting your filters or search criteria to find what
                    you're looking for.
                  </p>
                  <Button
                    variant="outline"
                    className="border-zinc-700 hover:bg-zinc-800"
                    onClick={handleResetFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
