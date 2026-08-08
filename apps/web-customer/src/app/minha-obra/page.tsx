import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Minha Obra — ObraJá',
  description: 'Monte sua lista de materiais e receba orçamentos de múltiplas lojas.',
}

export default function MinhaObraPage() {
  return (
    <main className="container-app py-8 mt-16">
      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#F05A28' }}>
        📋 Minha Obra
      </p>
      <h1 className="text-2xl font-black mt-1" style={{ color: '#1A1A1A' }}>
        Lista de materiais
      </h1>
      <p className="mt-2 text-sm" style={{ color: '#9E9E9E' }}>
        Crie e gerencie listas de materiais por projeto. Solicite cotações de várias lojas simultaneamente — em breve.
      </p>
    </main>
  )
}
