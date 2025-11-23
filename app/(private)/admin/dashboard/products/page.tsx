import { getCategoriesList } from "@/actions/categories/categoriesActions";
import { getProductList } from "@/actions/product/productActions";
import ProductsList from "./_components/ProductsList";

export default async function ProductsHome() {
  const products = await getProductList();
  const categories = await getCategoriesList();
  console.log("products===", products);

  return (
    <ProductsList
      initialProducts={products?.data?.docs || []}
      categories={categories?.data || []}
    />
  );
}
