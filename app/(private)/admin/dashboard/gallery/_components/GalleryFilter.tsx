"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TYPE_OPTIONS = [
  { value: "all", label: "All Gallery" },
  { value: "1", label: "Featured Gallery" },
];
interface GalleryTypeFilterProps {
  value: string;
  onChange: (value: string, label: string) => void;
}

export default function GalleryFilter({
  value,
  onChange,
}: GalleryTypeFilterProps) {
  return (
    <Select
      value={value || "all"}
      onValueChange={(value) =>
        onChange(value, TYPE_OPTIONS.find((t) => t.value === value)?.label!)
      }
    >
      <SelectTrigger className="w-[160px]">
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
