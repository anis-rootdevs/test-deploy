import { Loader2 } from "lucide-react";

export default function loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="animate-spin w-6 h-6 text-primary" />
      {/* <span className="ml-2 text-gray-600">Loading session...</span> */}
    </div>
  );
}
