"use client";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { useUser } from "@/hooks/use-user";
import { redirect, usePathname } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = useUser();
  const pathName = usePathname();

  const authRoutes = ["/", "/sign-up", "/forgot-password"];
  const isInAuthRoute = authRoutes.includes(pathName);

  if (user && isInAuthRoute) return redirect("/dashboard");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
