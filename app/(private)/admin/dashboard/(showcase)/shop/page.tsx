import { getShowcaseList } from "@/actions/showcase/showcaseActions";
import { DynamicBreadcrumb } from "@/components/custom/DynamicBreadcrumb";
import ShopShowcaseForm from "./_components/ShopShowcaseForm";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Showcase" },
  { label: "Shop" },
];

export default async function ShopShowcasePage() {
  const showCase = await getShowcaseList();

  return (
    <div className="lg:w-1/2 w-full ">
      <div className="flex flex-col flex-1 gap-2 mb-8">
        <h2 className="font-jost font-medium text-lg">Manage Shop Showcase</h2>
        <div>
          <DynamicBreadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <ShopShowcaseForm showCase={showCase?.data} />
    </div>
  );
}
