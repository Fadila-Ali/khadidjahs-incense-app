import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Studio",
  description: "Your studio layout",
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}