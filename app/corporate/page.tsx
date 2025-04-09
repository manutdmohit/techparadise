import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChevronRight,
  Cpu,
  Database,
  Globe,
  Layers,
  Lock,
  Monitor,
  Server,
  Shield,
  Zap,
} from 'lucide-react';
import Logo from '@/components/navbar/Logo';

export default function CorporatePage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-cyan-900/20" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-black to-transparent" />
        </div>
        <div className="container relative z-10 mx-auto">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-none px-3 py-1">
                Enterprise Solutions
              </Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-cyan-200">
                Powering Business Innovation
              </h1>
              <p className="text-zinc-400 md:text-lg max-w-[600px]">
                High-performance computing solutions designed for modern
                enterprises. Scalable, secure, and built to accelerate your
                business.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white">
                  Explore Solutions
                </Button>
                <Button
                  variant="outline"
                  className="border-zinc-700 text-white hover:bg-zinc-800"
                >
                  Schedule Consultation{' '}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="relative mx-auto max-w-sm md:max-w-none">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 opacity-75 blur-lg"></div>
                <Image
                  src="/images/corporate/corporate-hero.png"
                  width={600}
                  height={600}
                  alt="Corporate Workstation"
                  className="relative rounded-lg object-cover z-10"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-lg z-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 relative">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <Badge className="mb-4 bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 border-none px-3 py-1">
              Business Solutions
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Tailored for <span className="text-blue-500">Enterprise</span>
            </h2>
            <p className="max-w-[800px] text-zinc-400">
              Our enterprise-grade solutions are designed to meet the demanding
              needs of modern businesses, from startups to global corporations.
            </p>
          </div>

          <Tabs defaultValue="workstations" className="mb-12">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-zinc-900/50 border border-zinc-800">
                <TabsTrigger
                  value="workstations"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Workstations
                </TabsTrigger>
                <TabsTrigger
                  value="servers"
                  className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
                >
                  Servers
                </TabsTrigger>
                <TabsTrigger
                  value="solutions"
                  className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                >
                  IT Solutions
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="workstations" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: 'EXECUTIVE PRO',
                    price: '$1,899',
                    image: '/placeholder.svg?height=400&width=400',
                    specs: 'Intel i7, 32GB RAM, 1TB SSD, NVIDIA T1000',
                    color: 'from-blue-500 to-cyan-500',
                  },
                  {
                    name: 'DEVELOPER ULTRA',
                    price: '$2,799',
                    image: '/placeholder.svg?height=400&width=400',
                    specs: 'Intel i9, 64GB RAM, 2TB NVMe, RTX A2000',
                    color: 'from-cyan-500 to-blue-500',
                    featured: true,
                  },
                  {
                    name: 'DESIGN STATION',
                    price: '$3,499',
                    image: '/placeholder.svg?height=400&width=400',
                    specs: 'AMD Threadripper, 128GB RAM, 4TB SSD, RTX A4000',
                    color: 'from-indigo-500 to-blue-500',
                  },
                ].map((product, index) => (
                  <Card
                    key={index}
                    className="group relative overflow-hidden bg-zinc-900/50 border-zinc-800 transition-all duration-300 hover:border-zinc-700 hover:shadow-lg hover:shadow-blue-500/10"
                  >
                    {product.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 border-none">
                          Most Popular
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

            <TabsContent value="servers" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: 'RACK SERVER R1',
                    price: '$3,999',
                    image: '/placeholder.svg?height=400&width=400',
                    specs: 'Dual Xeon Silver, 128GB ECC, 4TB SSD RAID',
                    color: 'from-cyan-500 to-blue-500',
                  },
                  {
                    name: 'RACK SERVER R2',
                    price: '$5,999',
                    image: '/placeholder.svg?height=400&width=400',
                    specs: 'Dual Xeon Gold, 256GB ECC, 8TB SSD RAID',
                    color: 'from-blue-500 to-indigo-500',
                    featured: true,
                  },
                  {
                    name: 'TOWER SERVER T1',
                    price: '$4,499',
                    image: '/placeholder.svg?height=400&width=400',
                    specs: 'AMD EPYC, 192GB ECC, 6TB SSD RAID',
                    color: 'from-indigo-500 to-violet-500',
                  },
                ].map((product, index) => (
                  <Card
                    key={index}
                    className="group relative overflow-hidden bg-zinc-900/50 border-zinc-800 transition-all duration-300 hover:border-zinc-700 hover:shadow-lg hover:shadow-cyan-500/10"
                  >
                    {product.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 border-none">
                          Most Popular
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

            <TabsContent value="solutions" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: 'CLOUD INFRASTRUCTURE',
                    price: 'Custom',
                    image: '/placeholder.svg?height=400&width=400',
                    specs: 'Private cloud solutions with scalable resources',
                    color: 'from-indigo-500 to-blue-500',
                  },
                  {
                    name: 'SECURITY SUITE',
                    price: 'Custom',
                    image: '/placeholder.svg?height=400&width=400',
                    specs: 'End-to-end security with monitoring and response',
                    color: 'from-blue-500 to-cyan-500',
                    featured: true,
                  },
                  {
                    name: 'MANAGED SERVICES',
                    price: 'Custom',
                    image: '/placeholder.svg?height=400&width=400',
                    specs: '24/7 IT support and infrastructure management',
                    color: 'from-cyan-500 to-teal-500',
                  },
                ].map((product, index) => (
                  <Card
                    key={index}
                    className="group relative overflow-hidden bg-zinc-900/50 border-zinc-800 transition-all duration-300 hover:border-zinc-700 hover:shadow-lg hover:shadow-indigo-500/10"
                  >
                    {product.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-gradient-to-r from-indigo-600 to-blue-600 border-none">
                          Most Popular
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
                            Get Quote
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
              View All Solutions <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="container relative z-10 mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <Badge className="mb-4 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-none px-3 py-1">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Enterprise-Grade <span className="text-blue-500">Technology</span>
            </h2>
            <p className="max-w-[800px] text-zinc-400">
              Our solutions are built with the highest standards of performance,
              security, and reliability to meet the demands of modern
              businesses.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Server className="h-10 w-10" />,
                title: 'High Performance',
                description:
                  'Enterprise-grade hardware configured for maximum performance and reliability.',
                color: 'from-blue-600 to-cyan-600',
              },
              {
                icon: <Shield className="h-10 w-10" />,
                title: 'Advanced Security',
                description:
                  'Multi-layered security solutions to protect your critical business data.',
                color: 'from-cyan-600 to-teal-600',
              },
              {
                icon: <Layers className="h-10 w-10" />,
                title: 'Scalable Solutions',
                description:
                  'Flexible infrastructure that grows with your business needs.',
                color: 'from-indigo-600 to-blue-600',
              },
              {
                icon: <Globe className="h-10 w-10" />,
                title: 'Cloud Integration',
                description:
                  'Seamless integration with major cloud platforms and services.',
                color: 'from-blue-600 to-indigo-600',
              },
              {
                icon: <Database className="h-10 w-10" />,
                title: 'Data Management',
                description:
                  'Comprehensive solutions for data storage, backup, and recovery.',
                color: 'from-teal-600 to-cyan-600',
              },
              {
                icon: <Lock className="h-10 w-10" />,
                title: 'Compliance Ready',
                description:
                  'Systems designed to meet industry regulations and compliance standards.',
                color: 'from-cyan-600 to-blue-600',
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-zinc-900/50 border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div
                    className={`h-16 w-16 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-zinc-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="container relative z-10 mx-auto">
          <div className="max-w-4xl mx-auto bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <div className="grid gap-6 md:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-zinc-400">
                  Our team of experts is ready to help you find the perfect IT
                  solutions for your business needs.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                    Schedule Consultation
                  </Button>
                  <Button
                    variant="outline"
                    className="border-zinc-700 text-white hover:bg-zinc-800"
                  >
                    View Case Studies
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Monitor className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-bold text-2xl">500+</p>
                      <p className="text-xs text-zinc-400">Clients Served</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-cyan-500" />
                    </div>
                    <div>
                      <p className="font-bold text-2xl">99.9%</p>
                      <p className="text-xs text-zinc-400">Uptime</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="h-12 w-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <Cpu className="h-6 w-6 text-indigo-500" />
                    </div>
                    <div>
                      <p className="font-bold text-2xl">24/7</p>
                      <p className="text-xs text-zinc-400">Support</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-bold text-2xl">100%</p>
                      <p className="text-xs text-zinc-400">Secure</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                <span className="text-[#17e9e1] text-xl font-bold tracking-wider">
                  Tech Paradise{' '}
                </span>
              </div>
              <p className="text-zinc-400 mb-6">
                Delivering enterprise-grade technology solutions to power
                business innovation and growth.
              </p>
              <div className="flex gap-4">
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
                  className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-cyan-600 transition-colors"
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
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Solutions</h3>
              <ul className="space-y-2">
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
                    Servers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Cloud Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Security
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Managed IT
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Partners
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <p className="text-zinc-400 mb-4">
                Get in touch with our team of experts to discuss your business
                needs.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
