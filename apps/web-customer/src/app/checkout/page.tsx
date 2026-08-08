import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout — ObraJá',
  description: 'Finalize seu pedido com segurança.',
}

export default function CheckoutPage() {
  return (
    <main className="container-app py-8 mt-16">
      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#F05A28' }}>
        ✅ Checkout
      </p>
      <h1 className="text-2xl font-black mt-1" style={{ color: '#1A1A1A' }}>
        Finalizar pedido
      </h1>
      <p className="mt-2 text-sm" style={{ color: '#9E9E9E' }}>
        Endereço de entrega, seleção de horário, métodos de pagamento (Pix, cartão, boleto) e confirmação — em breve.
      </p>
    </main>
  )
}
