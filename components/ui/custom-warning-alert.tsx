import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangleIcon } from "lucide-react";

export default function CustomWarningAlert({ message, title }: any) {
  return (
    <Alert className=" border border-[#1F1F1F]/10 dark:border-gray-700 text-amber-500  [&>svg]:text-amber-500">
      <AlertTriangleIcon className="size-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="text-amber-500">{message}</AlertDescription>
    </Alert>
  );
}
