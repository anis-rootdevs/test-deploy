"use client";
import { updateGeneralSettings } from "@/actions/settings/settingsActions";
import PhoneInputField from "@/components/custom/PhoneInputField";
import InputField from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaSlidersH } from "react-icons/fa";
import FileUploadComponent from "../../dashboard/_components/FileUploadComponent";

interface GeneralFormData {
  companyName: string;
  supportEmail: string;
  companyDialCode: string;
  companyPhone: string;
  companyAddress: string;
  ownerName: string;
  ownerEmail: string;
  logo: FileList | null;
  favicon: FileList | null;
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  homeView: string;
}

export default function GeneralSettings({ general }: any) {
  const [logoFiles, setLogoFiles] = useState<File[]>([]);
  const [faviconFiles, setFaviconFiles] = useState<File[]>([]);
  const methods = useForm<GeneralFormData>({
    defaultValues: {
      companyName: "",
      supportEmail: "",
      companyDialCode: "+880",
      companyPhone: "",
      companyAddress: "",
      ownerName: "",
      ownerEmail: "",
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
      homeView: "home-1",
    },
  });

  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    if (general) {
      reset({
        companyName: general.companyName || "",
        supportEmail: general.supportEmail || "",
        companyDialCode: general.companyDialCode || "+880",
        companyPhone: general.companyPhone || "",
        companyAddress: general.companyAddress || "",
        ownerName: general.ownerName || "",
        ownerEmail: general.ownerEmail || "",
        facebook: general.facebook || "",
        instagram: general.instagram || "",
        twitter: general.twitter || "",
        youtube: general.youtube || "",
        homeView: general.homeView || "home-1",
      });
    } else {
      reset({
        companyName: "",
        supportEmail: "",
        companyDialCode: "+880",
        companyPhone: "",
        companyAddress: "",
        ownerName: "",
        ownerEmail: "",
        facebook: "",
        instagram: "",
        twitter: "",
        youtube: "",
        homeView: "home-1",
      });
    }
    setFaviconFiles([]);
    setLogoFiles([]);
  }, [general, reset]);

  const onSubmit = async (data: GeneralFormData) => {
    // Validate image only for add mode
    // if (!isEditMode && imageFiles.length === 0) {
    //   toast.error("Please upload an image!");
    //   return;
    // }

    try {
      const formData = new FormData();
      formData.append("companyName", data.companyName || "");
      formData.append("supportEmail", data.supportEmail || "");
      formData.append("companyAddress", data.companyAddress || "");
      formData.append("ownerName", data.ownerName || "");
      formData.append("ownerEmail", data.ownerEmail || "");
      formData.append("facebook", data.facebook || "");
      formData.append("instagram", data.instagram || "");
      formData.append("twitter", data.twitter || "");
      formData.append("youtube", data.youtube || "");
      formData.append("homeView", data.homeView || "");

      let cleanPhone = String(data.companyPhone || "");
      const dialCode = String(data.companyDialCode || "").replace("+", "");

      // If phone starts with dial code, remove it
      if (cleanPhone.startsWith(dialCode)) {
        cleanPhone = cleanPhone.substring(dialCode.length);
      }

      formData.append("companyPhone", cleanPhone);
      formData.append("companyDialCode", String(data.companyDialCode || ""));

      // Add favicon if selected
      if (faviconFiles.length > 0) {
        formData.append("favicon", faviconFiles[0]);
      }
      // Add image if selected
      if (logoFiles.length > 0) {
        formData.append("logo", logoFiles[0]);
      }
      console.log("formData", formData);

      const loadingToast = toast.loading("Updating general setting...");

      const result = await updateGeneralSettings(formData);

      toast.dismiss(loadingToast);

      if (!result.status) {
        toast.error(result.message || "Failed to save general setting");
        return;
      }

      toast.success(result.message || "General Setting successfully!");

      reset();
      setLogoFiles([]);
      setFaviconFiles([]);
    } catch (error: any) {
      toast.error("Error saving outlet!");
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700  ">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaSlidersH className="h-5 w-5 text-primary" />
              General Information
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Configure your website's basic information and branding
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Company Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  name="companyName"
                  label="Company Name"
                  placeholder="Pizza Store"
                  rules={{ required: "Required!" }}
                />

                <InputField
                  name="supportEmail"
                  label="Support Email"
                  placeholder="pizzastore@gmail.com"
                  type="email"
                  rules={{
                    required: "Required!",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Number */}
                <div className="">
                  <PhoneInputField
                    name="companyPhone"
                    dialCodeName="companyDialCode"
                    label="Company Phone"
                    required={true}
                    defaultCountry="bd"
                    className=""
                    errorBadge={false}
                  />
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="homeView" className="dark:text-gray-200">
                    Home View
                  </Label>
                  <Controller
                    name="homeView"
                    control={control}
                    rules={{ required: "Required!" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full !h-11">
                          <SelectValue placeholder="Select home view" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="home-1">Home 1</SelectItem>
                          <SelectItem value="home-2">Home 2</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.homeView && (
                    <p className="text-sm text-red-500">
                      {errors.homeView.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyAddress" className="dark:text-gray-200">
                  Company Address
                </Label>
                <Textarea
                  id="companyAddress"
                  placeholder="Adabor, Dhaka 1207"
                  rows={3}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  {...register("companyAddress", { required: "Required!" })}
                />
                {errors.companyAddress && (
                  <p className="text-sm text-red-500">
                    {errors.companyAddress.message}
                  </p>
                )}
              </div>
            </div>

            {/* Owner Information */}
            <div className="space-y-4 pt-4 border-t dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  name="ownerName"
                  label="Owner Name"
                  placeholder="Joynal Khan"
                  rules={{ required: "Required!" }}
                />

                <InputField
                  name="ownerEmail"
                  label="Owner Email"
                  placeholder="joynal@email.com"
                  type="email"
                  rules={{
                    required: "Required!",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                />
              </div>
            </div>

            {/* Branding */}
            <div className="space-y-4 pt-4 border-t dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="logo" className="dark:text-gray-200">
                    Logo
                  </Label>
                  <div className="flex items-center gap-2">
                    <FileUploadComponent
                      accept="image"
                      maxSize={15}
                      maxFiles={1}
                      onFilesChange={setLogoFiles}
                      existingImageUrl={
                        general?.logo ? general.logo : undefined
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="favicon" className="dark:text-gray-200">
                    Favicon
                  </Label>
                  <div className="flex items-center gap-2">
                    <FileUploadComponent
                      accept="image"
                      maxSize={15}
                      maxFiles={1}
                      onFilesChange={setFaviconFiles}
                      existingImageUrl={
                        general?.favicon ? general.favicon : undefined
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="space-y-4 pt-4 border-t dark:border-gray-700">
              <h3 className="text-lg font-semibold dark:text-gray-200">
                Social Media
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  name="facebook"
                  label="Facebook URL"
                  placeholder="https://www.facebook.com"
                />

                <InputField
                  name="instagram"
                  label="Instagram URL"
                  placeholder="https://www.instagram.com"
                />

                <InputField
                  name="twitter"
                  label="Twitter/X URL"
                  placeholder="https://x.com"
                />

                <InputField
                  name="youtube"
                  label="YouTube URL"
                  placeholder="https://www.youtube.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? "Updating..." : "Update General Settings"}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
