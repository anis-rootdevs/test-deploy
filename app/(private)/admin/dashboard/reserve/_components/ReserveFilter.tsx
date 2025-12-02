import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TYPE_OPTIONS = [
  { value: "all", label: "All Reserve" },
  { value: "pending", label: "Pending Lists" },
  { value: "confirmed", label: "Confirmed Lists" },
  { value: "cancelled", label: "Cancelled Lists" },
];
interface ReverseTypeFilterProps {
  value: string;
  onChange: (value: string, label: string) => void;
}

export default function ReserveFilter({
  value,
  onChange,
}: ReverseTypeFilterProps) {
  return (
    <Select
      value={value || "all"}
      onValueChange={(value) =>
        onChange(value, TYPE_OPTIONS.find((t) => t.value === value)?.label!)
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Type" />
      </SelectTrigger>
      <SelectContent>
        {TYPE_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
