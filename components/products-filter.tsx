'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Search, SlidersHorizontal, X, Star } from 'lucide-react';

interface ProductsFilterProps {
  categories: string[];
  tiers: string[];
  tags: string[];
  minPrice: number;
  maxPrice: number;
  onFilterChange: (filters: any) => void;
  onSearchChange: (search: string) => void;
  onReset: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

export default function ProductsFilter({
  categories,
  tiers,
  tags,
  minPrice,
  maxPrice,
  onFilterChange,
  onSearchChange,
  onReset,
  isMobile = false,
  onClose,
}: ProductsFilterProps) {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);
  const [rating, setRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState('featured');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearchChange(e.target.value);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter((c) => c !== category);
    setSelectedCategories(newCategories);
    applyFilters(
      newCategories,
      selectedTiers,
      selectedTags,
      priceRange,
      rating,
      sortBy
    );
  };

  const handleTierChange = (tier: string, checked: boolean) => {
    const newTiers = checked
      ? [...selectedTiers, tier]
      : selectedTiers.filter((t) => t !== tier);
    setSelectedTiers(newTiers);
    applyFilters(
      selectedCategories,
      newTiers,
      selectedTags,
      priceRange,
      rating,
      sortBy
    );
  };

  const handleTagChange = (tag: string, checked: boolean) => {
    const newTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(newTags);
    applyFilters(
      selectedCategories,
      selectedTiers,
      newTags,
      priceRange,
      rating,
      sortBy
    );
  };

  const handlePriceChange = (value: number[]) => {
    const newPriceRange: [number, number] = [value[0], value[1]];
    setPriceRange(newPriceRange);
    applyFilters(
      selectedCategories,
      selectedTiers,
      selectedTags,
      newPriceRange,
      rating,
      sortBy
    );
  };

  const handleRatingChange = (value: number[]) => {
    setRating(value[0]);
    applyFilters(
      selectedCategories,
      selectedTiers,
      selectedTags,
      priceRange,
      value[0],
      sortBy
    );
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    applyFilters(
      selectedCategories,
      selectedTiers,
      selectedTags,
      priceRange,
      rating,
      value
    );
  };

  const applyFilters = (
    categories: string[],
    tiers: string[],
    tags: string[],
    price: [number, number],
    rating: number,
    sort: string
  ) => {
    onFilterChange({
      categories,
      tiers,
      tags,
      price,
      rating,
      sort,
    });
  };

  const handleReset = () => {
    setSearch('');
    setSelectedCategories([]);
    setSelectedTiers([]);
    setSelectedTags([]);
    setPriceRange([minPrice, maxPrice]);
    setRating(0);
    setSortBy('featured');
    onReset();
  };

  return (
    <div
      className={`bg-zinc-900 border border-zinc-800 rounded-lg p-6 ${
        isMobile ? 'w-full h-full' : 'w-full sticky top-24'
      }`}
    >
      {isMobile && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold flex items-center">
            <SlidersHorizontal className="mr-2 h-5 w-5" /> Filters
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      <div className="space-y-6">
        {/* Search */}
        <div>
          <Label htmlFor="search" className="text-sm font-medium mb-2 block">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              id="search"
              placeholder="Search products..."
              value={search}
              onChange={handleSearchChange}
              className="pl-9 bg-zinc-800 border-zinc-700"
            />
          </div>
        </div>

        {/* Sort */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Sort By</Label>
          <RadioGroup
            value={sortBy}
            onValueChange={handleSortChange}
            className="space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="featured"
                id="featured"
                className="border-zinc-700"
              />
              <Label
                htmlFor="featured"
                className="text-sm font-normal cursor-pointer"
              >
                Featured
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="price-asc"
                id="price-asc"
                className="border-zinc-700"
              />
              <Label
                htmlFor="price-asc"
                className="text-sm font-normal cursor-pointer"
              >
                Price: Low to High
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="price-desc"
                id="price-desc"
                className="border-zinc-700"
              />
              <Label
                htmlFor="price-desc"
                className="text-sm font-normal cursor-pointer"
              >
                Price: High to Low
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="name-asc"
                id="name-asc"
                className="border-zinc-700"
              />
              <Label
                htmlFor="name-asc"
                className="text-sm font-normal cursor-pointer"
              >
                Name: A to Z
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="rating-desc"
                id="rating-desc"
                className="border-zinc-700"
              />
              <Label
                htmlFor="rating-desc"
                className="text-sm font-normal cursor-pointer"
              >
                Highest Rated
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="newest"
                id="newest"
                className="border-zinc-700"
              />
              <Label
                htmlFor="newest"
                className="text-sm font-normal cursor-pointer"
              >
                Newest First
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Price Range</Label>
          <div className="pt-4 px-2">
            <Slider
              defaultValue={[minPrice, maxPrice]}
              min={minPrice}
              max={maxPrice}
              step={100}
              value={[priceRange[0], priceRange[1]]}
              onValueChange={handlePriceChange}
              className="mb-6"
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-400">
                ${priceRange[0].toLocaleString()}
              </span>
              <span className="text-sm text-zinc-400">
                ${priceRange[1].toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <Label className="text-sm font-medium mb-2 block">
            Minimum Rating
          </Label>
          <div className="pt-4 px-2">
            <Slider
              defaultValue={[0]}
              min={0}
              max={5}
              step={1}
              value={[rating]}
              onValueChange={handleRatingChange}
              className="mb-6"
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-400">Min: {rating}/5</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < rating
                        ? 'fill-yellow-500 text-yellow-500'
                        : 'text-zinc-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Categories</Label>
          <div className="space-y-1">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category, checked as boolean)
                  }
                  className="border-zinc-700 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <Label
                  htmlFor={`category-${category}`}
                  className="text-sm font-normal capitalize cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Tiers */}
        <div>
          <Label className="text-sm font-medium mb-2 block">
            Performance Tier
          </Label>
          <div className="space-y-1">
            {tiers.map((tier) => (
              <div key={tier} className="flex items-center space-x-2">
                <Checkbox
                  id={`tier-${tier}`}
                  checked={selectedTiers.includes(tier)}
                  onCheckedChange={(checked) =>
                    handleTierChange(tier, checked as boolean)
                  }
                  className="border-zinc-700 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <Label
                  htmlFor={`tier-${tier}`}
                  className="text-sm font-normal capitalize cursor-pointer"
                >
                  {tier}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Tags</Label>
          <div className="space-y-1 max-h-40 overflow-y-auto pr-2">
            {tags.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={`tag-${tag}`}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={(checked) =>
                    handleTagChange(tag, checked as boolean)
                  }
                  className="border-zinc-700 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <Label
                  htmlFor={`tag-${tag}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {tag}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          className="w-full border-zinc-700 hover:bg-zinc-800"
          onClick={handleReset}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
