import { getStoryShowcase } from "@/actions/showcase/showcaseActions";
import { DynamicBreadcrumb } from "@/components/custom/DynamicBreadcrumb";
import StoryShowcaseForm from "./_components/StoryShowcaseForm";
const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Showcase" },
  { label: "Story" },
];

export default async function StoryShowcaseHome() {
  const storyShowcase = await getStoryShowcase();
  return (
    <div className="lg:w-2/3 w-full ">
      <div className="flex flex-col flex-1 gap-2 mb-8">
        <h2 className="font-jost font-medium text-lg">Manage Story Showcase</h2>
        <div>
          <DynamicBreadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <StoryShowcaseForm showCase={storyShowcase?.data} />
    </div>
  );
}
