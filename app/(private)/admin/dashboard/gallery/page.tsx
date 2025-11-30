import { getGalleryLists } from "@/actions/gallery/galleryActions";
import GalleryList from "./_components/GalleryList";

export default async function GalleryHome() {
  const galleryList = await getGalleryLists(10, 1);
  console.log("totalPages", galleryList);

  const docs = galleryList?.data?.docs ?? [];
  const totalPages = galleryList?.data?.totalPage ?? 0;

  return (
    <>
      <GalleryList galleryList={docs} initialTotalPages={totalPages} />
    </>
  );
}
