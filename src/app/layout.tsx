import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Amiri, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const amiri = Amiri({
  subsets: ["arabic"],
  variable: "--font-amiri",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "The Nikkah Ceremony of Arfas Khan & Fidha Fathima",
  description: "Under the grace of Allah (SWT), you are cordially invited to witness the sacred Nikah ceremony of Arfas Khan and Fidha Fathima on Sunday, July 26, 2026. Please share your blessings and RSVP online.",
  keywords: [
    "Nikkah Ceremony",
    "Wedding Invitation",
    "Arfas & Fidha",
    "Arfas Khan & Fidha Fathima",
    "Islamic Wedding",
    "Luxury Wedding Invitation",
    "Wedding Microsite"
  ],
  openGraph: {
    title: "Nikkah Ceremony of Arfas Khan & Fidha Fathima",
    description: "Witness the sacred Nikah ceremony of Arfas Khan and Fidha Fathima on July 26, 2026.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${amiri.variable} ${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
