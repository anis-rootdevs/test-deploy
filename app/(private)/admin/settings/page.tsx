import {
  getBusinessHours,
  getCloudinary,
  getGeneralSettings,
  getMetadata,
  getPageBanner,
} from "@/actions/settings/settingsActions";
import { DynamicBreadcrumb } from "@/components/custom/DynamicBreadcrumb";
import SettingsPage from "./_components/SettingsPage";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "General Setting" },
];

export default async function page() {
  const generalSettings = await getGeneralSettings();
  const bannerPage = await getPageBanner();
  const cloudinary = await getCloudinary();
  const metadata = await getMetadata();
  const businessHours = await getBusinessHours();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-3 font-bold tracking-tight">Settings</h1>
          <DynamicBreadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* <SettingContainer /> */}
      <SettingsPage
        generalSettings={generalSettings?.data || []}
        pageBanner={bannerPage?.data || []}
        cloudinary={cloudinary?.data || []}
        metadata={metadata?.data || []}
        businessHours={businessHours?.data || []}
      />
    </div>
  );
}
