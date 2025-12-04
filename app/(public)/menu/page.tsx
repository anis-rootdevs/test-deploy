import { getMenuList } from "@/actions/menu/menuActions";
import {
  getAllOfferShowcase,
  getAllReservationShowcase,
} from "@/actions/showcase/showcaseActions";
import { CategorySectionSkeleton } from "@/components/landing-page/menu-section/menu-items-card-loader";
import MenuSectionPage from "@/components/landing-page/menu-section/MenuSectionPage";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

export default async function MenuHome() {
  const menuList = await getMenuList();
  const reservationShowcase = await getAllReservationShowcase();
  const offerShowcase = await getAllOfferShowcase();
  console.log(offerShowcase);
  return (
    <Suspense fallback={<CategorySectionSkeleton />}>
      <MenuSectionPage
        initialMenuData={menuList || []}
        reservationShowcase={reservationShowcase?.data}
        offerShowcase={offerShowcase?.data}
      />
    </Suspense>
  );
}
