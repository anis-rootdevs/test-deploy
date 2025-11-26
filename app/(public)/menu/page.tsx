import { getMenuCold, getMenuList } from "@/actions/menu/menuActions";
import MenuSectionPage from "@/components/landing-page/menu-section/menu-section-page";
export const dynamic = "force-dynamic";
const MenuHome = async () => {
  const menuList = await getMenuList();
  console.log(menuList);
  const coldList = await getMenuCold();
  console.log(coldList);
  return <MenuSectionPage />;
};

export default MenuHome;
