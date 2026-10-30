import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parcel",
  description: "Everyday things, well chosen.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}