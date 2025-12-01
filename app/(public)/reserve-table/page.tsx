export const dynamic = "force-dynamic";
import { getAllOutlets } from "@/actions/outlets/outletsActions";
import ReserveFormComponents from "@/components/landing-page/reserve-table/reserve-form-components";
import ReserveTableHero from "@/components/landing-page/reserve-table/reserve-table-hero";

const ReserveTableHome = async () => {
  const outlet = await getAllOutlets();
  return (
    <div className="relative overflow-hidden px-4">
      {/* Hero Section */}
      <div className="relative z-[1]">
        {/* with image bg */}
        <ReserveTableHero
          bgType="image"
          bgImage="/images/book-reserve/reserve-hero-image.svg"
          openingHours={[
            { days: "Mon – Fri", time: "10 AM - 9 PM" },
            { days: "Saturday", time: "11 AM - 11 PM" },
          ]}
        />

        {/* <ReserveTableHero /> */}
      </div>
      <div className="xl:-mt-[240px] lg:-mt-[190px] lg:-mr-[400px] pb-10 z-[10] relative">
        <ReserveFormComponents outlets={outlet?.data || []} />
      </div>
    </div>
  );
};

export default ReserveTableHome;
