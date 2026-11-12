import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const heading = Inter_Tight({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Portfolio of Venkatesan G, Digital Marketing Manager in Chennai working across performance marketing, AI automation and data analytics.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Digital Marketing, AI and Data`,
    template: `%s | ${site.name}`,
  },
  description,
  keywords: [
    "Venkatesan G",
    "Digital Marketing Manager",
    "Performance Marketing",
    "AI Automation",
    "Marketing Automation",
    "Chennai",
  ],
  authors: [{ name: "Venkatesan G" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: `${site.name} | Digital Marketing, AI and Data`,
    description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Digital Marketing, AI and Data`,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
