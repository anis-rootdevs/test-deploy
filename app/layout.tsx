import CustomToaster from "@/components/custom/custom-toaster";
import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

// Load fonts with unique variable names
const jost = Jost({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Cafe Shop",
  description: "Cafe Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jost.className} ${jost.variable} bg-[#FEFEFC] dark:bg-[#0F141B] dark:text-[#FEFEFF]  text-[#101020]`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          {/* ✅ Add the global toaster here */}
          <CustomToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
