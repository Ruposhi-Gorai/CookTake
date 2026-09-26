import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cooktake.in"),

  title: {
    default: "CookTake | Fresh Cut Vegetables & Ready-to-Cook Meal Prep",
    template: "%s | CookTake",
  },

  description:
    "Order fresh cut vegetables, sprouts, soaked dals and ready-to-cook meal prep ingredients delivered across Bangalore. Save time, cook fresh.",

  keywords: [
    "fresh cut vegetables Bangalore",
    "ready to cook vegetables",
    "meal prep Bangalore",
    "cut vegetables delivery",
    "sprouts delivery Bangalore",
    "soaked chana delivery",
    "CookTake",
    "vegetable delivery Bangalore",
  ],

  authors: [{ name: "CookTake" }],
  creator: "CookTake",
  publisher: "CookTake",

  openGraph: {
    title: "CookTake | Fresh Cut Vegetables Bangalore",
    description:
      "Freshly cut vegetables, sprouts & ready-to-cook ingredients delivered to your doorstep in Bangalore.",
    url: "https://cooktake.in",
    siteName: "CookTake",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CookTake - Fresh Ready to Cook",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CookTake",
    description:
      "Fresh cut vegetables & ready-to-cook meal prep delivered in Bangalore.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://cooktake.in",
  },

  category: "Food Delivery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "CookTake",
    image: "https://cooktake.in/logo.png",
    url: "https://cooktake.in",
    telephone: "+91XXXXXXXXXX",
    email: "hello@cooktake.in",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    areaServed: "Bengaluru",
    servesCuisine: "Fresh Meal Prep",
    description:
      "Fresh cut vegetables, sprouts, soaked legumes and ready-to-cook ingredients delivered across Bangalore.",
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}