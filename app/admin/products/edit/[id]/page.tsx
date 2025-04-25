import ProductForm from '../../product-form';

interface EditProductPageProps {
  params: { id: string };
}

export default function EditProductPage({ params }: EditProductPageProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-white">
        Edit Product
      </h1>
      <ProductForm productId={params.id} isEditing />
    </div>
  );
}
