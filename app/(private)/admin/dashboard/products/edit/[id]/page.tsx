import { getCategoriesList } from "@/actions/categories/categoriesActions";
import ProductForm from "../../_components/ProductForm";

interface ProductEditPageProps {
  params: {
    id: string;
  };
}

export default async function ProductEditPage({
  params,
}: ProductEditPageProps) {
  const { id } = await params;

  const categoriesResult = await getCategoriesList();

  if (!categoriesResult?.status || !categoriesResult?.data) {
    return (
      <div className="max-w-2xl">
        <h2 className="text-xl font-medium mb-4">Edit Product</h2>
        <p className="text-red-500">Failed to load categories</p>
      </div>
    );
  }

  return (
    <div className="lg:w-1/2 md:w-2/3 w-full">
      <h2 className="text-xl font-medium mb-4">Edit Product</h2>
      <ProductForm categories={categoriesResult.data} productId={id} />
    </div>
  );
}
