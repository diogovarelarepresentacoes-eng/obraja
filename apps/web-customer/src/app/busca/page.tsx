import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Busca — ObraJá',
  description: 'Encontre materiais de construção com os melhores preços.',
}

export default function BuscaPage() {
  return (
    <main className="container-app py-8 mt-16">
      <h1 className="text-2xl font-black" style={{ color: '#1A1A1A' }}>Busca</h1>
      <p className="mt-2 text-sm" style={{ color: '#9E9E9E' }}>
        Busca com filtros por categoria, preço, loja e região — em breve.
      </p>
    </main>
  )
}
