'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const isCorporate = pathname?.includes('/corporate');

  // Log the error to an error reporting service
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  // Determine accent color based on path
  const accentColor = isCorporate ? 'blue' : 'purple';
  const gradientColors = isCorporate
    ? 'from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600'
    : 'from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600';

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <main className="flex-1 flex flex-col">
        <div className="relative w-full flex-1 flex flex-col items-center justify-center overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
            <div
              className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent`}
            ></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black to-transparent"></div>

            {/* Grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          </div>

          {/* Content */}
          <div className="container relative z-10 py-20 md:py-32 text-center">
            <div className="relative mb-6 inline-block">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 opacity-75 blur-lg"></div>
              <div className="relative">
                <h1 className="text-7xl md:text-8xl font-bold tracking-tighter text-white">
                  System Error
                </h1>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-400 to-zinc-300">
              Something went wrong
            </h2>

            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-6 mb-8 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-red-500/20 p-3 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold mb-2">
                      Error Details
                    </h3>
                    <div className="space-y-2 text-zinc-400 text-sm">
                      <p className="font-mono">
                        <span className="text-red-500">ERROR_TYPE:</span>{' '}
                        Application Error
                      </p>
                      <p className="font-mono">
                        <span className="text-red-500">LOCATION:</span>{' '}
                        {pathname}
                      </p>
                      <p className="font-mono">
                        <span className="text-red-500">MESSAGE:</span>{' '}
                        {error.message || 'An unexpected error occurred'}
                      </p>
                      {error.digest && (
                        <p className="font-mono">
                          <span className="text-red-500">DIGEST:</span>{' '}
                          {error.digest}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                className={`bg-gradient-to-r ${gradientColors} flex items-center gap-2`}
                onClick={reset}
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>

              <Link href="/">
                <Button
                  variant="outline"
                  className="border-zinc-700 text-white hover:bg-zinc-800 flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Return to Homepage
                </Button>
              </Link>
            </div>

            {/* Terminal-like section */}
            <div className="mt-12 max-w-3xl mx-auto">
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                <div className="bg-zinc-800 px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-zinc-400 font-mono flex-1 text-center">
                    error-log
                  </div>
                </div>
                <div className="p-4 font-mono text-sm text-left">
                  <p className="text-red-500">
                    quantum-forge@system:~$ ERROR_DETECTED
                  </p>
                  <p className="text-zinc-400">Running diagnostics...</p>
                  <p className="text-zinc-400">Checking system integrity...</p>
                  <p className="text-red-500">
                    Critical error encountered in application module.
                  </p>
                  <p className="text-zinc-400">
                    Recommended action: Retry operation or return to homepage.
                  </p>
                  <p className="text-red-500">
                    quantum-forge@system:~$<span className="blink">_</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add custom styles for the blinking cursor */}
      <style jsx global>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .blink {
          animation: blink 1s infinite;
          margin-left: 2px;
        }
      `}</style>
    </div>
  );
}
