import { getOfferShowcase } from "@/actions/showcase/showcaseActions";
import { DynamicBreadcrumb } from "@/components/custom/DynamicBreadcrumb";
import OfferShowcaseForm from "./_components/OfferShowcaseForm";
const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Showcase" },
  { label: "Offer" },
];

export default async function OfferShowcaseHome() {
  const reservationShowcase = await getOfferShowcase();
  console.log(reservationShowcase);
  return (
    <div className="lg:w-1/2 w-full">
      <div className="flex flex-col flex-1 gap-2 mb-8">
        <h2 className="font-jost font-medium text-lg">Manage Offer Showcase</h2>
        <div>
          <DynamicBreadcrumb items={breadcrumbItems} />
        </div>
      </div>
      <OfferShowcaseForm showCase={reservationShowcase?.data} />
    </div>
  );
}
