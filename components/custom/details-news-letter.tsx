"use client";
import {
  NewsletterFormData,
  newsletterSchema,
  NewsletterSubscribeProps,
} from "@/lib/validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const DetailsNewsLetter = ({
  onSubscribe,
  className = "",
}: NewsletterSubscribeProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    mode: "onSubmit",
  });
  const onSubmit = async () => {
    toast.success("You’ve successfully subscribed to our newsletter!");
    // Reset form
    reset();
  };
  return (
    <div className={`w-full max-w-[640px] mx-auto ${className}`}>
      {/* Header Section */}
      <div className="text-start mb-6">
        <h2 className="text-xl lg:text-2xl font-bold text-[#000] mb-2 dark:text-[#F9FAFB]">
          Subscribe to the Newsletter
        </h2>
        <p className="text-sm sm:text-base text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
          Join our community and never miss new posts, ideas, and insights.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4"
      >
        {/* Input Wrapper */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="email"
              {...register("email")}
              disabled={isSubmitting}
              placeholder="Enter your email address"
              className={`w-full px-4 py-3 rounded-[10px] text-sm sm:text-base helvetica-neue-regular 
          bg-white dark:bg-[#111] text-[#111] dark:text-[#F9FAFB]
          placeholder:text-[#9CA3AF] transition-all
          focus:outline-none focus:ring-2 focus:ring-offset-0 
          ${
            errors.email
              ? "border border-red-500 focus:ring-red-500/50"
              : "border border-[#E5E7EB] dark:border-[#374151] focus:ring-[#1F1F1F]/20 dark:focus:ring-[#F9FAFB]/20"
          }`}
            />
            {errors.email && (
              <p className="absolute text-[12px] text-red-600 mt-1 left-0 sm:static sm:mt-1 animate-fadeIn">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end sm:justify-start">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 sm:px-7 py-3 rounded-[10px] text-sm sm:text-base helvetica-neue-medium
        bg-[#1F1F1F] dark:bg-[#F9FAFB] text-[#F9FAFB] dark:text-[#1F1F1F]
        hover:bg-[#000] dark:hover:bg-white transition-all
        focus:outline-none focus:ring-2 focus:ring-offset-2
        focus:ring-[#1F1F1F] dark:focus:ring-[#F9FAFB]
        disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap
        sm:self-start"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DetailsNewsLetter;
