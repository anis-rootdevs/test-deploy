import { getReversedList } from "@/actions/reverse/reverseTableActions";
import ReverseBookingList from "./_components/ReverseBookingList";
interface ReverseHomeProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    refresh?: string;
  }>;
}

export default async function ReverseTableHome({
  searchParams,
}: ReverseHomeProps) {
  const resolvedParams = await searchParams;
  const { search, status } = resolvedParams;

  // Build params object
  const params: any = {};
  if (search) params.search = search;
  if (status && status !== "all") params.status = status;

  const [reverseList] = await Promise.all([getReversedList(params)]);

  return (
    <ReverseBookingList
      initialReverseList={reverseList?.data?.docs || []}
      initialSearch={search || ""}
      initialFilter={(status as any) || "all"}
    />
  );
}
