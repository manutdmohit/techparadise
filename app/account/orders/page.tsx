'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';

// Mock order data
const mockOrders = [
  {
    id: 'ORD-1234-5678',
    date: '2023-04-10',
    status: 'Delivered',
    total: 2499.99,
    items: [{ name: 'Quantum Apex Pro', quantity: 1, price: 2499.99 }],
  },
  {
    id: 'ORD-8765-4321',
    date: '2023-03-22',
    status: 'Processing',
    total: 3699.99,
    items: [
      { name: 'Nebula Elite X', quantity: 1, price: 3499.99 },
      { name: 'Premium Gaming Headset', quantity: 1, price: 199.99 },
    ],
  },
];

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<typeof mockOrders>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect if not logged in
    if (!user && !isLoading) {
      router.push('/');
      return;
    }

    // Simulate fetching orders
    const fetchOrders = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOrders(mockOrders);
      setIsLoading(false);
    };

    if (user) {
      fetchOrders();
    } else {
      setIsLoading(false);
    }
  }, [user, router, isLoading]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-zinc-400">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
        Your Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-zinc-900 border border-zinc-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
          <p className="text-zinc-400 mb-6">
            You haven't placed any orders yet.
          </p>
          <Button
            onClick={() => router.push('/products')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden"
            >
              <div className="p-6 border-b border-zinc-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-semibold">Order #{order.id}</h2>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'Delivered'
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-blue-900/30 text-blue-400'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-zinc-400">Total</p>
                    <p className="font-semibold">${formatPrice(order.total)}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-sm font-medium mb-3">Items</h3>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-zinc-400 text-sm">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p>${formatPrice(item.price)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
