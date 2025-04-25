import { z } from 'zod';

export const productFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  sku: z.string().min(1, 'SKU is required'),
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  category: z.string().min(1, 'Category is required'),
  subCategory: z.string().min(1, 'Subcategory is required'),
  tier: z.string().min(1, 'Tier is required'),

  description: z.string().min(1, 'Description is required'),
  highlights: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  thumbnail: z.string().min(1, 'Thumbnail is required'),

  price: z.number(),
  originalPrice: z.number().optional(),
  discountPercentage: z.number().optional(),
  discountEndDate: z.date().optional(),

  inStock: z.boolean(),
  quantity: z.number(),

  keyFeatures: z.object({
    processor: z.string(),
    graphics: z.string(),
    memory: z.string(),
    storage: z.string(),
    cooling: z.string(),
    powerSupply: z.string(),
    dimensions: z.string(),
    weight: z.string(),
  }),

  specifications: z.record(z.string()),

  featuresAndBenefits: z.object({
    premiumComponents: z.string(),
    expertAssembly: z.string(),
    extensiveTesting: z.string(),
    advancedCooling: z.string(),
    warrantyAndSupport: z.string(),
    futureProofDesign: z.string(),
  }),

  warranty: z.object({
    duration: z.string(),
    coverage: z.string(),
    warrantyProvider: z.string(),
  }),

  returnPolicy: z.object({
    isReturnable: z.boolean(),
    returnWindowDays: z.number(),
    returnPolicyDetails: z.string(),
  }),

  shipping: z.object({
    shippingWeight: z.string(),
    shippingDimensions: z.string(),
    shipsFrom: z.string(),
    estimatedDelivery: z.string(),
  }),

  support: z.object({
    supportContact: z.string(),
    faqURL: z.string().optional(),
    guideURL: z.string().optional(),
  }),

  meta: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()),
  }),

  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean(),
  isCustomizable: z.boolean(),

  availableOptions: z
    .object({
      cpu: z.array(z.string()).optional(),
      gpu: z.array(z.string()).optional(),
      ram: z.array(z.string()).optional(),
      storage: z.array(z.string()).optional(),
    })
    .optional(),

  ratings: z.object({
    averageRating: z.number(),
    reviewCount: z.number(),
    reviews: z
      .array(
        z.object({
          userId: z.string(),
          userName: z.string(),
          rating: z.number(),
          comment: z.string(),
          date: z.date(),
        })
      )
      .optional(),
  }),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export type productFormValues = z.infer<typeof productFormSchema>;
