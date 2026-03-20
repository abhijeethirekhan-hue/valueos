import type { Metadata } from 'next'
import { Unbounded, JetBrains_Mono, Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const unbounded = Unbounded({ 
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-unbounded"
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains"
});

const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit"
});

export const metadata: Metadata = {
  title: 'ValueOS — India\'s Central AI Agent for the Digital Economy',
  description: 'The behavioral AI that tells every person and business what their subscriptions, SaaS tools, and AI agents are actually worth — based on what they DO, not what vendors claim.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${unbounded.variable} ${jetbrainsMono.variable} ${outfit.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
