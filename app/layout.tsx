import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'RoastMyBag.ai — Get Your Crypto Bags Roasted by AI',
  description:
    'Paste your BSC wallet. Get a savage, data-driven AI roast of every token you paper-handed. See exactly how much money you left on the table. Built on BNB Chain × Four.Meme.',
  keywords: [
    'crypto roast',
    'wallet roast',
    'BNB Chain',
    'Four.Meme',
    'paper hands',
    'jeet score',
    'degen',
    'meme coins',
    'AI roast',
  ],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'RoastMyBag.ai — Your Bags Are Cooked 🔥',
    description: 'AI-powered roast of your worst crypto trades. See your Jeet Score.',
    type: 'website',
    locale: 'en_US',
    siteName: 'RoastMyBag.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RoastMyBag.ai — Your Bags Are Cooked 🔥',
    description: 'AI-powered roast of your worst crypto trades.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white font-[family-name:var(--font-heading)]">
        {children}
      </body>
    </html>
  );
}
