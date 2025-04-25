'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export default function OrderConfirmationPage() {
  const router = useRouter();
  const { user } = useAuth();

  // Redirect if accessed directly without placing an order
  useEffect(() => {
    const hasPlacedOrder = sessionStorage.getItem('orderPlaced');
    if (!hasPlacedOrder) {
      // Uncomment this in production to prevent direct access
      // router.push("/products")
    } else {
      // Clear the flag after successful redirect
      sessionStorage.removeItem('orderPlaced');
    }
  }, [router]);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto text-center bg-zinc-900 border border-zinc-800 rounded-lg p-8">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-20 w-20 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
          Order Confirmed!
        </h1>
        <p className="text-xl mb-8">
          Thank you for your purchase. Your order has been received and is being
          processed.
        </p>
        <p className="text-zinc-400 mb-2">
          A confirmation email has been sent to your email address.
        </p>
        <p className="text-zinc-400 mb-8">
          Order number:{' '}
          <span className="font-semibold">
            ORD-{Math.random().toString(36).substring(2, 10).toUpperCase()}
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {user && (
            <Button
              onClick={() => router.push('/account/orders')}
              variant="outline"
              className="border-zinc-700"
            >
              View Order History
            </Button>
          )}
          <Button
            onClick={() => router.push('/products')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
