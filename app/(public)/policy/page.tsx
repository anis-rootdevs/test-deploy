import { getAllSettingsDetails } from "@/actions/settings/settingsActions";
import PrivacyPolicy from "./_components/PrivacyPolicy";
export const dynamic = "force-dynamic";

export default async function PrivacyPolicyPage() {
  const policy = await getAllSettingsDetails("termsPolicy");

  return (
    <>
      <PrivacyPolicy policy={policy?.data || {}} />
    </>
  );
}
