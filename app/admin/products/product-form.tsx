'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import type { Product } from '@/types/product';
import { products } from '@/data/products';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';

interface ProductFormProps {
  productId?: string;
  isEditing?: boolean;
}

export default function ProductForm({
  productId,
  isEditing = false,
}: ProductFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    inStock: false,
    features: [],
    specs: {},
    images: [],
    isFeatured: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [featureInput, setFeatureInput] = useState('');
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (isEditing && productId) {
      // Find the product by ID
      const product = products.find((p) => p.id === Number.parseInt(productId));
      if (product) {
        setFormData(product);
      } else {
        toast.error('Product not found.', {
          description: "The product you're trying to edit doesn't exist.",
        });
        router.push('/admin/products');
      }
    }
  }, [isEditing, productId, router, toast]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'price' || name === 'stock' ? Number.parseFloat(value) : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...(prev.features || []), featureInput.trim()],
      }));
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index),
    }));
  };

  const addSpec = () => {
    if (specKey.trim() && specValue.trim()) {
      setFormData((prev) => ({
        ...prev,
        specs: {
          ...(prev.specs || {}),
          [specKey.trim()]: specValue.trim(),
        },
      }));
      setSpecKey('');
      setSpecValue('');
    }
  };

  const removeSpec = (key: string) => {
    const newSpecs = { ...(formData.specs || {}) };
    delete newSpecs[key];
    setFormData((prev) => ({
      ...prev,
      specs: newSpecs,
    }));
  };

  const addImage = () => {
    if (imageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), imageUrl.trim()],
      }));
      setImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      //   toast({
      //     title: isEditing ? 'Product updated' : 'Product created',
      //     description: `${formData.name} has been ${
      //       isEditing ? 'updated' : 'created'
      //     } successfully.`,

      toast.success(`isEditing: ${isEditing}`, {
        description: `${formData.name} has been ${
          isEditing ? 'updated' : 'created'
        } successfully.`,
      });

      router.push('/admin/products');
    } catch (error) {
      //   toast({
      //     title: 'Error',
      //     description: 'An error occurred. Please try again.',
      //     variant: 'destructive',
      //   });

      toast.error('Error', {
        description: 'An error occurred. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="bg-gray-800 text-white border-gray-700">
        <CardHeader>
          <CardTitle>
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {isEditing
              ? 'Update the product details'
              : 'Fill in the details for the new product'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="min-h-32 bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  value={formData.inStock ? 1 : 0}
                  onChange={handleChange}
                  required
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isFeatured"
                name="isFeatured"
                checked={formData.isFeatured}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    isFeatured: checked === true,
                  }))
                }
              />
              <Label htmlFor="isFeatured">Featured Product</Label>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Features</h3>

            <div className="flex space-x-2">
              <Input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Add a feature"
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Button
                type="button"
                onClick={addFeature}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Add
              </Button>
            </div>

            <div className="space-y-2">
              {formData.features?.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded bg-gray-700 p-2"
                >
                  <span>{feature}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFeature(index)}
                    className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-gray-600"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Specifications</h3>

            <div className="grid gap-2 md:grid-cols-5">
              <div className="md:col-span-2">
                <Input
                  value={specKey}
                  onChange={(e) => setSpecKey(e.target.value)}
                  placeholder="Spec name (e.g. CPU)"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="md:col-span-2">
                <Input
                  value={specValue}
                  onChange={(e) => setSpecValue(e.target.value)}
                  placeholder="Spec value (e.g. Intel i9-12900K)"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <Button
                type="button"
                onClick={addSpec}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Add
              </Button>
            </div>

            <div className="space-y-2">
              {Object.entries(formData.specs || {}).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded bg-gray-700 p-2"
                >
                  <div>
                    <span className="font-medium">{key}:</span> {value}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSpec(key)}
                    className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-gray-600"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Images</h3>

            <div className="flex space-x-2">
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Button
                type="button"
                onClick={addImage}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Add
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {formData.images?.map((image, index) => (
                <div key={index} className="relative rounded overflow-hidden">
                  <img
                    src={image || '/placeholder.svg'}
                    alt={`Product image ${index + 1}`}
                    className="h-40 w-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeImage(index)}
                    className="absolute right-2 top-2 h-8 w-8 p-0 bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/products')}
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? (
                <>
                  <span className="mr-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </span>
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>{isEditing ? 'Update Product' : 'Create Product'}</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
