'use client'

import Link from 'next/link'

const PRIMARY = '#F1591D'

const ORDER = {
  id: '#2891',
  supplier: 'Materiais Belo',
  supplierPhone: '(11) 94567-8901',
  supplierEmail: 'vendas@materiaisbelo.com.br',
  status: 'Em entrega',
  statusColor: '#f97316',
  statusBg: '#fff7ed',
  date: '01/08/2026',
  estimatedDelivery: '04/08/2026',
  obra: 'Residencial Parque das Flores — Bloco C',
  deliveryAddress: 'Rua das Acácias, 234 — Jardim Primavera, São Paulo/SP — 02345-678',
  paymentMethod: 'Faturamento 30 dias',
  nf: 'NF-001892',
  nfDue: '31/08/2026',
  driver: 'João Mendes',
  driverPhone: '(11) 91234-5678',
  plate: 'ABC-1D23',
  items: [
    { name: 'Cimento CP-II 50kg', sku: 'CIM-CPII-50', qty: 500, unit: 'sacos', unitPrice: 31.90, total: 15950 },
  ],
  timeline: [
    { step: 'Pedido Realizado', time: '01/08 09:14', done: true, current: false },
    { step: 'Confirmado pelo Fornecedor', time: '01/08 09:45', done: true, current: false },
    { step: 'Preparando', time: '01/08 14:30', done: true, current: false },
    { step: 'Em Entrega', time: '02/08 07:00', done: true, current: true },
    { step: 'Entregue', time: 'Previsto 04/08', done: false, current: false },
  ],
}

