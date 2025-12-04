"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Facebook,
  FileText,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  Save,
  Settings,
  Shield,
  Smartphone,
  Twitter,
  Users,
  Wrench,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import RichTextEditor from "./RichTextEditor";
interface SettingsFormData {
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  supportEmail: string;
  supportPhone: string;
  address: string;
  privacyPolicy: string;
  termsOfService: string;
  aboutUs: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  tiktok: string;
  isInMaintenanceMode: boolean;
  maintenanceModeMessage: string;
  iosAppLink: string;
  androidAppLink: string;
  forceAndroidAppUpdate: boolean;
  forceIosAppUpdate: boolean;
  androidAppVersion: string;
  iosAppVersion: string;
}

const initialValues = {
  siteName: "",
  siteTitle: "",
  siteDescription: "",
  supportEmail: "",
  supportPhone: "",
  address: "",
  privacyPolicy: "",
  termsOfService: "",
  aboutUs: "",
  facebook: "",
  twitter: "",
  instagram: "",
  linkedin: "",
  youtube: "",
  tiktok: "",
  isInMaintenanceMode: false,
  maintenanceModeMessage: "",
  iosAppLink: "",
  androidAppLink: "",
  androidAppVersion: "",
  iosAppVersion: "",
  forceAndroidAppUpdate: false,
  forceIosAppUpdate: false,
};

