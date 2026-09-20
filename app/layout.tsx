import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CookTake",
  description: "Fresh and ready to cook items delivered to your doorstep",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
      <html className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
