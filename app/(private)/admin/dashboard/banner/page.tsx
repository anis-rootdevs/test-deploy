import { getBanners } from "@/actions/banner/getBanners";
import BannerLists from "./_components/BannerList";

export default async function BannerPage() {
  const banners = await getBanners();
  return (
    <>
      <BannerLists data={banners?.data} />
    </>
  );
}
