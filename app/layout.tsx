import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "shokh.dev",
  description: "My portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mono.className} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col container mx-auto bg-background text-accent-foreground">{children}</body>
    </html>
  );
}