export default function SettingTabs() {
  const [activeTab, setActiveTab] = useState("general");
  const form = useForm<SettingsFormData>({
    // defaultValues,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const isInMaintenanceMode = watch("isInMaintenanceMode");
  const isAndroidMode = watch("forceAndroidAppUpdate");
  const isIOSMode = watch("forceIosAppUpdate");

  const onSubmit = async (data: SettingsFormData) => {
    console.log("Settings saved:", data);
  };

  const handleReset = () => {
    reset(initialValues);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8 bg-blue-400 text-white">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Contact</span>
          </TabsTrigger>
          <TabsTrigger value="legal" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Legal</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Social</span>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">System</span>
          </TabsTrigger>
        </TabsList>

        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Site Information
                  </CardTitle>
                  <CardDescription>
                    Configure your website's basic information and branding
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input
                        id="siteName"
                        placeholder="My Awesome Website"
                        {...register("siteName")}
                      />
                      {errors.siteName && (
                        <p className="text-sm text-destructive">
                          {errors.siteName.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="siteTitle">Site Title</Label>
                      <Input
                        id="siteTitle"
                        placeholder="Welcome to My Website"
                        {...register("siteTitle")}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea
                      id="siteDescription"
                      placeholder="A brief description of your website and what it offers..."
                      rows={4}
                      {...register("siteDescription")}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Contact Information
                  </CardTitle>
                  <CardDescription>
                    Set up your support and contact details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="supportEmail"
                        className="flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4" />
                        Support Email
                      </Label>
                      <Input
                        id="supportEmail"
                        type="email"
                        placeholder="support@example.com"
                        {...register("supportEmail", {
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      {errors.supportEmail && (
                        <p className="text-sm text-destructive">
                          {errors.supportEmail.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="supportPhone"
                        className="flex items-center gap-2"
                      >
                        <Phone className="h-4 w-4" />
                        Support Phone
                      </Label>
                      <Input
                        id="supportPhone"
                        placeholder="+1 (555) 123-4567"
                        {...register("supportPhone")}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="address"
                      className="flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4" />
                      Business Address
                    </Label>
                    <Textarea
                      id="address"
                      placeholder="123 Main Street, City, State, ZIP Code"
                      rows={3}
                      {...register("address")}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="legal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Legal Pages
                  </CardTitle>
                  <CardDescription>
                    Configure your legal documentation and policies
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="termsOfService"
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      Terms of Service
                    </Label>
                    <RichTextEditor
                      name="termsOfService"
                      label="Body Content"
                      placeholder="Write your news article here..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aboutUs">About Us Content</Label>
                    <RichTextEditor
                      name="body"
                      label="Body Content"
                      placeholder="Write your news article here..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Social Media Links
                  </CardTitle>
                  <CardDescription>
                    Connect your social media profiles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="facebook"
                        className="flex items-center gap-2"
                      >
                        <Facebook className="h-4 w-4 text-blue-600" />
                        Facebook
                      </Label>
                      <Input
                        id="facebook"
                        placeholder="https://facebook.com/yourpage"
                        {...register("facebook")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="twitter"
                        className="flex items-center gap-2"
                      >
                        <Twitter className="h-4 w-4 text-blue-400" />
                        Twitter/X
                      </Label>
                      <Input
                        id="twitter"
                        placeholder="https://twitter.com/youraccount"
                        {...register("twitter")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="instagram"
                        className="flex items-center gap-2"
                      >
                        <Instagram className="h-4 w-4 text-pink-600" />
                        Instagram
                      </Label>
                      <Input
                        id="instagram"
                        placeholder="https://instagram.com/youraccount"
                        {...register("instagram")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="linkedin"
                        className="flex items-center gap-2"
                      >
                        <Linkedin className="h-4 w-4 text-blue-700" />
                        LinkedIn
                      </Label>
                      <Input
                        id="linkedin"
                        placeholder="https://linkedin.com/company/yourcompany"
                        {...register("linkedin")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="youtube"
                        className="flex items-center gap-2"
                      >
                        <Youtube className="h-4 w-4 text-red-600" />
                        YouTube
                      </Label>
                      <Input
                        id="youtube"
                        placeholder="https://youtube.com/c/yourchannel"
                        {...register("youtube")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="tiktok"
                        className="flex items-center gap-2"
                      >
                        <div className="h-4 w-4 bg-black rounded-sm flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            T
                          </span>
                        </div>
                        TikTok
                      </Label>
                      <Input
                        id="tiktok"
                        placeholder="https://tiktok.com/@youraccount"
                        {...register("tiktok")}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-primary" />
                    Maintenance Mode
                  </CardTitle>
                  <CardDescription>
                    Control site availability and maintenance settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="maintenanceMode">
                          Maintenance Mode
                        </Label>
                        {isInMaintenanceMode && (
                          <Badge variant="destructive">Active</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Enable to show maintenance page to visitors
                      </p>
                    </div>
                    <Switch
                      id="maintenanceMode"
                      checked={isInMaintenanceMode}
                      onCheckedChange={(checked) =>
                        setValue("isInMaintenanceMode", checked)
                      }
                    />
                  </div>

                  {isInMaintenanceMode && (
                    <div className="space-y-2">
                      <Label htmlFor="maintenanceModeMessage">
                        Maintenance Message
                      </Label>
                      <Textarea
                        id="maintenanceModeMessage"
                        placeholder="We're currently performing scheduled maintenance. Please check back soon!"
                        rows={3}
                        {...register("maintenanceModeMessage")}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-primary" />
                    Mobile App Links
                  </CardTitle>
                  <CardDescription>
                    Configure links to your mobile applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="iosAppLink">iOS App Store Link</Label>
                      <Input
                        id="iosAppLink"
                        placeholder="https://apps.apple.com/app/yourapp"
                        {...register("iosAppLink")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="androidAppLink">
                        Google Play Store Link
                      </Label>
                      <Input
                        id="androidAppLink"
                        placeholder="https://play.google.com/store/apps/details?id=yourapp"
                        {...register("androidAppLink")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="androidAppVersion">
                        Android App Version
                      </Label>
                      <Input
                        id="androidAppVersion"
                        placeholder="1.0.1"
                        {...register("androidAppVersion")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="iosAppVersion">IOS App Version</Label>
                      <Input
                        id="iosAppVersion"
                        placeholder="1.0.1"
                        {...register("iosAppVersion")}
                      />
                    </div>
                    <div className="gap-2 md:gap-4 flex items-center">
                      <Label htmlFor="forceAndroidAppUpdate">
                        Forced Android App Update
                      </Label>

                      <Switch
                        id="forceAndroidAppUpdate"
                        checked={isAndroidMode}
                        onCheckedChange={(checked) =>
                          setValue("forceAndroidAppUpdate", checked)
                        }
                      />
                    </div>
                    <div className="gap-2 md:gap-4 flex items-center">
                      <Label htmlFor="forceIosAppUpdate">
                        Forced IOS App Update
                      </Label>

                      <Switch
                        id="forceIosAppUpdate"
                        checked={isIOSMode}
                        onCheckedChange={(checked) =>
                          setValue("forceIosAppUpdate", checked)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <Separator />

            <div className="flex items-center justify-end pt-6">
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="h-4 w-4" />

                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full size-4 border-b-2 border-white mr-2" />
                      Saving...
                    </>
                  ) : (
                    "Save Settings"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </Tabs>
    </div>
  );
}
