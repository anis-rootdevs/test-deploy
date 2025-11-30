export const dynamic = "force-dynamic";
import { getCategoriesList } from "@/actions/categories/categoriesActions";
import ProductsList from "./_components/ProductsList";

export default async function ProductsHome() {
  // Await searchParams in Next.js 15+
  const categories = await getCategoriesList();
  return (
    <ProductsList
      categories={categories?.data || []}
      // initialSearch={search || ""}
      // initialFilter={(filter as any) || "all"}
    />
  );
}
