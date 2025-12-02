import { getMenuList } from "@/actions/menu/menuActions";
import { CategorySectionSkeleton } from "@/components/landing-page/menu-section/menu-items-card-loader";
import MenuSectionPage from "@/components/landing-page/menu-section/MenuSectionPage";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

export default async function MenuHome() {
  const menuList = await getMenuList();
  return (
    <Suspense fallback={<CategorySectionSkeleton />}>
      <MenuSectionPage initialMenuData={menuList || []} />
    </Suspense>
  );
}
