"use client";

import { handleLogin } from "@/app/(auth)/login/actions";
import InputField from "@/components/form/InputField";
import PasswordField from "@/components/form/PasswordField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/config/routes";
import { Lock, Mail } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type LoginInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { status } = useSession();
  const router = useRouter();

  // ✅ Single unified form instance
  const methods = useForm<LoginInputs>();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // ✅ Handle login
  const onSubmit = async (data: LoginInputs) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const result = await handleLogin(formData);

      if (result?.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Login successful!");
      // Trigger NextAuth sign-in on client
      const nextAuthRes: any = await signIn("credentials", {
        email: data.email,
        token: result.token,
        callbackUrl: routes.privateRoutes.admin.dashboard,
      });

      if (nextAuthRes?.error) {
        toast.error(nextAuthRes.error);
        return;
      }

      // router.push(routes.privateRoutes.admin.dashboard);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  // ✅ While session loading
  if (status === "loading") {
    return <p className="text-center mt-10">loading..</p>;
  }

  return (
    <div className="flex w-full">
      <Card className="w-full max-w-lg rounded-l-xl md:rounded-r-none md:border-none shadow-none md:p-6 p-3">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold font-jost text-foreground">
            Admin Login
          </CardTitle>
          <p className="text-base text-muted-foreground mt-1 font-jost">
            Sign in to access your dashboard
          </p>
        </CardHeader>

        <CardContent>
          {/* ✅ Wrap with FormProvider */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <InputField
                name="email"
                label="Email"
                type="email"
                placeholder="admin@demo.com"
                prefix={<Mail size={18} />}
                rules={{ required: "Required!" }}
              />

              {/* Password */}
              <PasswordField
                name="password"
                prefix={<Lock size={18} />}
                rules={{ required: "Required!" }}
              />

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg transition-colors h-11 rounded-lg cursor-pointer"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </FormProvider>

          <div className="text-center mt-4 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Admin Panel. All rights reserved.
          </div>
        </CardContent>
      </Card>

      {/* Right-side image */}
      <div className="relative hidden md:block h-[450px] w-full">
        <Image
          height={100}
          width={100}
          src="/images/locations/doughnut-pastry-bar-coffee-location.svg"
          alt="Login illustration"
          className="absolute inset-0 h-full w-full object-cover md:rounded-r-xl"
        />
      </div>
    </div>
  );
};

export default LoginForm;
