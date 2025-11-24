export const dynamic = "force-dynamic";
import { getCategoriesList } from "@/actions/categories/categoriesActions";
import { getProductList } from "@/actions/product/productActions";
import ProductsList from "./_components/ProductsList";

interface ProductsHomeProps {
  searchParams: Promise<{
    search?: string;
    filter?: string;
    refresh?: string;
  }>;
}

export default async function ProductsHome({
  searchParams,
}: ProductsHomeProps) {
  // Await searchParams in Next.js 15+
  const resolvedParams = await searchParams;
  const { search, filter, refresh } = resolvedParams;

  // Build params object
  const params: any = {};
  if (search) params.search = search;
  if (filter && filter !== "all") params.tag = filter;

  const [products, categories] = await Promise.all([
    getProductList(params),
    getCategoriesList(),
  ]);

  return (
    <ProductsList
      initialProducts={products?.data?.docs || []}
      categories={categories?.data || []}
      initialSearch={search || ""}
      initialFilter={(filter as any) || "all"}
    />
  );
}
