import { getReservationShowcase } from "@/actions/showcase/showcaseActions";
import { DynamicBreadcrumb } from "@/components/custom/DynamicBreadcrumb";
import ReservationShowcaseForm from "./_components/ReservationShowcaseForm";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Showcase" },
  { label: "Reservation" },
];

export default async function ReservationShowcaseHome() {
  const reservationShowcase = await getReservationShowcase();

  return (
    <div className="lg:w-1/2 w-full">
      <div className="flex flex-col flex-1 gap-2 mb-8">
        <h2 className="font-jost font-medium text-lg">
          Manage Reservation Showcase
        </h2>
        <div>
          <DynamicBreadcrumb items={breadcrumbItems} />
        </div>
      </div>
      <ReservationShowcaseForm showCase={reservationShowcase?.data} />
    </div>
  );
}
