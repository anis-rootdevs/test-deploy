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
import { Save, Shield } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import RichTextEditor from "./RichTextEditor";

interface TermsPolicyData {
  terms: string;
  policy: string;
}

export default function PrivacyPolicy({
  termsPolicy,
}: {
  termsPolicy: TermsPolicyData;
}) {
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
        policy: termsPolicy.policy || "",
      });
    }
  }, [reset, termsPolicy]);

  const onSubmit = async (data: TermsPolicyData) => {
    try {
      const response = await updateTermsPolicy(data);

      if (response?.status) {
        toast.success(
          response?.message || "Privacy Policy updated successfully"
        );
      } else {
        toast.error(response?.message || "Failed to update terms & policy");
      }
    } catch (error) {
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
                  <Shield className="h-5 w-5 text-primary" />
                  Privacy & Policy
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Privacy Policy Information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Policy Section */}
                <div className="space-y-4">
                  <RichTextEditor
                    name="policy"
                    label="Privacy Policy"
                    placeholder="Enter privacy policy..."
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
                {isSubmitting ? "Updating..." : "Update Privacy Policy"}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
