import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import { InputHTMLAttributes } from "react";

export default function SearchBar({
  value,
  onChange,
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative min-w-[200px] max-w-[400px] flex-1">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Type name for Search..."
        className="pl-9"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
