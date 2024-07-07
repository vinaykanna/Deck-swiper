import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tinder card game With Framer Motion",
  description: "A quiz game based on the Tinder-like gesture",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="font-acuminLight overflow-hidden ">{children}</body>
    </html>
  );
}
