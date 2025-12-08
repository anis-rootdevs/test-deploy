"use client";

import { updateTermsPolicy } from "@/actions/settings/settingsActions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaFileContract } from "react-icons/fa6";
import RichTextEditor from "./RichTextEditor";

interface TermsPolicyData {
  terms: string;
  policy: string;
}

export default function TermsConditions({
  termsPolicy,
}: {
  termsPolicy: TermsPolicyData;
}) {
  console.log(termsPolicy);
  const methods = useForm<TermsPolicyData>({
    defaultValues: {
      terms: "",
      policy: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  // Fetch initial data
  useEffect(() => {
    if (termsPolicy) {
      reset({
        terms: termsPolicy.terms || "",
      });
    }
  }, [reset, termsPolicy]);

  const onSubmit = async (data: TermsPolicyData) => {
    try {
      const response = await updateTermsPolicy(data);
      console.log("response", response);

      if (response?.status) {
        toast.success(
          response?.message || "Terms & Policy updated successfully"
        );
      } else {
        toast.error(response?.message || "Failed to update terms & policy");
      }
    } catch (error) {
      console.error("Error updating terms & policy:", error);
      toast.error("An error occurred while updating");
    }
  };
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FaFileContract className="h-5 w-5 text-primary" />
                  Terms & Conditions
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Terms & Conditions Information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Terms Section */}
                <div className="space-y-4">
                  <RichTextEditor
                    name="terms"
                    label=""
                    placeholder="Enter terms and conditions..."
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? "Updating..." : "Update Terms & Conditions"}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
