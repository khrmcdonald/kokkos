import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'KOKKOS · Never Stop Quietly Growing',
  description: "The world's first comprehensive soul and body assessment grounded in Christian theology and eastern wisdom. Discover your Seven Seeds, find your Balance, and navigate your Season.",
  keywords: ['soul assessment', 'spiritual wellness', 'chakra', 'Christian theology', 'self-discovery', 'personality assessment'],
  authors: [{ name: 'KOKKOS' }],
  openGraph: {
    title: 'KOKKOS · Never Stop Quietly Growing',
    description: "The world's first comprehensive soul and body assessment grounded in Christian theology and eastern wisdom.",
    url: 'https://kokkos.com',
    siteName: 'KOKKOS',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KOKKOS · Never Stop Quietly Growing',
    description: "The world's first comprehensive soul and body assessment grounded in Christian theology and eastern wisdom.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
