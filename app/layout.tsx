import NavbarWrapper from "@/Component/content/navbar-wrapper";
import { NavbarProvider } from "@/Component/context/navbar-controller";
import ScrollResetHandler from "@/Component/scroll/scroll-reset-handler";
import SmoothScroll from "@/Component/scroll/SmoothScroll";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/* Load TT Common Pro font */
const ttCommonPro = localFont({
  src: [
    {
      path: "../public/fonts/TTCommonsProTrialThin.woff2", // ✅ Fix path
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/TTCommonsProTrialThinItalic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/TTCommonsProTrialLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/TTCommonsProTrialLightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/TTCommonsProTrialNormal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/TTCommonsProTrialNormalItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/TTCommonsProTrialMedium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/TTCommonsProTrialMediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/TTCommonsProTrialBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/TTCommonsProTrialBoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-tt-common-pro",
  display: "swap",
});

/* Load TT Common Pro Mono font */
const ttCommonProMono = localFont({
  src: [
    {
      path: "../public/fonts/TTCommonsProMonoTrialLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/TTCommonsProMonoTrialLightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/TTCommonsProMonoTrialMedium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/TTCommonsProMonoTrialMediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-tt-common-pro-mono",
  display: "swap",
});

const nohemi = localFont({
  src: [
    {
      path: "../public/fonts/Nohemi/Nohemi-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Nohemi/Nohemi-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/Nohemi/Nohemi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Nohemi/Nohemi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Nohemi/Nohemi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Nohemi/Nohemi-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Nohemi/Nohemi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Nohemi/Nohemi-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Nohemi/Nohemi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-nohemi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "K3Z - Software Developer",
  description:
    "Welcome to the portfolio of Khant Ko Ko Zaw. Let's build something amazing together.",
  keywords: [
    "Khant Ko Ko Zaw",
    "portfolio",
    "full stack developer",
    "web development",
    "software developer",
    "software development",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "developer portfolio",
    "portfolio website",
  ],
  openGraph: {
    title: "K3Z - Software Developer",
    description:
      "Welcome to the portfolio of Khant Ko Ko Zaw. Let's build something amazing together.",
    url: "https://k3zfolio.vercel.app/", // Replace with your actual URL
    siteName: "K3Z - Software Developer",
    images: [
      {
        url: "/image/seo_img.jpg", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Khant Ko Ko Zaw Portfolio",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ttCommonPro.variable} ${ttCommonProMono.variable} ${nohemi.variable} antialiased`}
      >
        {/* <GlobalResizeHandler /> */}
        <SmoothScroll>
          <NavbarProvider>
            <ScrollResetHandler />
            <NavbarWrapper />
            <main className="flex flex-col gap-20 ">{children}</main>
          </NavbarProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
