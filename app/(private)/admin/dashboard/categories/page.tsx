import { getCategoriesList } from "@/actions/categories/categoriesActions";
import CategoriesList from "./_components/CategoriesList";

export default async function CategoriesHome() {
  const categories = await getCategoriesList();

  return (
    <>
      <CategoriesList categories={categories?.data} />
    </>
  );
}
