import type { Metadata } from "next";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import "./globals.css";
import { brand } from "@/data/site";

const notoSans = Noto_Sans_TC({
  subsets: ["latin"],
  variable: "--font-noto-sans-tc",
  weight: ["400", "500", "700"]
});

const notoSerif = Noto_Serif_TC({
  subsets: ["latin"],
  variable: "--font-noto-serif-tc",
  weight: ["500", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zhiyue-brand-concept.vercel.app"),
  title: "質悅 ZHI YUE | 台中西區美術園道髮與頭皮美學概念網站",
  description:
    "質悅 ZHI YUE 品牌概念網站。以健康髮質管理、頭皮養護與專屬造型，呈現台中美術園道的 Gallery Calm 體驗。",
  openGraph: {
    title: "質悅 ZHI YUE | 為髮質而生，為悅己而來",
    description:
      "台中西區美術園道髮與頭皮美學沙龍概念網站，正式上線前需由品牌方確認內容與素材授權。",
    type: "website",
    locale: "zh_TW",
    images: [
      {
        url: "/images/generated/hero-gallery-calm.png",
        width: 1792,
        height: 1024,
        alt: "質悅 ZHI YUE Gallery Calm concept visual"
      }
    ]
  },
  robots: {
    index: false,
    follow: false
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: `${brand.nameZh} ${brand.nameEn}`,
    description: brand.descriptor,
    address: {
      "@type": "PostalAddress",
      streetAddress: "五權一街33號",
      addressLocality: "西區",
      addressRegion: "台中市",
      addressCountry: "TW"
    },
    telephone: brand.phoneDisplay
  };

  return (
    <html lang="zh-Hant-TW" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
