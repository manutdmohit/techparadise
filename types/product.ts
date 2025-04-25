export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  brand: string;
  model: string;
  category: string;
  subCategory: string;
  tier: string;

  description: string;
  highlights: string[];
  images: string[];
  thumbnail: string;

  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  discountEndDate?: Date;

  inStock: boolean;
  quantity: number;

  keyFeatures: {
    processor: string;
    graphics: string;
    memory: string;
    storage: string;
    cooling: string;
    powerSupply: string;
    dimensions: string;
    weight: string;
  };

  specifications: Record<string, string>;

  featuresAndBenefits: {
    premiumComponents: string;
    expertAssembly: string;
    extensiveTesting: string;
    advancedCooling: string;
    warrantyAndSupport: string;
    futureProofDesign: string;
  };

  warranty: {
    duration: string;
    coverage: string;
    warrantyProvider: string;
  };

  returnPolicy: {
    isReturnable: boolean;
    returnWindowDays: number;
    returnPolicyDetails: string;
  };

  shipping: {
    shippingWeight: string;
    shippingDimensions: string;
    shipsFrom: string;
    estimatedDelivery: string;
  };

  support: {
    supportContact: string;
    faqURL?: string;
    guideURL?: string;
  };

  meta: {
    title: string;
    description: string;
    keywords: string[];
  };

  tags: string[];
  isFeatured: boolean;
  isCustomizable: boolean;

  availableOptions?: {
    cpu?: string[];
    gpu?: string[];
    ram?: string[];
    storage?: string[];
  };

  ratings: {
    averageRating: number;
    reviewCount: number;
    reviews?: {
      userId: string;
      userName: string;
      rating: number;
      comment: string;
      date: Date;
    }[];
  };

  createdAt: Date;
  updatedAt: Date;
}

export type CartItem = {
  productId: string;
  quantity: number;
  price: number; // added price field
  image: string;
};
