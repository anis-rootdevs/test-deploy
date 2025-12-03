export const dynamic = "force-dynamic";
import OurStory from "@/components/our-stories/OurStory";
import OurValue from "@/components/our-stories/OurValue";
import StoryHeroSection from "@/components/our-stories/StoryHeroSection";

const OutletsHomePage = () => {
  return (
    <>
      <StoryHeroSection />
      <OurStory />
      <OurValue />
      {/* <BookReservationHome2 /> */}
    </>
  );
};

export default OutletsHomePage;
