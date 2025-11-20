import { getBanners } from "@/actions/banner/bannerActions";
import BannerLists from "./_components/BannerList";
export const dynamic = "force-dynamic";

export default async function BannerPage() {
  const banners = await getBanners();
  console.log("banners", banners);
  return (
    <>
      <BannerLists data={banners?.data || []} />
    </>
  );
}
