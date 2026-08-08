import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Carrinho — ObraJá',
  description: 'Revise seus itens e finalize o pedido.',
}

export default function CarrinhoPage() {
  return (
    <main className="container-app py-8 mt-16">
      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#F05A28' }}>
        🛒 Carrinho
      </p>
      <h1 className="text-2xl font-black mt-1" style={{ color: '#1A1A1A' }}>
        Meu carrinho
      </h1>
      <p className="mt-2 text-sm" style={{ color: '#9E9E9E' }}>
        Listagem de itens, quantidade, subtotal, cupom de desconto e resumo do pedido — em breve.
      </p>
    </main>
  )
}
