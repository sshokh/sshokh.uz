import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geist = Geist();

export const metadata = {
  title: "shokhjahon",
  description:
    "Portfolio of shokhjahon — frontend web developer. Work, skills and a few personal notes, kept minimal.",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${geist.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
