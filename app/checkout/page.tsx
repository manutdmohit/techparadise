import type { Metadata } from 'next';
import CheckoutForm from './checkout-form';

export const metadata: Metadata = {
  title: 'Checkout - QuantumForge',
  description:
    'Complete your purchase of high-performance gaming PCs and workstations.',
};

export default function CheckoutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
        Checkout
      </h1>
      <CheckoutForm />
    </div>
  );
}
