import { getAllSettingsDetails } from "@/actions/settings/settingsActions";
import TermsAndConditions from "./_components/TermsAndConditions";

export default async function TermsHome() {
  const terms = await getAllSettingsDetails("termsPolicy");
  console.log(terms);

  return (
    <>
      <TermsAndConditions terms={terms?.data || {}} />
    </>
  );
}
