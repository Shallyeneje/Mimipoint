import Providers from "@/providers";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mimipoint",
  description:
    " Mimipoint is more than a vtu application , where you can advertise your product and exchange Currencies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
