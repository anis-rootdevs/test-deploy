import { getCategoriesList } from "@/actions/categories/categoriesActions";
import { DynamicBreadcrumb } from "@/components/custom/DynamicBreadcrumb";
import ProductForm from "../_components/ProductForm";
const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Product" },
  { label: "Add" },
];

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
      <div className="flex flex-col flex-1 gap-2 mb-8">
        <h2 className="font-jost font-medium text-lg">Manage Add Product</h2>
        <div>
          <DynamicBreadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <ProductForm categories={categoriesResult.data} />
    </div>
  );
}
