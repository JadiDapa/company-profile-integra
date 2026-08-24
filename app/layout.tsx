import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/providers/Providers";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://integra.net.id";
const defaultTitle = "Integra Telekom | Reliable Unlimited Internet Provider";
const defaultDescription =
  "Integra Telekom is a reliable unlimited internet provider that offers high-speed internet connections in Indonesia, providing you with uninterrupted access to unlimited internet.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Integra Telekom",
  },
  description: defaultDescription,
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Integra Telekom",
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    images: [{ url: "/images/OG.png", width: 1920, height: 912 }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/images/OG.png"],
  },
  alternates: {
    canonical: "/",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Integra Telekom",
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  description: defaultDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`antialiased ${plusJakartaSans.className}`}>
        <Toaster richColors position="top-right" theme="light" />
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
