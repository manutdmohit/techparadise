'use client';

import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-20 blur-lg animate-pulse"></div>
          <div className="h-16 w-16 rounded-full border-4 border-zinc-800 border-t-purple-500 animate-spin"></div>
          <Loader2 className="absolute inset-0 h-16 w-16 text-purple-500 animate-pulse" />
        </div>
        <p className="text-lg font-medium text-white">Loading...</p>
        <div className="w-48 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600 w-1/3 animate-[loading_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
