"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/config/routes";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Mail, Lock } from "lucide-react";
import PasswordField from "../form/PasswordField";
import InputField from "../form/InputField";

type LoginInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [error, setError] = useState("");
  const { status } = useSession();
  const router = useRouter();

  // ✅ Single unified form instance
  const methods = useForm<LoginInputs>();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.replace(routes.privateRoutes.admin.dashboard);
    }
  }, [status, router]);

  // ✅ Handle login
  const onSubmit = async (data: LoginInputs) => {
    setError("");

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      toast.success("Login Successful!");
      router.push(routes.privateRoutes.admin.dashboard);
    }
  };

  // ✅ While session loading
  if (status === "loading") {
    return <p className="text-center mt-10">Checking session...</p>;
  }

  return (
    <div className="flex w-full">
      <Card className="w-full max-w-lg rounded-l-[8px] md:rounded-r-none md:border-none shadow-none md:p-6 p-3">
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

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-sm font-medium text-left">
                  {error}
                </p>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg transition-colors h-11 rounded-[4px] cursor-pointer"
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
          className="absolute inset-0 h-full w-full object-cover md:rounded-r-[8px]"
        />
      </div>
    </div>
  );
};

export default LoginForm;
