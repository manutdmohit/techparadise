'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChevronRight,
  MapPin,
  Percent,
  ShoppingBag,
  Star,
  Tag,
  Timer,
  Truck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import useEmblaCarousel from 'embla-carousel-react';

const slides = [
  {
    id: 1,
    title: 'MEGA SALE',
    subtitle: 'Up to 40% Off Premium Gaming PCs',
    description:
      'Limited time offer on our most powerful builds. Upgrade your gaming experience today.',
    cta: 'Shop Now',
    ctaLink: '#',
    secondaryCta: 'View Deals',
    secondaryCtaLink: '#',
    image: '/images/gaming/gaming-pc.png',
    icon: <Percent className="h-6 w-6" />,
    color: 'from-red-600 to-purple-600',
    bgColor: 'from-red-900/20 via-purple-900/20 to-transparent',
  },
  {
    id: 2,
    title: 'BEST VALUE',
    subtitle: "Performance That Won't Break The Bank",
    description:
      'Our best value gaming PCs deliver exceptional performance at competitive prices.',
    cta: 'Explore',
    ctaLink: '#',
    secondaryCta: 'Compare',
    secondaryCtaLink: '#',
    image: '/images/gaming/best-value.png',
    icon: <Star className="h-6 w-6" />,
    color: 'from-yellow-600 to-orange-600',
    bgColor: 'from-yellow-900/20 via-orange-900/20 to-transparent',
  },
  {
    id: 3,
    title: 'ON SALE',
    subtitle: 'Weekly Special Offers',
    description:
      "Check out this week's featured deals on components and pre-built systems.",
    cta: 'View Specials',
    ctaLink: '#',
    secondaryCta: 'Set Alert',
    secondaryCtaLink: '#',
    image: '/images/gaming/weekly-special.png',
    icon: <Tag className="h-6 w-6" />,
    color: 'from-green-600 to-teal-600',
    bgColor: 'from-green-900/20 via-teal-900/20 to-transparent',
  },
  {
    id: 4,
    title: 'PREORDER',
    subtitle: 'Next-Gen Systems Coming Soon',
    description:
      'Be the first to experience our newest lineup featuring the latest hardware.',
    cta: 'Reserve Now',
    ctaLink: '#',
    secondaryCta: 'Learn More',
    secondaryCtaLink: '#',
    image: '/images/gaming/preorder.png',
    icon: <Timer className="h-6 w-6" />,
    color: 'from-blue-600 to-cyan-600',
    bgColor: 'from-blue-900/20 via-cyan-900/20 to-transparent',
  },
  {
    id: 5,
    title: 'VISIT OUR SHOWROOM',
    subtitle: 'Experience Our PCs In Person',
    description:
      'Visit our state-of-the-art showroom to test our systems and get expert advice.',
    cta: 'Find Location',
    ctaLink: '#',
    secondaryCta: 'Book Appointment',
    secondaryCtaLink: '#',
    image: '/images/gaming/showroom.png',
    icon: <MapPin className="h-6 w-6" />,
    color: 'from-purple-600 to-indigo-600',
    bgColor: 'from-purple-900/20 via-indigo-900/20 to-transparent',
  },
  {
    id: 6,
    title: 'NEW ARRIVALS',
    subtitle: 'Just Landed: Latest Tech',
    description:
      'Discover our newest components and systems featuring cutting-edge technology.',
    cta: 'Shop New',
    ctaLink: '#',
    secondaryCta: 'Get Updates',
    secondaryCtaLink: '#',
    image: '/images/gaming/new-arrivals.png',
    icon: <Truck className="h-6 w-6" />,
    color: 'from-pink-600 to-rose-600',
    bgColor: 'from-pink-900/20 via-rose-900/20 to-transparent',
  },
  {
    id: 7,
    title: 'LIMITED EDITION',
    subtitle: 'Exclusive Custom Builds',
    description:
      'One-of-a-kind systems with unique designs and premium components. While supplies last.',
    cta: 'View Collection',
    ctaLink: '#',
    secondaryCta: 'Custom Order',
    secondaryCtaLink: '#',
    image: '/images/gaming/limited-edition.png',
    icon: <ShoppingBag className="h-6 w-6" />,
    color: 'from-amber-600 to-yellow-600',
    bgColor: 'from-amber-900/20 via-yellow-900/20 to-transparent',
  },
];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);

    autoplayIntervalRef.current = setInterval(() => {
      if (emblaApi && !isPaused) emblaApi.scrollNext();
    }, 5000);
  }, [emblaApi, isPaused]);

  const stopAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', onSelect);
    startAutoplay();

    return () => {
      emblaApi.off('select', onSelect);
      stopAutoplay();
    };
  }, [emblaApi, onSelect, startAutoplay, stopAutoplay]);

  useEffect(() => {
    if (isPaused) {
      stopAutoplay();
    } else {
      startAutoplay();
    }

    return () => stopAutoplay();
  }, [isPaused, startAutoplay, stopAutoplay]);

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div className="flex-[0_0_100%] min-w-0" key={slide.id}>
              <div className="relative overflow-hidden py-20 md:py-32">
                <div className="absolute inset-0 z-0">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-black to-transparent" />
                </div>
                <div className="container relative z-10 mx-auto">
                  <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
                    <div className="space-y-6">
                      <Badge
                        className={`bg-gradient-to-r ${slide.color} text-white hover:opacity-90 border-none px-3 py-1 flex items-center gap-1.5`}
                      >
                        {slide.icon}
                        {slide.title}
                      </Badge>
                      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200">
                        {slide.subtitle}
                      </h1>
                      <p className="text-zinc-400 md:text-lg max-w-[600px]">
                        {slide.description}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <Button
                          className={`bg-gradient-to-r ${slide.color} hover:opacity-90 text-white`}
                        >
                          {slide.cta}
                        </Button>
                        <Button
                          variant="outline"
                          className="border-zinc-700 text-white hover:bg-zinc-800"
                        >
                          {slide.secondaryCta}{' '}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="relative mx-auto max-w-sm md:max-w-none">
                      <div className="relative">
                        <div
                          className={`absolute -inset-1 rounded-lg bg-gradient-to-r ${slide.color} opacity-75 blur-lg`}
                        ></div>
                        <Image
                          src={slide.image || '/placeholder.svg'}
                          width={600}
                          height={600}
                          alt={slide.title}
                          className="relative rounded-lg object-cover z-10"
                        />
                        <div
                          className={` ${slide.color
                            .replace('from-', 'from-')
                            .replace('to-', 'to-')}/20 rounded-lg z-20`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/50 border border-zinc-700 text-white hover:bg-black/70 hover:border-zinc-600 flex items-center justify-center"
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/50 border border-zinc-700 text-white hover:bg-black/70 hover:border-zinc-600 flex items-center justify-center"
        onClick={() => emblaApi?.scrollNext()}
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              'w-2.5 h-2.5 rounded-full transition-all duration-300',
              activeSlide === index
                ? 'bg-white w-8'
                : 'bg-white/30 hover:bg-white/50'
            )}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
