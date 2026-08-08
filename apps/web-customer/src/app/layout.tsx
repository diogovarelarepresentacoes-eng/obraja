import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ObraJá — Marketplace de Materiais de Construção',
  description:
    'Compare preços, compre materiais de construção e acompanhe suas entregas em tempo real.',
  keywords: 'cimento, tijolo, material de construção, obra, preço, entrega',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
