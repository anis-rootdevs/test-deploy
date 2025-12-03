export const dynamic = "force-dynamic";
import {
  getAllReservationShowcase,
  getAllStoryShowcase,
} from "@/actions/showcase/showcaseActions";
import BookReservationHome2 from "@/components/landing-page/book-reserve-section/BookReservationHome2";
import OurStory from "@/components/our-stories/OurStory";
import OurValue from "@/components/our-stories/OurValue";
import StoryHeroSection from "@/components/our-stories/StoryHeroSection";
import { Suspense } from "react";

const OutletsHomePage = async () => {
  const storyShowcase = await getAllStoryShowcase();
  const reservationShowcase = await getAllReservationShowcase();

  return (
    <Suspense fallback={<p>Story showcase loading.....</p>}>
      <StoryHeroSection storyShowcase={storyShowcase?.data} />
      <OurStory storyShowcase={storyShowcase?.data} />
      <OurValue storyShowcase={storyShowcase?.data} />
      <BookReservationHome2 reservationShowcase={reservationShowcase?.data} />
    </Suspense>
  );
};

export default OutletsHomePage;
