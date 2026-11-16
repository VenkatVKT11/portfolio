import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { site } from "@/content/site";
import { themeIds } from "@/content/themes";
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
  "Venkatesan G, Digital Marketing Manager in Chennai. Meta and Google Ads, SEO, n8n AI automation, and Power BI and Excel dashboards, with real project work.";

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
    "Meta Ads",
    "Google Ads",
    "SEO",
    "Lead Generation",
    "n8n",
    "Power BI",
    "Data Analytics",
    "Digital Marketing Chennai",
    "Chennai",
  ],
  creator: "Venkatesan G",
  category: "portfolio",
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
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
    <html lang="en" data-theme={site.theme} data-mode={site.mode} className={`${heading.variable} ${body.variable} antialiased`} suppressHydrationWarning>
      <body>
        {site.themePicker && (
          // Applies a theme chosen in the preview picker before the page paints, so it never flashes.
          <script
            dangerouslySetInnerHTML={{
              // Only themes that still exist are applied, so an old saved choice falls back to the default.
              __html: `try{var d=document.documentElement,t=localStorage.getItem("vg-theme"),m=localStorage.getItem("vg-mode");if(t&&${JSON.stringify(themeIds)}.indexOf(t)>-1)d.dataset.theme=t;if(m==="light"||m==="dark")d.dataset.mode=m}catch(e){}`,
            }}
          />
        )}
        {children}
      </body>
    </html>
  );
}
