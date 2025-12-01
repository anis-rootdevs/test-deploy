import { getCategoriesList } from "@/actions/categories/categoriesActions";
import ProductForm from "../_components/ProductForm";

export default async function ProductsCreatePage() {
  const categoriesResult = await getCategoriesList();

  if (!categoriesResult?.status || !categoriesResult?.data) {
    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-medium mb-4">Add New Product</h2>
        <p className="text-red-500">Failed to load categories</p>
      </div>
    );
  }

  return (
    <div className="lg:w-1/2 md:w-2/3 w-full">
      <h2 className="text-xl font-medium mb-4">Add New Product</h2>
      <ProductForm categories={categoriesResult.data} />
    </div>
  );
}
