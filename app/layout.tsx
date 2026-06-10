import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/lib/CartContext'
import AgeVerification from '@/components/AgeVerification/AgeVerification'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sangría Victoria | Sangría Premium de Curicó',
  description:
    'Descubre Sangría Victoria, una sangría premium elaborada artesanalmente en Curicó. Compra online y disfruta una experiencia única.',
  keywords: 'sangría, sangria premium, Curicó, Chile, vino, artesanal, Valle de Curicó',
  authors: [{ name: 'Sangría Victoria' }],
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://sangriavictoria.cl',
    siteName: 'Sangría Victoria',
    title: 'Sangría Victoria | Sangría Premium de Curicó',
    description:
      'Descubre Sangría Victoria, una sangría premium elaborada artesanalmente en Curicó. Compra online y disfruta una experiencia única.',
    images: [
      {
        url: '/images/hero-bg.png',
        width: 1200,
        height: 630,
        alt: 'Sangría Victoria Premium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sangría Victoria | Sangría Premium de Curicó',
    description:
      'Descubre Sangría Victoria, una sangría premium elaborada artesanalmente en Curicó.',
    images: ['/images/hero-bg.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#6A0F1D',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Sangría Victoria',
              url: 'https://sangriavictoria.cl',
              logo: 'https://sangriavictoria.cl/images/logo.png',
              description:
                'Sangría premium elaborada artesanalmente en Curicó, Chile',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Curicó',
                addressRegion: 'Maule',
                addressCountry: 'CL',
              },
              sameAs: [
                'https://www.instagram.com/sangriavictoria',
                'https://www.facebook.com/sangriavictoria',
              ],
            }),
          }}
        />
      </head>
      <body>
        <CartProvider>
          <AgeVerification />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
