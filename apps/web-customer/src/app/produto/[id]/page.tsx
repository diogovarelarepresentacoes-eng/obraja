import type { Metadata } from 'next'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Produto #${id} — ObraJá`,
    description: 'Detalhes do produto, preços e opções de entrega.',
  }
}

export default async function ProdutoPage({ params }: Props) {
  const { id } = await params

  return (
    <main className="container-app py-8 mt-16">
      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#F05A28' }}>
        Detalhe do Produto
      </p>
      <h1 className="text-2xl font-black mt-1" style={{ color: '#1A1A1A' }}>
        Produto #{id}
      </h1>
      <p className="mt-2 text-sm" style={{ color: '#9E9E9E' }}>
        Galeria, descrição, especificações técnicas, comparador de preços entre lojas e opções de entrega — em breve.
      </p>
    </main>
  )
}
