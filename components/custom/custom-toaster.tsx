"use client";
import React from "react";
import { Toaster, ToastBar } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

const CustomToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "transparent",
          boxShadow: "none",
          padding: 0,
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ message }) => (
            <div
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 shadow-md border text-sm font-medium transition-all duration-300 z-999",
                t.type === "success" &&
                  "bg-green-500/10 text-green-700 border-green-400/30 dark:text-green-300",
                t.type === "error" &&
                  "bg-red-500/10 text-red-700 border-red-400/30 dark:text-red-300",
                t.type === "loading" &&
                  "bg-blue-500/10 text-blue-700 border-blue-400/30 dark:text-blue-300"
              )}
            >
              {t.type === "success" && <CheckCircle2 size={18} />}
              {t.type === "error" && <AlertCircle size={18} />}
              {t.type === "loading" && (
                <Loader2 size={18} className="animate-spin" />
              )}
              <span>{message}</span>
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default CustomToaster;
