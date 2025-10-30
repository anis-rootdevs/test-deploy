import MenuSectionPage from "@/components/landing-page/menu-section/menu-section-page";

import { MenuFilterProvider } from "@/contexts/menu-filter-context";

const MenuHome = () => {
  return (
    <MenuFilterProvider>
      <MenuSectionPage />
    </MenuFilterProvider>
  );
};

export default MenuHome;
