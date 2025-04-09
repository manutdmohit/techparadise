import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChevronRight,
  Cpu,
  HardDrive,
  Layers,
  MemoryStickIcon as Memory,
  MonitorPlay,
  Star,
  Zap,
} from 'lucide-react';
import HeroSlider from '@/components/hero-slider';
import Logo from '@/components/navbar/Logo';

export default function GamingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-primary text-white">
      {/* Hero Section */}
      <HeroSlider />

      {/* Featured Products */}
      <section className="py-20 relative mx-auto">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-purple-900/10 to-transparent"></div>
        <div className="container">
          <div className="flex flex-col items-center text-center mb-12">
            <Badge className="mb-4 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-none px-3 py-1">
              Featured Systems
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Engineered for{' '}
              <span className="text-purple-500">Performance</span>
            </h2>
            <p className="max-w-[800px] text-zinc-400">
              Our custom-built gaming PCs are designed to deliver exceptional
              performance, stunning visuals, and unmatched reliability for the
              most demanding games.
            </p>
          </div>

          <Tabs defaultValue="gaming" className="mb-12">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-zinc-900/50 border border-zinc-800">
                <TabsTrigger
                  value="gaming"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  Gaming
                </TabsTrigger>
                <TabsTrigger
                  value="creator"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Creator
                </TabsTrigger>
                <TabsTrigger
                  value="workstation"
                  className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                >
                  Workstation
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="gaming" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: 'QUANTUM NEXUS',
                    price: '$1,999',
                    image: '/placeholder.svg?height=400&width=400',
                    specs: 'RTX 4070, Ryzen 7 7800X3D, 32GB DDR5',
                    color: 'from-purple-500 to-blue-500',
                  },
                  {
                    name: 'QUANTUM APEX',
                    price: '$2,499',
                    image: '/placeholder.svg?height=400&width=400',
                    specs: 'RTX 4080, Intel i9-13900K, 64GB DDR5',
                    color: 'from-blue-500 to-cyan-500',
                    featured: true,
                  },
                  {
                    name: 'QUANTUM VOID',
                    price: '$3,499',
                    image: '/placeholder.svg?height=400&width=400',
                    specs: 'RTX 4090, Ryzen 9 7950X, 64GB DDR5',
                    color: 'from-red-500 to-purple-500',
                  },
                ].map((product, index) => (
                  <Card
                    key={index}
                    className="group relative overflow-hidden bg-zinc-900/50 border-zinc-800 transition-all duration-300 hover:border-zinc-700 hover:shadow-lg hover:shadow-purple-500/10"
                  >
                    {product.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 border-none">
                          Best Seller
                        </Badge>
                      </div>
                    )}
                    <div className="relative p-6 flex flex-col h-full">
                      <div className="mb-6 overflow-hidden rounded-lg">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${product.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                        ></div>
                        <Image
                          src={product.image || '/placeholder.svg'}
                          width={400}
                          height={400}
                          alt={product.name}
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-0 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold mb-2">
                          {product.name}
                        </h3>
                        <p className="text-zinc-400 mb-4 flex-1">
                          {product.specs}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">
                            {product.price}
                          </span>
                          <Button
                            size="sm"
                            className={`bg-gradient-to-r ${product.color} hover:opacity-90`}
                          >
                            Configure
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="creator" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: 'CREATOR PRO',
                    price: '$2,799',
                    image: '/placeholder.svg?height=400&width=400',
                    specs: 'RTX 4080, Ryzen 9 7950X, 64GB DDR5, 2TB NVMe',
                    color: 'from-blue-500 to-cyan-500',
                  },
                  {
                    name: 'CREATOR ULTRA',
                    price: '$3,499',
                    image: '/placeholder.svg?height=400&width=400',
                    specs: 'RTX 4090, Intel i9-13900K, 128GB DDR5, 4TB NVMe',
                    color: 'from-cyan-500 to-blue-500',
                    featured: true,
                  },
                  {
                    name: 'CREATOR MAX',
                    price: '$4,299',
                    image: '/placeholder.svg?height=400&width=400',
                    specs: 'Dual RTX 4080, Threadripper, 256GB DDR5, 8TB NVMe',
                    color: 'from-blue-500 to-indigo-500',
                  },
                ].map((product, index) => (
                  <Card
                    key={index}
                    className="group relative overflow-hidden bg-zinc-900/50 border-zinc-800 transition-all duration-300 hover:border-zinc-700 hover:shadow-lg hover:shadow-blue-500/10"
                  >
                    {product.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 border-none">
                          Best Seller
                        </Badge>
                      </div>
                    )}
                    <div className="relative p-6 flex flex-col h-full">
                      <div className="mb-6 overflow-hidden rounded-lg">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${product.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                        ></div>
                        <Image
                          src={product.image || '/placeholder.svg'}
                          width={400}
                          height={400}
                          alt={product.name}
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-0 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold mb-2">
                          {product.name}
                        </h3>
                        <p className="text-zinc-400 mb-4 flex-1">
                          {product.specs}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">
                            {product.price}
                          </span>
                          <Button
                            size="sm"
                            className={`bg-gradient-to-r ${product.color} hover:opacity-90`}
                          >
                            Configure
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="workstation" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: 'WORKSTATION PRO',
                    price: '$3,299',
                    image: '/placeholder.svg?height=400&width=400',
                    specs: 'RTX A4000, Xeon W-3400, 128GB ECC, 4TB NVMe',
                    color: 'from-red-500 to-orange-500',
                  },
                  {
                    name: 'WORKSTATION ULTRA',
                    price: '$4,999',
                    image: '/placeholder.svg?height=400&width=400',
                    specs: 'RTX A5000, Threadripper Pro, 256GB ECC, 8TB NVMe',
                    color: 'from-orange-500 to-red-500',
                    featured: true,
                  },
                  {
                    name: 'WORKSTATION MAX',
                    price: '$7,999',
                    image: '/placeholder.svg?height=400&width=400',
                    specs: 'Dual RTX A6000, EPYC, 512GB ECC, 16TB NVMe RAID',
                    color: 'from-red-500 to-pink-500',
                  },
                ].map((product, index) => (
                  <Card
                    key={index}
                    className="group relative overflow-hidden bg-zinc-900/50 border-zinc-800 transition-all duration-300 hover:border-zinc-700 hover:shadow-lg hover:shadow-red-500/10"
                  >
                    {product.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-gradient-to-r from-red-600 to-orange-600 border-none">
                          Best Seller
                        </Badge>
                      </div>
                    )}
                    <div className="relative p-6 flex flex-col h-full">
                      <div className="mb-6 overflow-hidden rounded-lg">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${product.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                        ></div>
                        <Image
                          src={product.image || '/placeholder.svg'}
                          width={400}
                          height={400}
                          alt={product.name}
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-0 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold mb-2">
                          {product.name}
                        </h3>
                        <p className="text-zinc-400 mb-4 flex-1">
                          {product.specs}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">
                            {product.price}
                          </span>
                          <Button
                            size="sm"
                            className={`bg-gradient-to-r ${product.color} hover:opacity-90`}
                          >
                            Configure
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center">
            <Button
              variant="outline"
              className="border-zinc-700 text-white hover:bg-zinc-800"
            >
              View All Systems <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Customization Section */}
      <section className="py-20 relative bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="container relative z-10 mx-auto">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-none px-3 py-1">
                Custom Builds
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Build Your <span className="text-red-500">Dream Machine</span>
              </h2>
              <p className="text-zinc-400">
                Our custom PC builder lets you create the perfect system
                tailored to your needs. Choose from premium components and
                create a PC that's uniquely yours.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-gradient-to-br from-red-500 to-purple-500 rounded-full p-1">
                    <Cpu className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">Premium Components</h3>
                    <p className="text-sm text-zinc-400">
                      Only the highest quality parts from trusted manufacturers
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full p-1">
                    <Layers className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">Expert Assembly</h3>
                    <p className="text-sm text-zinc-400">
                      Built by professionals with meticulous attention to detail
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full p-1">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">Extensive Testing</h3>
                    <p className="text-sm text-zinc-400">
                      Rigorous stress testing to ensure stability and
                      performance
                    </p>
                  </div>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700">
                Start Building
              </Button>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-red-600 to-purple-600 opacity-75 blur-lg"></div>
              <Card className="relative bg-zinc-900/80 border-zinc-800 overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Popular Components</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <Cpu className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="font-medium">Processors</p>
                          <p className="text-xs text-zinc-400">
                            Intel & AMD options
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-zinc-500" />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <MonitorPlay className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">Graphics Cards</p>
                          <p className="text-xs text-zinc-400">
                            NVIDIA & AMD options
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-zinc-500" />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <Memory className="h-5 w-5 text-cyan-500" />
                        <div>
                          <p className="font-medium">Memory</p>
                          <p className="text-xs text-zinc-400">
                            DDR4 & DDR5 options
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-zinc-500" />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <HardDrive className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-medium">Storage</p>
                          <p className="text-xs text-zinc-400">
                            NVMe, SSD & HDD options
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-zinc-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 mx-auto">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-12">
            <Badge className="mb-4 bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-none px-3 py-1">
              Customer Reviews
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              What Gamers Are Saying
            </h2>
            <p className="max-w-[800px] text-zinc-400">
              Don't just take our word for it. Here's what our customers have to
              say about their experience.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Alex Johnson',
                title: 'Professional Gamer',
                quote:
                  "The performance is unreal. I've never experienced such smooth gameplay and lightning-fast response times. Worth every penny.",
                rating: 5,
                color: 'from-purple-500 to-blue-500',
              },
              {
                name: 'Sarah Chen',
                title: 'Content Creator',
                quote:
                  'Not only is my PC a beast for gaming, but it handles video editing and 3D rendering like a dream. The build quality is exceptional.',
                rating: 5,
                color: 'from-blue-500 to-cyan-500',
              },
              {
                name: 'Marcus Williams',
                title: 'Esports Competitor',
                quote:
                  'From order to delivery, the experience was flawless. The custom cooling system keeps everything running cool even during marathon sessions.',
                rating: 4,
                color: 'from-red-500 to-purple-500',
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="bg-zinc-900/50 border-zinc-800 overflow-hidden"
              >
                <div
                  className={`h-2 w-full bg-gradient-to-r ${testimonial.color}`}
                ></div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-500 text-yellow-500"
                        />
                      ))}
                    {Array(5 - testimonial.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-zinc-600" />
                      ))}
                  </div>
                  <p className="text-zinc-300 mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center`}
                    >
                      <span className="font-bold text-white">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-zinc-400">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary border-t border-zinc-900 pt-12 pb-8">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Logo size="md" />
                <span className="text-xl font-bold tracking-wider">
                  Tech Paradise
                </span>
              </div>
              <p className="text-zinc-400 mb-6">
                Crafting premium gaming experiences through cutting-edge
                technology and expert craftsmanship.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-purple-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-blue-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-red-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Products</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Gaming PCs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Creator PCs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Workstations
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Custom Builds
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Components
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Warranty
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Returns
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Newsletter</h3>
              <p className="text-zinc-400 mb-4">
                Subscribe to get special offers, free giveaways, and new product
                announcements.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
