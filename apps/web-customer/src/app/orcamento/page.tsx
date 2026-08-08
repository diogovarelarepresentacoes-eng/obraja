import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Solicitar Orçamento — ObraJá',
  description: 'Solicite orçamentos de múltiplas lojas para sua obra.',
}

export default function OrcamentoPage() {
  return (
    <main className="container-app py-8 mt-16">
      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#F05A28' }}>
        💬 Orçamento
      </p>
      <h1 className="text-2xl font-black mt-1" style={{ color: '#1A1A1A' }}>
        Solicitar orçamento
      </h1>
      <p className="mt-2 text-sm" style={{ color: '#9E9E9E' }}>
        Formulário de cotação em massa com múltiplos fornecedores — em breve.
      </p>
    </main>
  )
}
