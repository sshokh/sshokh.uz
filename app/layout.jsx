import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "shokh.dev",
  description: "My portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${mono.className} h-full antialiased dark`}>
      <body className="min-h-screen container mx-auto lg:tracking-normal tracking-tighter bg-background text-accent-foreground justify-between">
        {children}
      </body>
    </html>
  );
}
