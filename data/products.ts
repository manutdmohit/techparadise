import type { Product } from '@/types/product';

// Helper function to create dates
const createDate = (daysAgo: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
};

// Helper function to create future dates
const createFutureDate = (daysFromNow: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
};

export const products: Product[] = [
  {
    id: 'quantum-nexus',
    name: 'Quantum Nexus',
    slug: 'quantum-nexus-gaming-pc',
    sku: 'QF-GPC-NX-001',
    brand: 'QuantumForge',
    model: 'Nexus 2023',
    category: 'gaming',
    subCategory: 'desktop',
    tier: 'High',

    description:
      'The Quantum Nexus delivers exceptional gaming performance with the latest AMD Ryzen processor and NVIDIA RTX graphics. Perfect for high-FPS gaming and content creation.',
    highlights: [
      'AMD Ryzen 7 7800X3D Processor',
      'NVIDIA GeForce RTX 4070 Graphics',
      '32GB DDR5-6000 Memory',
      '2TB NVMe SSD Storage',
      'RGB Lighting with Tempered Glass Case',
    ],
    images: [
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
    ],
    thumbnail: '/placeholder.svg?height=600&width=600',

    price: 1999,
    originalPrice: 2199,
    discountPercentage: 9,
    discountEndDate: createFutureDate(7),

    inStock: true,
    quantity: 15,

    keyFeatures: {
      processor: 'AMD Ryzen 7 7800X3D',
      graphics: 'NVIDIA RTX 4070 12GB GDDR6X',
      memory: '32GB DDR5-6000 (2x16GB)',
      storage: '2TB NVMe PCIe 4.0 SSD',
      cooling: '360mm AIO Liquid Cooler',
      powerSupply: '850W 80+ Gold Certified',
      dimensions: '450mm x 210mm x 480mm',
      weight: '15kg',
    },

    specifications: {
      Processor:
        'AMD Ryzen 7 7800X3D (8 Cores, 16 Threads, up to 5.0GHz, 96MB Cache)',
      Motherboard: 'AMD X670E ATX Gaming Motherboard',
      Memory: '32GB DDR5-6000MHz (2x16GB)',
      Graphics: 'NVIDIA GeForce RTX 4070 12GB GDDR6X',
      Storage: '2TB NVMe PCIe 4.0 SSD',
      Cooling: '360mm RGB AIO Liquid Cooler',
      'Power Supply': '850W 80+ Gold Certified Fully Modular',
      Case: 'Mid-Tower ATX with Tempered Glass Side Panel',
      'Operating System': 'Windows 11 Home',
      Networking: '2.5G Ethernet, Wi-Fi 6E, Bluetooth 5.2',
      'RGB Lighting': 'Addressable RGB with Software Control',
      'Front I/O': '2x USB 3.2 Gen 1, 1x USB 3.2 Gen 2 Type-C, Audio In/Out',
      'Rear I/O':
        '4x USB 3.2 Gen 2, 2x USB 3.2 Gen 1, 1x USB 3.2 Gen 2x2 Type-C, 2.5G Ethernet, Audio Ports',
      'Expansion Slots': '3x PCIe 4.0 x16, 2x PCIe 4.0 x1',
      Dimensions: '450mm x 210mm x 480mm',
      Weight: '15kg',
    },

    featuresAndBenefits: {
      premiumComponents:
        'Every component is carefully selected for maximum performance and reliability, ensuring your system runs smoothly for years to come.',
      expertAssembly:
        'Each system is hand-built by our expert technicians with meticulous attention to detail and precision cable management.',
      extensiveTesting:
        'Every system undergoes rigorous stress testing and quality control to ensure flawless performance under any workload.',
      advancedCooling:
        'Our proprietary cooling solutions ensure optimal temperatures even during the most demanding tasks, extending component lifespan.',
      warrantyAndSupport:
        'Comprehensive 3-year warranty with lifetime technical support from our knowledgeable team.',
      futureProofDesign:
        'Engineered with upgradeability in mind, allowing for easy component upgrades as technology advances.',
    },

    warranty: {
      duration: '3 Years',
      coverage: 'Parts and Labor',
      warrantyProvider: 'QuantumForge',
    },

    returnPolicy: {
      isReturnable: true,
      returnWindowDays: 30,
      returnPolicyDetails:
        '30-day money-back guarantee. Return in original packaging for full refund minus shipping costs.',
    },

    shipping: {
      shippingWeight: '18kg',
      shippingDimensions: '600mm x 350mm x 600mm',
      shipsFrom: 'Seattle, WA',
      estimatedDelivery: '3-5 Business Days',
    },

    support: {
      supportContact: 'support@quantumforge.com',
      faqURL: '/support/faq',
      guideURL: '/support/guides/quantum-nexus',
    },

    meta: {
      title: 'Quantum Nexus Gaming PC | QuantumForge',
      description:
        'Experience exceptional gaming performance with the Quantum Nexus featuring AMD Ryzen 7 and NVIDIA RTX 4070 graphics.',
      keywords: [
        'gaming pc',
        'amd ryzen',
        'rtx 4070',
        'high performance',
        'custom pc',
      ],
    },

    tags: ['Gaming', 'AMD', 'NVIDIA', 'RGB', 'Liquid Cooling'],
    isFeatured: false,
    isCustomizable: true,

    availableOptions: {
      //   cpu: ['AMD Ryzen 7 7800X3D', 'AMD Ryzen 9 7900X', 'Intel Core i7-13700K'],
      gpu: ['NVIDIA RTX 4070', 'NVIDIA RTX 4070 Ti', 'AMD Radeon RX 7800 XT'],
      ram: ['32GB DDR5-6000', '64GB DDR5-6000', '32GB DDR5-6400'],
      storage: ['2TB NVMe SSD', '4TB NVMe SSD', '2TB NVMe SSD + 4TB HDD'],
    },

    ratings: {
      averageRating: 4.8,
      reviewCount: 24,
      reviews: [
        {
          userId: 'user123',
          userName: 'Alex Johnson',
          rating: 5,
          comment:
            "Absolutely incredible machine. The performance is unreal, and the build quality is top-notch. I'm blown away by how quiet it is even under heavy load.",
          date: createDate(60),
        },
        {
          userId: 'user456',
          userName: 'Sarah Chen',
          rating: 5,
          comment:
            'This PC has transformed my workflow. Renders that used to take hours now finish in minutes. The customer service was also exceptional throughout the ordering process.',
          date: createDate(90),
        },
        {
          userId: 'user789',
          userName: 'Michael Rodriguez',
          rating: 4,
          comment:
            'Great system overall. The performance is excellent, though I had a minor issue with one of the RGB controllers. Support was quick to help resolve it.',
          date: createDate(30),
        },
      ],
    },

    createdAt: createDate(180),
    updatedAt: createDate(7),
  },
  {
    id: 'quantum-apex',
    name: 'Quantum Apex',
    slug: 'quantum-apex-gaming-pc',
    sku: 'QF-GPC-AP-001',
    brand: 'QuantumForge',
    model: 'Apex 2023',
    category: 'gaming',
    subCategory: 'desktop',
    tier: 'Enthusiast',

    description:
      'Our flagship gaming PC, the Quantum Apex combines raw power with stunning aesthetics. Featuring a custom liquid cooling loop and premium components for unmatched performance.',
    highlights: [
      'Intel Core i9-13900K Processor',
      'NVIDIA GeForce RTX 4080 Graphics',
      '64GB DDR5-6400 Memory',
      '4TB NVMe SSD Storage',
      'Custom Loop Liquid Cooling',
    ],
    images: [
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
    ],
    thumbnail: '/placeholder.svg?height=600&width=600',

    price: 2499,
    originalPrice: 2799,
    discountPercentage: 10,
    discountEndDate: createFutureDate(5),

    inStock: true,
    quantity: 8,

    keyFeatures: {
      processor: 'Intel Core i9-13900K',
      graphics: 'NVIDIA RTX 4080 16GB GDDR6X',
      memory: '64GB DDR5-6400 (4x16GB)',
      storage: '4TB NVMe PCIe 4.0 SSD',
      cooling: 'Custom Loop Liquid Cooling',
      powerSupply: '1000W 80+ Platinum Certified',
      dimensions: '500mm x 240mm x 520mm',
      weight: '18kg',
    },

    specifications: {
      Processor:
        'Intel Core i9-13900K (24 Cores, 32 Threads, up to 5.8GHz, 36MB Cache)',
      Motherboard: 'Intel Z790 ATX Gaming Motherboard',
      Memory: '64GB DDR5-6400MHz (4x16GB)',
      Graphics: 'NVIDIA GeForce RTX 4080 16GB GDDR6X',
      Storage: '4TB NVMe PCIe 4.0 SSD',
      Cooling: 'Custom Loop Liquid Cooling with 360mm + 240mm Radiators',
      'Power Supply': '1000W 80+ Platinum Certified Fully Modular',
      Case: 'Full-Tower ATX with Tempered Glass Side Panel',
      'Operating System': 'Windows 11 Pro',
      Networking: '10G Ethernet, Wi-Fi 6E, Bluetooth 5.2',
      'RGB Lighting': 'Addressable RGB with Software Control',
      'Front I/O': '2x USB 3.2 Gen 2, 1x USB 3.2 Gen 2x2 Type-C, Audio In/Out',
      'Rear I/O':
        '6x USB 3.2 Gen 2, 4x USB 3.2 Gen 1, 1x USB 3.2 Gen 2x2 Type-C, 10G Ethernet, Audio Ports',
      'Expansion Slots': '4x PCIe 5.0 x16, 2x PCIe 4.0 x1',
      Dimensions: '500mm x 240mm x 520mm',
      Weight: '18kg',
    },

    featuresAndBenefits: {
      premiumComponents:
        'Only the highest-grade components are selected for the Apex, ensuring exceptional performance and reliability under the most demanding conditions.',
      expertAssembly:
        'Built by our most experienced technicians, each Apex system undergoes a meticulous assembly process with custom cable management and precise tubing runs.',
      extensiveTesting:
        'Every Apex undergoes a 72-hour stress testing protocol to ensure absolute stability and performance before shipping.',
      advancedCooling:
        'Our custom loop liquid cooling system features premium water blocks, fittings, and radiators for unmatched thermal performance and whisper-quiet operation.',
      warrantyAndSupport:
        'Premium 5-year warranty with priority technical support and dedicated customer service representative.',
      futureProofDesign:
        'The Apex is designed with future upgrades in mind, featuring the latest socket and expansion technologies to accommodate next-gen components.',
    },

    warranty: {
      duration: '5 Years',
      coverage: 'Parts and Labor',
      warrantyProvider: 'QuantumForge',
    },

    returnPolicy: {
      isReturnable: true,
      returnWindowDays: 45,
      returnPolicyDetails:
        '45-day satisfaction guarantee. Return in original packaging for full refund minus shipping costs.',
    },

    shipping: {
      shippingWeight: '25kg',
      shippingDimensions: '650mm x 400mm x 650mm',
      shipsFrom: 'Seattle, WA',
      estimatedDelivery: '3-5 Business Days',
    },

    support: {
      supportContact: 'premium-support@quantumforge.com',
      faqURL: '/support/faq',
      guideURL: '/support/guides/quantum-apex',
    },

    meta: {
      title: 'Quantum Apex Gaming PC | QuantumForge',
      description:
        'Experience unmatched gaming performance with the Quantum Apex featuring Intel Core i9 and NVIDIA RTX 4080 graphics with custom liquid cooling.',
      keywords: [
        'gaming pc',
        'intel i9',
        'rtx 4080',
        'liquid cooling',
        'custom pc',
        'high-end gaming',
      ],
    },

    tags: [
      'Gaming',
      'Intel',
      'NVIDIA',
      'Custom Loop',
      'Liquid Cooling',
      'Premium',
    ],
    isFeatured: true,
    isCustomizable: true,

    availableOptions: {
      //   cpu: [
      //     'Intel Core i9-13900K',
      //     'Intel Core i9-13900KS',
      //     'AMD Ryzen 9 7950X',
      //   ],
      gpu: ['NVIDIA RTX 4080', 'NVIDIA RTX 4090', 'AMD Radeon RX 7900 XTX'],
      ram: ['64GB DDR5-6400', '128GB DDR5-6000', '64GB DDR5-7200'],
      storage: ['4TB NVMe SSD', '8TB NVMe SSD', '4TB NVMe SSD + 8TB HDD'],
    },

    ratings: {
      averageRating: 4.9,
      reviewCount: 42,
      reviews: [
        {
          userId: 'user234',
          userName: 'James Wilson',
          rating: 5,
          comment:
            'This is the ultimate gaming machine. Everything from the packaging to the build quality screams premium. Games run flawlessly at 4K, and the custom cooling keeps everything ice cold even during marathon sessions.',
          date: createDate(45),
        },
        {
          userId: 'user567',
          userName: 'Emily Zhang',
          rating: 5,
          comment:
            "As a professional 3D artist, I needed something that could handle complex scenes and renders. The Apex doesn't disappoint - it's cut my rendering times by 70% compared to my previous workstation.",
          date: createDate(75),
        },
        {
          userId: 'user890',
          userName: 'David Thompson',
          rating: 4,
          comment:
            'Nearly perfect system. The performance is incredible, and the custom loop is a work of art. Only giving 4 stars because the RGB software had some conflicts with my peripherals, but support helped me resolve it.',
          date: createDate(20),
        },
      ],
    },

    createdAt: createDate(150),
    updatedAt: createDate(5),
  },
  {
    id: 'quantum-void',
    name: 'Quantum Void',
    slug: 'quantum-void-gaming-pc',
    sku: 'QF-GPC-VD-001',
    brand: 'QuantumForge',
    model: 'Void 2023',
    category: 'gaming',
    subCategory: 'desktop',
    tier: 'Enthusiast',

    description:
      "The ultimate gaming experience. The Quantum Void pushes the boundaries of what's possible with cutting-edge components and uncompromising build quality.",
    highlights: [
      'AMD Ryzen 9 7950X Processor',
      'NVIDIA GeForce RTX 4090 Graphics',
      '64GB DDR5-6400 Memory',
      '8TB NVMe SSD Storage',
      'Custom Loop Liquid Cooling',
    ],
    images: [
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
    ],
    thumbnail: '/placeholder.svg?height=600&width=600',

    price: 3499,
    originalPrice: 3699,
    discountPercentage: 5,
    discountEndDate: createFutureDate(3),

    inStock: true,
    quantity: 5,

    keyFeatures: {
      processor: 'AMD Ryzen 9 7950X',
      graphics: 'NVIDIA RTX 4090 24GB GDDR6X',
      memory: '64GB DDR5-6400 (4x16GB)',
      storage: '8TB NVMe PCIe 4.0 SSD',
      cooling: 'Custom Loop Liquid Cooling',
      powerSupply: '1200W 80+ Titanium Certified',
      dimensions: '550mm x 250mm x 550mm',
      weight: '22kg',
    },

    specifications: {
      Processor:
        'AMD Ryzen 9 7950X (16 Cores, 32 Threads, up to 5.7GHz, 80MB Cache)',
      Motherboard: 'AMD X670E ATX Gaming Motherboard',
      Memory: '64GB DDR5-6400MHz (4x16GB)',
      Graphics: 'NVIDIA GeForce RTX 4090 24GB GDDR6X',
      Storage: '8TB NVMe PCIe 4.0 SSD (2x 4TB in RAID 0)',
      Cooling: 'Custom Loop Liquid Cooling with 420mm + 360mm Radiators',
      'Power Supply': '1200W 80+ Titanium Certified Fully Modular',
      Case: 'Full-Tower ATX with Tempered Glass Side Panel',
      'Operating System': 'Windows 11 Pro',
      Networking: '10G Ethernet, Wi-Fi 6E, Bluetooth 5.2',
      'RGB Lighting': 'Addressable RGB with Software Control',
      'Front I/O': '2x USB 3.2 Gen 2, 1x USB 3.2 Gen 2x2 Type-C, Audio In/Out',
      'Rear I/O':
        '8x USB 3.2 Gen 2, 4x USB 3.2 Gen 1, 2x USB 3.2 Gen 2x2 Type-C, 10G Ethernet, Audio Ports',
      'Expansion Slots': '4x PCIe 5.0 x16, 2x PCIe 4.0 x1',
      Dimensions: '550mm x 250mm x 550mm',
      Weight: '22kg',
    },

    featuresAndBenefits: {
      premiumComponents:
        'The Void represents the pinnacle of PC hardware, featuring only the most exclusive and high-performance components available on the market.',
      expertAssembly:
        'Each Void system is built by our master technicians with decades of experience, ensuring immaculate assembly and presentation.',
      extensiveTesting:
        'Our most rigorous testing protocol, with 96 hours of stress testing and benchmarking to ensure absolute perfection in performance.',
      advancedCooling:
        'Dual-loop custom liquid cooling with premium components ensures optimal temperatures and near-silent operation even under extreme workloads.',
      warrantyAndSupport:
        'Exclusive 5-year warranty with white-glove support service and on-site technical assistance if needed.',
      futureProofDesign:
        'The ultimate future-proof design with maximum expandability and the latest technologies to ensure longevity and upgrade potential.',
    },

    warranty: {
      duration: '5 Years',
      coverage: 'Parts and Labor with On-Site Service',
      warrantyProvider: 'QuantumForge',
    },

    returnPolicy: {
      isReturnable: true,
      returnWindowDays: 60,
      returnPolicyDetails:
        '60-day satisfaction guarantee. Return in original packaging for full refund including shipping costs.',
    },

    shipping: {
      shippingWeight: '30kg',
      shippingDimensions: '700mm x 450mm x 700mm',
      shipsFrom: 'Seattle, WA',
      estimatedDelivery: 'White Glove Delivery, 3-7 Business Days',
    },

    support: {
      supportContact: 'elite-support@quantumforge.com',
      faqURL: '/support/faq',
      guideURL: '/support/guides/quantum-void',
    },

    meta: {
      title: 'Quantum Void Gaming PC | QuantumForge',
      description:
        'Experience the ultimate in gaming performance with the Quantum Void featuring AMD Ryzen 9 and NVIDIA RTX 4090 graphics with custom liquid cooling.',
      keywords: [
        'gaming pc',
        'amd ryzen 9',
        'rtx 4090',
        'liquid cooling',
        'custom pc',
        'enthusiast gaming',
        'high-end pc',
      ],
    },

    tags: [
      'Gaming',
      'AMD',
      'NVIDIA',
      'Custom Loop',
      'Liquid Cooling',
      'Premium',
      'Enthusiast',
    ],
    isFeatured: false,
    isCustomizable: true,

    availableOptions: {
      //   cpu: [
      //     'AMD Ryzen 9 7950X',
      //     'AMD Ryzen 9 7950X3D',
      //     'Intel Core i9-13900KS',
      //   ],
      gpu: ['NVIDIA RTX 4090', 'Dual NVIDIA RTX 4080'],
      ram: ['64GB DDR5-6400', '128GB DDR5-6000', '128GB DDR5-6400'],
      storage: ['8TB NVMe SSD', '12TB NVMe SSD', '8TB NVMe SSD + 16TB HDD'],
    },

    ratings: {
      averageRating: 5.0,
      reviewCount: 18,
      reviews: [
        {
          userId: 'user345',
          userName: 'Thomas Wright',
          rating: 5,
          comment:
            'The Void is simply in a class of its own. The build quality is museum-worthy, and the performance is otherworldly. Worth every penny for those who demand the absolute best.',
          date: createDate(30),
        },
        {
          userId: 'user678',
          userName: 'Sophia Martinez',
          rating: 5,
          comment:
            'As a professional game developer, I need serious horsepower. The Void handles everything I throw at it - compiling, rendering, testing - all simultaneously without breaking a sweat.',
          date: createDate(60),
        },
        {
          userId: 'user901',
          userName: 'Ryan Kim',
          rating: 5,
          comment:
            'The white glove delivery and setup service was exceptional. The system itself is a masterpiece of engineering. Absolutely silent even under full load, and the performance is mind-blowing.',
          date: createDate(15),
        },
      ],
    },

    createdAt: createDate(120),
    updatedAt: createDate(3),
  },
];

export default products;
