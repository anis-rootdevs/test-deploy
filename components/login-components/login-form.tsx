"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

type LoginInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [error, setError] = useState("");
  const { status } = useSession();
  const router = useRouter();

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  // ✅ Setup React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>();

  // ✅ Handle login submission
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
      toast.success("Login Successfully!");
      router.push("/dashboard");
    }
  };

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <Label
                htmlFor="email"
                className="text-sm font-jost font-medium mb-1"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@demo.com"
                {...register("email", { required: "Required!" })}
                className="h-11 rounded-[4px] text-[18px] font-semibold tracking-[1px] font-mono focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <Label
                htmlFor="password"
                className="text-sm font-jost font-medium mb-1"
              >
                Password
              </Label>
              <Input
                id="password"
                type={isEyeOpen ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", { required: "Required!" })}
                className="h-11 rounded-[4px] text-[18px] font-semibold tracking-[3px] font-mono focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
              />

              {isEyeOpen ? (
                <IoEyeOutline
                  onClick={() => setIsEyeOpen(false)}
                  className="absolute top-9 right-3 text-lg text-muted-foreground cursor-pointer"
                />
              ) : (
                <IoEyeOffOutline
                  onClick={() => setIsEyeOpen(true)}
                  className="absolute top-9 right-3 text-lg text-muted-foreground cursor-pointer"
                />
              )}
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm font-medium text-center">
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

          <div className="text-center mt-4 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Admin Panel. All rights reserved.
          </div>
        </CardContent>
      </Card>
      <div className="relative hidden md:block  h-[450px] w-full">
        <Image
          height={100}
          width={100}
          src="/images/locations/doughnut-pastry-bar-coffee-location.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover md:rounded-r-[8px]"
        />
      </div>
    </div>
  );
};

export default LoginForm;
