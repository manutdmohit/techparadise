'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Cpu,
  HardDrive,
  MemoryStick,
  MonitorPlay,
  ShoppingCart,
  Star,
  ChevronLeft,
  Check,
  Minus,
  Plus,
} from 'lucide-react';
import { products as productsData } from '@/data/products';
import ProductCard from '@/components/product-card';
import { useCart } from '@/contexts/cart-context';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types/product';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const params = useParams();
  const productSlug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { items, addItem } = useCart();

  useEffect(() => {
    // Find the product by slug
    const foundProduct = productsData.find((p) => p.slug === productSlug);

    if (foundProduct) {
      setProduct(foundProduct);

      // Find related products (same category, different product)
      const related = productsData
        .filter(
          (p) =>
            p.category === foundProduct.category && p.id !== foundProduct.id
        )
        .slice(0, 3);

      setRelatedProducts(related);
    }

    setLoading(false);
  }, [productSlug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="h-12 w-12 rounded-full border-4 border-zinc-800 border-t-purple-500 animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return notFound();
  }

  // Determine gradient colors based on category
  const getGradient = () => {
    switch (product.category) {
      case 'gaming':
        return 'from-purple-600 to-blue-600';
      case 'workstation':
        return 'from-blue-600 to-cyan-600';
      case 'server':
        return 'from-cyan-600 to-teal-600';
      default:
        return 'from-purple-600 to-blue-600';
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      toast.info('Minimum quantity is 1', {
        className: 'bg-yellow-500 text-white',
        icon: '⚠️',
      });
    }
  };

  const increaseQuantity = () => {
    const getItem = items.find((item) => item.productId === product.id);

    let totalQuantity = quantity;

    if (getItem) {
      totalQuantity = getItem.quantity + quantity;
    }

    if (totalQuantity < product.quantity) {
      setQuantity(quantity + 1);
    } else {
      toast.warning(`Only ${product.quantity} items in stock`, {
        className: 'bg-red-500 text-white',
        icon: '😞',
      });
    }
  };

  const handleAddToCart = () => {
    if (product.inStock) {
      // Add the item to the cart with the selected quantity
      addItem(product, quantity); // Pass quantity here

      // Reset quantity after adding to cart
      setQuantity(1);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <div className="container py-8 mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/products"
            className="text-zinc-400 hover:text-white flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Link>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 opacity-75 blur-lg"></div>
            <div className="relative bg-zinc-900 rounded-lg overflow-hidden">
              <Image
                src={product.images[0] || '/placeholder.svg'}
                width={800}
                height={800}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge
                variant="outline"
                className={`capitalize ${
                  product.category === 'gaming'
                    ? 'border-purple-500 text-purple-500'
                    : product.category === 'workstation'
                    ? 'border-blue-500 text-blue-500'
                    : 'border-cyan-500 text-cyan-500'
                }`}
              >
                {product.category}
              </Badge>
              <Badge
                variant="outline"
                className="capitalize border-zinc-700 text-zinc-400"
              >
                {product.tier} Tier
              </Badge>
              {product.isFeatured && (
                <Badge
                  className={`bg-gradient-to-r ${getGradient()} border-none`}
                >
                  Featured
                </Badge>
              )}
              {!product.inStock && (
                <Badge
                  variant="outline"
                  className="border-red-500 text-red-500"
                >
                  Out of Stock
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {product.name}
            </h1>

            <p className="text-zinc-400 mb-6">{product.description}</p>

            <div className="text-3xl font-bold mb-6">
              ${formatPrice(product.price)}
            </div>

            {/* Quantity Selector */}
            {product.inStock && (
              <div className="flex items-center mb-6">
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
              </div>
            )}

            <div className="flex gap-4 mb-8">
              <Button
                size="lg"
                className={`bg-gradient-to-r ${getGradient()} hover:opacity-90 px-8`}
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.inStock ? 'Add to Cart' : 'Sold Out'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-zinc-700 hover:bg-zinc-800"
              >
                Configure
              </Button>
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="h-5 w-5 text-purple-500" />
                  <h3 className="font-medium">Processor</h3>
                </div>
                {/* <p className="text-zinc-300">{product.specs.cpu}</p> */}
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MonitorPlay className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">Graphics</h3>
                </div>
                <p className="text-zinc-300">{product.specifications.gpu}</p>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MemoryStick className="h-5 w-5 text-cyan-500" />
                  <h3 className="font-medium">Memory</h3>
                </div>
                <p className="text-zinc-300">{product.specifications.ram}</p>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <HardDrive className="h-5 w-5 text-teal-500" />
                  <h3 className="font-medium">Storage</h3>
                </div>
                <p className="text-zinc-300">
                  {product.specifications.storage}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Key Features</h3>
              <ul className="grid grid-cols-2 gap-2">
                {product.featuresAndBenefits.premiumComponents
                  .split(',')
                  .map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-zinc-300">{feature}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <Tabs defaultValue="specs">
            <TabsList className="bg-zinc-900 border border-zinc-800 w-full justify-start">
              <TabsTrigger
                value="specs"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Full Specifications
              </TabsTrigger>
              <TabsTrigger
                value="features"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Features & Benefits
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="specs" className="mt-6">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">
                  Technical Specifications
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-500 mb-2">
                      Processor
                    </h4>
                    <p className="text-zinc-300 mb-4">
                      {product.specifications.cpu}
                    </p>

                    <h4 className="font-medium text-blue-500 mb-2">Graphics</h4>
                    <p className="text-zinc-300 mb-4">
                      {product.specifications.gpu}
                    </p>

                    <h4 className="font-medium text-cyan-500 mb-2">Memory</h4>
                    <p className="text-zinc-300 mb-4">
                      {product.specifications.ram}
                    </p>

                    <h4 className="font-medium text-teal-500 mb-2">Storage</h4>
                    <p className="text-zinc-300 mb-4">
                      {product.specifications.storage}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-500 mb-2">
                      Cooling
                    </h4>
                    <p className="text-zinc-300 mb-4">
                      {product.specifications.cooling}
                    </p>

                    <h4 className="font-medium text-blue-500 mb-2">
                      Power Supply
                    </h4>
                    <p className="text-zinc-300 mb-4">
                      850W 80+ Gold Certified
                    </p>

                    <h4 className="font-medium text-cyan-500 mb-2">
                      Dimensions
                    </h4>
                    <p className="text-zinc-300 mb-4">450mm x 210mm x 480mm</p>

                    <h4 className="font-medium text-teal-500 mb-2">Weight</h4>
                    <p className="text-zinc-300 mb-4">15kg</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="features" className="mt-6">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Features & Benefits</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-500 mb-2">
                      Premium Components
                    </h4>
                    <p className="text-zinc-300 mb-4">
                      Every component is carefully selected for maximum
                      performance and reliability, ensuring your system runs
                      smoothly for years to come.
                    </p>

                    <h4 className="font-medium text-blue-500 mb-2">
                      Expert Assembly
                    </h4>
                    <p className="text-zinc-300 mb-4">
                      Each system is hand-built by our expert technicians with
                      meticulous attention to detail and precision cable
                      management.
                    </p>

                    <h4 className="font-medium text-cyan-500 mb-2">
                      Extensive Testing
                    </h4>
                    <p className="text-zinc-300 mb-4">
                      Every system undergoes rigorous stress testing and quality
                      control to ensure flawless performance under any workload.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-500 mb-2">
                      Advanced Cooling
                    </h4>
                    <p className="text-zinc-300 mb-4">
                      Our proprietary cooling solutions ensure optimal
                      temperatures even during the most demanding tasks,
                      extending component lifespan.
                    </p>

                    <h4 className="font-medium text-blue-500 mb-2">
                      Warranty & Support
                    </h4>
                    <p className="text-zinc-300 mb-4">
                      Comprehensive 3-year warranty with lifetime technical
                      support from our knowledgeable team.
                    </p>

                    <h4 className="font-medium text-cyan-500 mb-2">
                      Future-Proof Design
                    </h4>
                    <p className="text-zinc-300 mb-4">
                      Engineered with upgradeability in mind, allowing for easy
                      component upgrades as technology advances.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Customer Reviews</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-5 w-5 fill-yellow-500 text-yellow-500"
                        />
                      ))}
                    </div>
                    <span className="text-zinc-300">
                      4.9 out of 5 (42 reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      name: 'Alex Johnson',
                      date: '2 months ago',
                      rating: 5,
                      comment:
                        "Absolutely incredible machine. The performance is unreal, and the build quality is top-notch. I'm blown away by how quiet it is even under heavy load.",
                    },
                    {
                      name: 'Sarah Chen',
                      date: '3 months ago',
                      rating: 5,
                      comment:
                        'This PC has transformed my workflow. Renders that used to take hours now finish in minutes. The customer service was also exceptional throughout the ordering process.',
                    },
                    {
                      name: 'Michael Rodriguez',
                      date: '1 month ago',
                      rating: 4,
                      comment:
                        'Great system overall. The performance is excellent, though I had a minor issue with one of the RGB controllers. Support was quick to help resolve it.',
                    },
                  ].map((review, index) => (
                    <div
                      key={index}
                      className="border-t border-zinc-800 pt-6 first:border-0 first:pt-0"
                    >
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">{review.name}</h4>
                        <span className="text-zinc-500 text-sm">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? 'fill-yellow-500 text-yellow-500'
                                : 'text-zinc-600'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-zinc-300">{review.comment}</p>
                    </div>
                  ))}
                </div>

                <Button className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90">
                  Write a Review
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
