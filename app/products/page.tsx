import type { Metadata } from 'next';
import ProductsClientPage from './ProductsClientPage';

export const metadata: Metadata = {
  title: 'Products | QuantumForge',
  description:
    'Browse our selection of high-performance gaming PCs, workstations, and servers.',
};

export default function ProductsPage() {
  return <ProductsClientPage />;
}
