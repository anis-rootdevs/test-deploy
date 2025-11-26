import { getGalleryLists } from "@/actions/gallery/galleryActions";
import GalleryList from "./_components/GalleryList";

export default async function GalleryHome() {
  const galleryList = await getGalleryLists(12, 1);

  return (
    <div>
      <GalleryList galleryList={galleryList?.data?.docs || []} />
    </div>
  );
}