const currency = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function PedidoDetailPage() {
  const subtotal = ORDER.items.reduce((s, i) => s + i.total, 0)
  const freight = 0

  return (
    <main className="flex-1 px-8 py-8" style={{ marginTop: 64 }}>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-5" style={{ color: '#9E9E9E' }}>
        <Link href="/pedidos" className="hover:underline">Pedidos</Link>
        <span>›</span>
        <span style={{ color: '#1A1A1A', fontWeight: 600 }}>{ORDER.id}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-black" style={{ color: '#1A1A1A' }}>{ORDER.id}</h1>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ color: ORDER.statusColor, background: ORDER.statusBg }}>{ORDER.status}</span>
          </div>
          <div className="text-sm" style={{ color: '#9E9E9E' }}>Realizado em {ORDER.date} · Obra: {ORDER.obra}</div>
        </div>
        <button className="px-4 py-2 rounded-xl text-sm font-bold border transition-all hover:opacity-80"
          style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }}>
          Baixar NF
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Main content */}
        <div className="col-span-2 space-y-5">
          {/* Delivery tracking */}
          <div className="bg-white rounded-2xl border p-6" style={{ borderColor: '#F2F2F2' }}>
            <div className="font-bold mb-6" style={{ color: '#1A1A1A' }}>Rastreamento da Entrega</div>
            <div className="relative">
              {/* Progress line */}
              <div className="absolute left-4 top-4 bottom-4 w-0.5" style={{ background: '#F2F2F2' }} />
              <div className="absolute left-4 top-4 w-0.5 transition-all"
                style={{
                  background: PRIMARY,
                  height: `${(ORDER.timeline.filter(t => t.done).length - 1) / (ORDER.timeline.length - 1) * 100}%`,
                }} />
              <div className="space-y-6">
                {ORDER.timeline.map((step, i) => (
                  <div key={i} className="flex items-start gap-4 relative">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10"
                      style={{
                        background: step.current ? PRIMARY : step.done ? '#fff' : '#F8F8F8',
                        border: step.done ? `2px solid ${PRIMARY}` : '2px solid #E5E5E5',
                      }}>
                      {step.done && !step.current && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke={PRIMARY} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      {step.current && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                    </div>
                    <div className="pt-1">
                      <div className="text-sm font-bold" style={{ color: step.done ? '#1A1A1A' : '#9E9E9E' }}>{step.step}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#9E9E9E' }}>{step.time}</div>
                      {step.current && (
                        <div className="text-xs mt-1 font-semibold" style={{ color: PRIMARY }}>
                          Entregador a caminho · Previsão: {ORDER.estimatedDelivery}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Driver info */}
            {ORDER.driver && (
              <div className="mt-6 pt-5 border-t flex items-center justify-between" style={{ borderColor: '#F2F2F2' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                    style={{ background: '#1A1A1A' }}>{ORDER.driver[0]}</div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: '#1A1A1A' }}>{ORDER.driver}</div>
                    <div className="text-xs" style={{ color: '#9E9E9E' }}>Entregador · {ORDER.plate}</div>
                  </div>
                </div>
                <a href={`tel:${ORDER.driverPhone}`}
                  className="px-4 py-2 rounded-xl text-sm font-bold border transition-all hover:opacity-80"
                  style={{ borderColor: PRIMARY, color: PRIMARY }}>
                  Ligar
                </a>
              </div>
            )}
          </div>

          {/* Items table */}
          <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: '#F2F2F2' }}>
            <div className="px-6 py-4 border-b font-bold" style={{ borderColor: '#F2F2F2', color: '#1A1A1A' }}>
              Itens do Pedido
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #F2F2F2' }}>
                  {['Produto', 'SKU', 'Qtd', 'Preço Unit.', 'Total'].map(h => (
                    <th key={h} className="text-left text-xs font-bold uppercase tracking-wide px-6 py-3"
                      style={{ color: '#9E9E9E' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ORDER.items.map((item, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #F8F8F8' }}>
                    <td className="px-6 py-3 text-sm font-semibold" style={{ color: '#1A1A1A' }}>{item.name}</td>
                    <td className="px-6 py-3 text-xs font-mono" style={{ color: '#9E9E9E' }}>{item.sku}</td>
                    <td className="px-6 py-3 text-sm" style={{ color: '#9E9E9E' }}>{item.qty} {item.unit}</td>
                    <td className="px-6 py-3 text-sm" style={{ color: '#9E9E9E' }}>{currency(item.unitPrice)}</td>
                    <td className="px-6 py-3 text-sm font-bold" style={{ color: '#1A1A1A' }}>{currency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 border-t space-y-2" style={{ borderColor: '#F2F2F2' }}>
              <div className="flex justify-between text-sm" style={{ color: '#9E9E9E' }}>
                <span>Subtotal</span><span>{currency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: '#9E9E9E' }}>
                <span>Frete</span><span>{freight === 0 ? 'Grátis' : currency(freight)}</span>
              </div>
              <div className="flex justify-between text-base font-black pt-2 border-t" style={{ borderColor: '#F2F2F2', color: '#1A1A1A' }}>
                <span>Total</span>
                <span style={{ color: PRIMARY }}>{currency(subtotal + freight)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Delivery address */}
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: '#F2F2F2' }}>
            <div className="font-bold mb-3" style={{ color: '#1A1A1A' }}>Endereço de Entrega</div>
            <div className="text-sm" style={{ color: '#666' }}>{ORDER.deliveryAddress}</div>
            <div className="text-xs mt-2" style={{ color: '#9E9E9E' }}>Obra: {ORDER.obra}</div>
          </div>

          {/* Payment info */}
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: '#F2F2F2' }}>
            <div className="font-bold mb-3" style={{ color: '#1A1A1A' }}>Pagamento</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span style={{ color: '#9E9E9E' }}>Método</span>
                <span className="font-semibold" style={{ color: '#1A1A1A' }}>{ORDER.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: '#9E9E9E' }}>Nota Fiscal</span>
                <span className="font-mono font-semibold" style={{ color: '#1A1A1A' }}>{ORDER.nf}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: '#9E9E9E' }}>Vencimento</span>
                <span className="font-semibold" style={{ color: '#b45309' }}>{ORDER.nfDue}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t" style={{ borderColor: '#F2F2F2' }}>
                <span style={{ color: '#9E9E9E' }}>Valor</span>
                <span className="font-bold" style={{ color: PRIMARY }}>{currency(subtotal + freight)}</span>
              </div>
            </div>
            <button className="mt-4 w-full py-2 rounded-xl text-sm font-bold transition-all"
              style={{ background: '#16a34a', color: '#fff' }}>
              Pagar Agora
            </button>
          </div>

          {/* Supplier contact */}
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: '#F2F2F2' }}>
            <div className="font-bold mb-3" style={{ color: '#1A1A1A' }}>Fornecedor</div>
            <div className="font-semibold text-sm mb-3" style={{ color: '#1A1A1A' }}>{ORDER.supplier}</div>
            <div className="space-y-2 text-sm" style={{ color: '#9E9E9E' }}>
              <div>📞 {ORDER.supplierPhone}</div>
              <div>✉️ {ORDER.supplierEmail}</div>
            </div>
            <button className="mt-4 w-full py-2 rounded-xl text-sm font-bold border transition-all hover:opacity-80"
              style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }}>
              Abrir Chat
            </button>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button className="w-full py-2.5 rounded-xl text-sm font-bold border transition-all hover:opacity-80"
              style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }}>
              Baixar NF
            </button>
            <button className="w-full py-2.5 rounded-xl text-sm font-bold border transition-all hover:opacity-80"
              style={{ borderColor: '#fecaca', color: '#dc2626' }}>
              Reportar Problema
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
