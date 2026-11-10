import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Octopus",
  description: "Octopus consumer electronics demo.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
