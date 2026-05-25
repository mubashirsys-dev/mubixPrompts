import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MubixPrompts — The AI Prompt Operating System for Website Generation",
  description:
    "Generate massive, detailed master prompts for building complete websites, apps, dashboards, and SaaS platforms using AI tools like ChatGPT, Claude, Cursor, Lovable, Bolt, and more.",
  keywords: [
    "AI prompt generator",
    "website prompt",
    "AI coding",
    "master prompt",
    "SaaS builder",
    "AI website builder",
    "mubixprompts",
  ],
  openGraph: {
    title: "MubixPrompts — AI Prompt Operating System",
    description:
      "Generate production-ready master prompts for building complete websites using AI coding tools.",
    type: "website",
    url: "https://mubixprompts.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "MubixPrompts — AI Prompt Operating System",
    description:
      "Generate production-ready master prompts for building websites using AI tools.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#FFFDF5] text-black" suppressHydrationWarning>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
