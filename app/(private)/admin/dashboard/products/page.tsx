import { getProductList } from "@/actions/product/productActions";
import ProductsList from "./_components/ProductsList";

export default async function ProductsHome() {
  const products = await getProductList();
  console.log(products.data.docs);
  return (
    <>
      <ProductsList products={products?.data?.docs} />
    </>
  );
}
