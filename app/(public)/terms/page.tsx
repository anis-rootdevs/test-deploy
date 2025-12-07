import { getAllSettingsDetails } from "@/actions/settings/settingsActions";
import TermsAndConditions from "./_components/TermsAndConditions";
export const dynamic = "force-dynamic";

export default async function TermsHome() {
  const terms = await getAllSettingsDetails("termsPolicy");

  return (
    <>
      <TermsAndConditions terms={terms?.data || {}} />
    </>
  );
}
