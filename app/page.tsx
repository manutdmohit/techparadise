import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Cpu, Monitor } from 'lucide-react';

// import SiteFooter from '@/components/site-footer';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      {/* <SiteHeader /> */}

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="relative w-full flex-1 flex flex-col items-center justify-center overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black to-transparent"></div>
          </div>

          {/* Content */}
          <div className="container relative z-10 py-20 md:py-32">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200">
                Choose Your Experience
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Select the path that best suits your computing needs
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Gaming Option */}
              <div className="group relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative h-full flex flex-col bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden group-hover:border-zinc-700 transition-all duration-300">
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8"
                      width={800}
                      height={400}
                      alt="Gaming PC"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 bg-purple-600/90 rounded-full p-3">
                      <Cpu className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-3xl font-bold mb-3">Gaming</h2>
                    <p className="text-zinc-400 mb-6 flex-1">
                      High-performance custom gaming PCs built for enthusiasts.
                      Experience unparalleled gaming with cutting-edge
                      components and expert craftsmanship.
                    </p>

                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      <Link href="/gaming" className="w-full">
                        Explore Gaming PCs
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Corporate Option */}
              <div className="group relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative h-full flex flex-col bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden group-hover:border-zinc-700 transition-all duration-300">
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1"
                      width={800}
                      height={400}
                      alt="Corporate Workstation"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 bg-blue-600/90 rounded-full p-3">
                      <Monitor className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-3xl font-bold mb-3">Corporate</h2>
                    <p className="text-zinc-400 mb-6 flex-1">
                      Professional workstations and IT solutions designed for
                      businesses. Reliable, powerful systems optimized for
                      productivity and performance.
                    </p>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                      <Link href="/corporate" className="w-full">
                        Explore Corporate Solutions
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      {/* <SiteFooter simplified /> */}
    </div>
  );
}
