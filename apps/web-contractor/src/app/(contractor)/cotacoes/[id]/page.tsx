'use client'

import { useState } from 'react'
import Link from 'next/link'

const PRIMARY = '#F1591D'

const QUOTE = {
  id: '#Q-041',
  title: '500 sacos Cimento + 200 cx Argamassa',
  status: 'Com Respostas',
  created: '30/07/2026',
  deadline: '05/08/2026',
  obra: 'Residencial Parque das Flores — Bloco C',
  items: [
    { name: 'Cimento CP-II 50kg', qty: 500, unit: 'sacos', ref: 'CIM-CPII-50' },
    { name: 'Argamassa AC-II 20kg', qty: 200, unit: 'caixas', ref: 'ARG-ACII-20' },
    { name: 'Calafetar 300ml', qty: 50, unit: 'un', ref: 'CAL-300ML' },
  ],
  responses: [
    {
      id: 'r1',
      supplier: 'Indústria Itambé',
      rating: 4.8,
      reviews: 312,
      deliveryDays: 7,
      paymentTerms: '60 dias',
      subtotal: 21900,
      freight: 0,
      total: 21900,
      best: true,
      status: 'pending',
      items: [
        { name: 'Cimento CP-II 50kg', qty: 500, unitPrice: 38.50, total: 19250 },
        { name: 'Argamassa AC-II 20kg', qty: 200, unitPrice: 11.50, total: 2300 },
        { name: 'Calafetar 300ml', qty: 50, unitPrice: 7.00, total: 350 },
      ],
      note: 'Frete grátis acima de R$ 20.000. Entrega em 5–7 dias úteis.',
    },
    {
      id: 'r2',
      supplier: 'Materiais Belo',
      rating: 4.6,
      reviews: 847,
      deliveryDays: 3,
      paymentTerms: '30 dias',
      subtotal: 23050,
      freight: 400,
      total: 23450,
      best: false,
      status: 'pending',
      items: [
        { name: 'Cimento CP-II 50kg', qty: 500, unitPrice: 41.00, total: 20500 },
        { name: 'Argamassa AC-II 20kg', qty: 200, unitPrice: 12.25, total: 2450 },
        { name: 'Calafetar 300ml', qty: 50, unitPrice: 6.20, total: 310 },
      ],
      note: 'Entrega expressa disponível em 1–2 dias com adicional de R$ 600.',
    },
    {
      id: 'r3',
      supplier: 'DepósitoMax',
      rating: 4.4,
      reviews: 523,
      deliveryDays: 2,
      paymentTerms: 'À vista',
      subtotal: 23600,
      freight: 500,
      total: 24100,
      best: false,
      status: 'pending',
      items: [
        { name: 'Cimento CP-II 50kg', qty: 500, unitPrice: 42.00, total: 21000 },
        { name: 'Argamassa AC-II 20kg', qty: 200, unitPrice: 12.75, total: 2550 },
        { name: 'Calafetar 300ml', qty: 50, unitPrice: 6.50, total: 325 },
      ],
      note: 'Desconto de 3% no pagamento à vista via Pix.',
    },
  ],
}

