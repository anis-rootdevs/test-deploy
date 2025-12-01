import { getMenuList } from "@/actions/menu/menuActions";
import { CategorySectionSkeleton } from "@/components/landing-page/menu-section/menu-items-card-loader";
import MenuSectionPage from "@/components/landing-page/menu-section/MenuSectionPage";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
const MenuHome = async () => {
  const menuList = await getMenuList();
  console.log({ menuList });

  return (
    <Suspense fallback={<CategorySectionSkeleton />}>
      <MenuSectionPage initialMenuData={menuList} />
    </Suspense>
  );
};

export default MenuHome;
