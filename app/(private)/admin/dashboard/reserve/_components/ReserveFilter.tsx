import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReverseFilterType } from "@/lib/types";

interface ReserveFilterProps<TData> {
  filter: ReverseFilterType;
  setFilter: (value: ReverseFilterType) => void;
  disabled?: boolean;
}

const getDisplayValue = (filter: ReverseFilterType) => {
  switch (filter) {
    case "pending":
      return "Pending";
    case "confirmed":
      return "Confirmed";
    case "cancelled":
      return "Cancelled";
    default:
      return "All List";
  }
};

export default function ReserveFilter<TData>({
  filter,
  setFilter,
  disabled = false,
}: ReserveFilterProps<TData>) {
  return (
    <Select value={filter} onValueChange={setFilter} disabled={disabled}>
      <SelectTrigger className="h-10 w-[180px] rounded-[4px]">
        <SelectValue placeholder="Filter by...">
          {getDisplayValue(filter)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All List</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="cancelled">Cancelled</SelectItem>
        <SelectItem value="confirmed">Confirmed</SelectItem>
      </SelectContent>
    </Select>
  );
}
