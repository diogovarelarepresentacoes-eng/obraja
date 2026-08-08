import type { Metadata } from 'next'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Pedido #${id} — ObraJá`,
    description: 'Acompanhe o status e rastreamento do seu pedido.',
  }
}

export default async function PedidoPage({ params }: Props) {
  const { id } = await params

  return (
    <main className="container-app py-8 mt-16">
      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#F05A28' }}>
        📦 Rastreamento
      </p>
      <h1 className="text-2xl font-black mt-1" style={{ color: '#1A1A1A' }}>
        Pedido #{id}
      </h1>
      <p className="mt-2 text-sm" style={{ color: '#9E9E9E' }}>
        Timeline de status do pedido, mapa com localização do entregador em tempo real e canal de suporte — em breve.
      </p>
    </main>
  )
}
