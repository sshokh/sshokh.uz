import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@heroui/styles";

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "sshokh.uz",
  description:
    "Special portfolio I crafted for myself to display my work, skills as well as some personal achievements.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${mono.className} h-full antialiased dark`}
    >
      <body>
        <div className="absolute flex w-full items-center justify-center">
          <div
            className={cn(
              "absolute inset-0",
              "[background-size:20px_20px]",
              "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
            )}
          />
          {/* Radial gradient for the container to give a faded look */}
          <div className="pointer-events-none absolute z-10 inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_1%,black)] dark:bg-black"></div>
          <div className="z-50 min-h-screen container mx-auto lg:tracking-normal tracking-tighter justify-between">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
