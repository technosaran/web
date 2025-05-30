import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Saran - Portfolio",
    template: "%s | Saran - Portfolio"
  },
  description: "Full Stack Developer & Software Engineer. Passionate about creating innovative web applications and solving complex problems with modern technologies like React, Next.js, and Node.js.",
  keywords: [
    "developer", "portfolio", "web development", "software engineer",
    "react", "nextjs", "nodejs", "typescript", "javascript", "python",
    "full stack developer", "frontend developer", "backend developer",
    "saran", "space technology", "cybersecurity", "data analytics"
  ],
  authors: [{ name: "Saran", url: "https://saransci2006@gmail.com" }],
  creator: "Saran",
  publisher: "Saran",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saran.dev",
    title: "Saran - Portfolio",
    description: "Full Stack Developer & Software Engineer specializing in modern web technologies",
    siteName: "Saran Portfolio",
    images: [
      {
        url: `${process.env.NODE_ENV === 'production' ? '/web' : ''}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Saran - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saran - Portfolio",
    description: "Full Stack Developer & Software Engineer",
    images: [`${process.env.NODE_ENV === 'production' ? '/web' : ''}/og-image.jpg`],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://saran.dev",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  colorScheme: 'dark light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://formspree.io" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="theme-color" content="#0f172a" />

        {/* PWA Manifest */}
        <link rel="manifest" href={`${process.env.NODE_ENV === 'production' ? '/web' : ''}/manifest.json`} />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href={`${process.env.NODE_ENV === 'production' ? '/web' : ''}/icon-192x192.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${process.env.NODE_ENV === 'production' ? '/web' : ''}/icon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${process.env.NODE_ENV === 'production' ? '/web' : ''}/icon-16x16.png`} />

        {/* Safari Pinned Tab */}
        <link rel="mask-icon" href={`${process.env.NODE_ENV === 'production' ? '/web' : ''}/safari-pinned-tab.svg`} color="#8b5cf6" />

        {/* Microsoft Tiles */}
        <meta name="msapplication-config" content={`${process.env.NODE_ENV === 'production' ? '/web' : ''}/browserconfig.xml`} />

        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />

        {/* Performance Hints */}
        <link rel="preload" href="/web/_next/static/css/" as="style" />
        <link rel="preload" href="/web/_next/static/js/" as="script" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        suppressHydrationWarning
      >
        <noscript>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#0f172a',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            fontSize: '18px',
            textAlign: 'center',
            padding: '20px'
          }}>
            <div>
              <h1>JavaScript Required</h1>
              <p>This portfolio requires JavaScript to function properly. Please enable JavaScript in your browser.</p>
            </div>
          </div>
        </noscript>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
