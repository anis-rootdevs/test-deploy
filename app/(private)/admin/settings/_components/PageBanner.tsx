"use client";
import { updatePageBanner } from "@/actions/settings/settingsActions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Inbox, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FileUploadComponent from "../../dashboard/_components/FileUploadComponent";

interface BannerFormData {
  location: FileList | null;
  menu: FileList | null;
  gallery: FileList | null;
  reserveTable: FileList | null;
}
export default function PageBanner({ pageBanner }: any) {
  const [menuFiles, setMenuFiles] = useState<File[]>([]);
  const [locationFiles, setLocationFiles] = useState<File[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [reserveTableFiles, setReserveTableFiles] = useState<File[]>([]);
  const methods = useForm<BannerFormData>({
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (pageBanner) {
      reset({});
    } else {
      reset({});
    }
    setReserveTableFiles([]);
    setGalleryFiles([]);
    setLocationFiles([]);
    setMenuFiles([]);
  }, [pageBanner, reset]);

  const onSubmit = async (data: BannerFormData) => {
    // Validate image only for add mode
    // if (!isEditMode && imageFiles.length === 0) {
    //   toast.error("Please upload an image!");
    //   return;
    // }

    try {
      const formData = new FormData();

      // Add favicon if selected
      if (menuFiles.length > 0) {
        formData.append("menu", menuFiles[0]);
      }
      // Add image if selected
      if (locationFiles.length > 0) {
        formData.append("location", locationFiles[0]);
      }

      if (galleryFiles.length > 0) {
        formData.append("gallery", galleryFiles[0]);
      }
      if (reserveTableFiles.length > 0) {
        formData.append("reserveTable", reserveTableFiles[0]);
      }

      const loadingToast = toast.loading("Updating general setting...");

      const result = await updatePageBanner(formData);

      toast.dismiss(loadingToast);

      if (!result.status) {
        toast.error(result.message || "Failed to save general setting");
        return;
      }

      toast.success(result.message || "General Setting successfully!");

      reset();
      setReserveTableFiles([]);
      setGalleryFiles([]);
      setLocationFiles([]);
      setMenuFiles([]);
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
              <Inbox className="h-5 w-5 text-primary" />
              Page Banner Information
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Upload website's Page Banner Image
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Company Information */}

            {/* Branding */}
            <div className="space-y-4 pt-4 border-t dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <Label
                    htmlFor="menu"
                    className="dark:text-gray-200 text-base font-medium"
                  >
                    Menu Banner
                  </Label>
                  <div className="flex items-center gap-2">
                    <FileUploadComponent
                      accept="image"
                      maxSize={15}
                      maxFiles={1}
                      onFilesChange={setMenuFiles}
                      existingImageUrl={
                        pageBanner?.menu ? pageBanner.menu : undefined
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label
                    htmlFor="location"
                    className="dark:text-gray-200 text-base font-medium"
                  >
                    Location Banner
                  </Label>
                  <div className="flex items-center gap-2">
                    <FileUploadComponent
                      accept="image"
                      maxSize={15}
                      maxFiles={1}
                      onFilesChange={setLocationFiles}
                      existingImageUrl={
                        pageBanner?.location ? pageBanner.location : undefined
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <Label
                    htmlFor="gallery"
                    className="dark:text-gray-200 text-base font-medium"
                  >
                    Gallery Banner
                  </Label>
                  <div className="flex items-center gap-2">
                    <FileUploadComponent
                      accept="image"
                      maxSize={15}
                      maxFiles={1}
                      onFilesChange={setGalleryFiles}
                      existingImageUrl={
                        pageBanner?.gallery ? pageBanner.gallery : undefined
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label
                    htmlFor="reserveTable"
                    className="dark:text-gray-200 text-base font-medium"
                  >
                    Reserve Table Banner
                  </Label>
                  <div className="flex items-center gap-2">
                    <FileUploadComponent
                      accept="image"
                      maxSize={15}
                      maxFiles={1}
                      onFilesChange={setReserveTableFiles}
                      existingImageUrl={
                        pageBanner?.reserveTable
                          ? pageBanner.reserveTable
                          : undefined
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? "Updating Banner..." : "Update Banner Image"}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