const currency = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function CotacaoDetailPage() {
  const [accepted, setAccepted] = useState<string | null>(null)
  const [rejected, setRejected] = useState<string[]>([])
  const [expanded, setExpanded] = useState<string | null>('r1')

  const handleAccept = (id: string) => setAccepted(id)
  const handleReject = (id: string) => setRejected(prev => [...prev, id])

  return (
    <main className="flex-1 px-8 py-8" style={{ marginTop: 64 }}>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-5" style={{ color: '#9E9E9E' }}>
        <Link href="/cotacoes" className="hover:underline">Cotações</Link>
        <span>›</span>
        <span style={{ color: '#1A1A1A', fontWeight: 600 }}>{QUOTE.id}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-black" style={{ color: '#1A1A1A' }}>{QUOTE.id}</h1>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: '#fffbeb', color: '#b45309' }}>{QUOTE.status}</span>
          </div>
          <div className="text-sm" style={{ color: '#9E9E9E' }}>{QUOTE.title}</div>
          <div className="text-xs mt-1" style={{ color: '#9E9E9E' }}>Obra: {QUOTE.obra}</div>
        </div>
        <div className="text-right">
          <div className="text-xs" style={{ color: '#9E9E9E' }}>Prazo de resposta</div>
          <div className="text-sm font-bold mt-0.5" style={{ color: '#dc2626' }}>{QUOTE.deadline}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Responses — left 2/3 */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-1">
            <div className="font-bold" style={{ color: '#1A1A1A' }}>{QUOTE.responses.length} respostas recebidas</div>
            <div className="text-xs" style={{ color: '#9E9E9E' }}>Ordenado por menor preço</div>
          </div>

          {accepted && (
            <div className="rounded-xl p-4 border flex items-center gap-3"
              style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
              <span className="text-lg">✅</span>
              <div>
                <div className="text-sm font-bold" style={{ color: '#16a34a' }}>Cotação aceita com sucesso</div>
                <div className="text-xs" style={{ color: '#666' }}>
                  Pedido gerado automaticamente com {QUOTE.responses.find(r => r.id === accepted)?.supplier}.
                  Você será notificado da confirmação.
                </div>
              </div>
            </div>
          )}

          {QUOTE.responses.map((r) => {
            const isAccepted = accepted === r.id
            const isRejected = rejected.includes(r.id)
            const isOpen = expanded === r.id

            return (
              <div key={r.id} className="bg-white rounded-2xl border overflow-hidden transition-all"
                style={{ borderColor: r.best && !isRejected ? PRIMARY : '#F2F2F2', opacity: isRejected ? 0.5 : 1 }}>
                {/* Card header */}
                <div className="px-5 py-4 cursor-pointer" onClick={() => setExpanded(isOpen ? null : r.id)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white shrink-0"
                        style={{ background: PRIMARY }}>{r.supplier[0]}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm" style={{ color: '#1A1A1A' }}>{r.supplier}</span>
                          {r.best && !isRejected && (
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                              style={{ background: PRIMARY, color: '#fff' }}>Melhor preço</span>
                          )}
                          {isAccepted && (
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                              style={{ background: '#16a34a', color: '#fff' }}>Aceita</span>
                          )}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: '#9E9E9E' }}>
                          ⭐ {r.rating} ({r.reviews} avaliações) · Entrega em {r.deliveryDays} dias úteis · {r.paymentTerms}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black" style={{ color: PRIMARY }}>{currency(r.total)}</div>
                      {r.freight > 0 && (
                        <div className="text-xs" style={{ color: '#9E9E9E' }}>+{currency(r.freight)} frete</div>
                      )}
                      {r.freight === 0 && (
                        <div className="text-xs font-semibold" style={{ color: '#16a34a' }}>Frete grátis</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded items */}
                {isOpen && (
                  <div style={{ borderTop: '1px solid #F2F2F2' }}>
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ borderBottom: '1px solid #F2F2F2', background: '#F8F8F8' }}>
                          {['Item', 'Qtd', 'Preço Unit.', 'Total'].map(h => (
                            <th key={h} className="text-left text-xs font-bold uppercase tracking-wide px-5 py-2.5"
                              style={{ color: '#9E9E9E' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {r.items.map((item, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #F8F8F8' }}>
                            <td className="px-5 py-2.5" style={{ color: '#1A1A1A' }}>{item.name}</td>
                            <td className="px-5 py-2.5" style={{ color: '#9E9E9E' }}>{item.qty}</td>
                            <td className="px-5 py-2.5" style={{ color: '#9E9E9E' }}>{currency(item.unitPrice)}</td>
                            <td className="px-5 py-2.5 font-semibold" style={{ color: '#1A1A1A' }}>{currency(item.total)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {r.note && (
                      <div className="px-5 py-3 text-xs" style={{ color: '#9E9E9E', borderTop: '1px solid #F8F8F8' }}>
                        💬 {r.note}
                      </div>
                    )}
                    {!isRejected && !accepted && (
                      <div className="px-5 py-3 flex gap-3" style={{ borderTop: '1px solid #F2F2F2' }}>
                        <button onClick={() => handleAccept(r.id)}
                          className="px-5 py-2 rounded-xl text-sm font-bold transition-all"
                          style={{ background: PRIMARY, color: '#fff' }}>
                          Aceitar esta cotação
                        </button>
                        <button onClick={() => handleReject(r.id)}
                          className="px-5 py-2 rounded-xl text-sm font-bold transition-all"
                          style={{ background: '#F2F2F2', color: '#9E9E9E' }}>
                          Recusar
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Sidebar — right 1/3 */}
        <div className="space-y-4">
          {/* Items requested */}
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: '#F2F2F2' }}>
            <div className="font-bold mb-4" style={{ color: '#1A1A1A' }}>Itens Solicitados</div>
            <div className="space-y-3">
              {QUOTE.items.map(item => (
                <div key={item.ref}>
                  <div className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{item.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#9E9E9E' }}>
                    {item.qty} {item.unit} · Ref: {item.ref}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison summary */}
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: '#F2F2F2' }}>
            <div className="font-bold mb-4" style={{ color: '#1A1A1A' }}>Comparativo</div>
            <div className="space-y-2">
              {QUOTE.responses.map((r, i) => (
                <div key={r.id} className="flex items-center justify-between py-2 rounded-lg px-2"
                  style={{ background: r.best ? '#fff5f1' : 'transparent' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold w-4" style={{ color: '#9E9E9E' }}>{i + 1}º</span>
                    <span className="text-xs truncate max-w-[100px]" style={{ color: '#1A1A1A' }}>{r.supplier}</span>
                  </div>
                  <span className="text-xs font-bold" style={{ color: r.best ? PRIMARY : '#1A1A1A' }}>
                    {currency(r.total)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t text-xs" style={{ borderColor: '#F2F2F2', color: '#9E9E9E' }}>
              Economia vs. maior preço:{' '}
              <span className="font-bold" style={{ color: '#16a34a' }}>
                {currency(Math.max(...QUOTE.responses.map(r => r.total)) - Math.min(...QUOTE.responses.map(r => r.total)))}
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: '#F2F2F2' }}>
            <div className="font-bold mb-4" style={{ color: '#1A1A1A' }}>Histórico</div>
            <div className="space-y-3">
              {[
                { time: '30/07 09:14', text: 'Cotação enviada a 5 fornecedores', done: true },
                { time: '30/07 14:22', text: 'Resposta de Materiais Belo', done: true },
                { time: '31/07 08:05', text: 'Resposta de Indústria Itambé', done: true },
                { time: '31/07 11:30', text: 'Resposta de DepósitoMax', done: true },
                { time: '05/08', text: 'Prazo de encerramento', done: false },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                    style={{ background: step.done ? PRIMARY : '#E5E5E5' }} />
                  <div>
                    <div className="text-xs font-semibold" style={{ color: step.done ? '#1A1A1A' : '#9E9E9E' }}>{step.text}</div>
                    <div className="text-xs" style={{ color: '#9E9E9E' }}>{step.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
