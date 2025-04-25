'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productFormSchema, productFormValues } from '@/schemas/productSchema';

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<productFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      slug: '',
      sku: '',
      brand: '',
      model: '',
      category: '',
      subCategory: '',
      tier: '',
      description: '',
      thumbnail: '',
      price: 0,
      inStock: true,
      quantity: 0,
      keyFeatures: {
        processor: '',
        graphics: '',
        memory: '',
        storage: '',
        cooling: '',
        powerSupply: '',
        dimensions: '',
        weight: '',
      },
      warranty: {
        duration: '',
        coverage: '',
        warrantyProvider: '',
      },
      returnPolicy: {
        isReturnable: true,
        returnWindowDays: 7,
        returnPolicyDetails: '',
      },
      shipping: {
        shippingWeight: '',
        shippingDimensions: '',
        shipsFrom: '',
        estimatedDelivery: '',
      },
      support: {
        supportContact: '',
        faqURL: '',
        guideURL: '',
      },
      meta: {
        title: '',
        description: '',
        keywords: [],
      },
      isFeatured: false,
      isCustomizable: false,
    },
  });

  const onSubmit = (data: productFormValues) => {
    console.log('Product submitted:', data);
    // You can POST to an API route here
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-6 bg-white shadow rounded-md"
    >
      <div>
        <label>Product Name</label>
        <input {...register('name')} className="input" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label>Slug</label>
        <input {...register('slug')} className="input" />
      </div>

      <div>
        <label>SKU</label>
        <input {...register('sku')} className="input" />
      </div>

      <div>
        <label>Brand</label>
        <input {...register('brand')} className="input" />
      </div>

      <div>
        <label>Price</label>
        <input
          type="number"
          {...register('price', { valueAsNumber: true })}
          className="input"
        />
      </div>

      <div>
        <label>In Stock</label>
        <input type="checkbox" {...register('inStock')} />
      </div>

      {/* Example for nested object */}
      <div>
        <label>Processor</label>
        <input {...register('keyFeatures.processor')} className="input" />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Submit Product
      </button>
    </form>
  );
}
