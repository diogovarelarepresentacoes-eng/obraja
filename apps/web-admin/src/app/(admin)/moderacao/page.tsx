'use client'

import { useState } from 'react'

type Tab = 'reviews' | 'disputas'

const REVIEWS = [
  { id: '1', product: 'Cimento CP-II 50kg', user: 'Carlos Eduardo', rating: 1, comment: 'Produto chegou vencido. Absurdo!', status: 'pending', createdAt: '2026-08-02' },
  { id: '2', product: 'Tinta Acrílica 18L', user: 'Ana Luiza F.', rating: 2, comment: 'Cor diferente do que foi mostrado na foto.', status: 'pending', createdAt: '2026-08-01' },
  { id: '3', product: 'Cerâmica 45x45', user: 'João Silva', rating: 5, comment: 'Excelente! Entrega rápida e produto perfeito.', status: 'approved', createdAt: '2026-07-30' },
  { id: '4', product: 'Tubo PVC 100mm', user: 'Roberto M.', rating: 4, comment: 'Bom produto, veio bem embalado.', status: 'approved', createdAt: '2026-07-29' },
  { id: '5', product: 'Fio Flexível 2,5mm', user: 'Anônimo', rating: 1, comment: 'Produto falso. Não é da marca anunciada!!!', status: 'pending', createdAt: '2026-08-02' },
]

const DISPUTES = [
  { id: 'D1', orderId: '#8812', buyer: 'Eng. Costa Reformas', seller: 'Materiais BH', reason: 'Produto não entregue', amount: 3240.00, status: 'open', openedAt: '2026-07-30' },
  { id: 'D2', orderId: '#8790', buyer: 'João da Silva', seller: 'Tintas Norte', reason: 'Produto diferente do anunciado', amount: 189.90, status: 'in_analysis', openedAt: '2026-07-28' },
  { id: 'D3', orderId: '#8775', buyer: 'Ana Ferreira', seller: 'Elétrica Total', reason: 'Cobrança duplicada no cartão', amount: 198.00, status: 'resolved', openedAt: '2026-07-25' },
]

const DISPUTE_STATUS: Record<string, { label: string; style: string }> = {
  open: { label: 'Aberta', style: 'bg-red-50 text-red-700 border-red-200' },
  in_analysis: { label: 'Em Análise', style: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  resolved: { label: 'Resolvida', style: 'bg-green-50 text-green-700 border-green-200' },
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s} className={s <= rating ? 'text-[#FFB800]' : 'text-[#E5E5E5]'}>★</span>
      ))}
    </div>
  )
}

export default function ModeracaoPage() {
  const [tab, setTab] = useState<Tab>('reviews')
  const [reviews, setReviews] = useState(REVIEWS)

  const pendingReviews = reviews.filter(r => r.status === 'pending').length
  const openDisputes = DISPUTES.filter(d => d.status !== 'resolved').length

  function approveReview(id: string) { setReviews(r => r.map(rev => rev.id === id ? { ...rev, status: 'approved' } : rev)) }
  function removeReview(id: string) { setReviews(r => r.map(rev => rev.id === id ? { ...rev, status: 'removed' } : rev)) }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#1A1A1A]">Moderação</h1>
        <p className="text-[#9E9E9E] text-sm mt-1">{pendingReviews} avaliações · {openDisputes} disputas em aberto</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {([['reviews', 'Avaliações', pendingReviews], ['disputas', 'Disputas', openDisputes]] as const).map(([key, label, count]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              tab === key ? 'bg-[#1A1A1A] text-white' : 'bg-white border border-[#E5E5E5] text-[#9E9E9E] hover:text-[#1A1A1A]'
            }`}
          >
            {label}
            {count > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === key ? 'bg-[#F05A28]' : 'bg-[#F05A28]/10 text-[#F05A28]'}`}>
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === 'reviews' && (
        <div className="space-y-3">
          {reviews.filter(r => r.status !== 'removed').map(r => (
            <div key={r.id} className={`bg-white rounded-2xl p-5 border ${r.status === 'pending' ? 'border-yellow-200' : 'border-[#E5E5E5]'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Stars rating={r.rating} />
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                      r.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                      : r.status === 'approved' ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {r.status === 'pending' ? 'Pendente' : r.status === 'approved' ? 'Publicada' : 'Removida'}
                    </span>
                  </div>
                  <p className="text-sm text-[#1A1A1A] mb-2">"{r.comment}"</p>
                  <div className="flex items-center gap-3 text-xs text-[#9E9E9E]">
                    <span>Produto: <span className="font-medium text-[#666]">{r.product}</span></span>
                    <span>·</span>
                    <span>Por: <span className="font-medium text-[#666]">{r.user}</span></span>
                    <span>·</span>
                    <span>{new Date(r.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
                {r.status === 'pending' && (
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => approveReview(r.id)} className="px-3 py-1.5 rounded-xl bg-green-500 text-white text-xs font-bold hover:bg-green-600 transition-all">Publicar</button>
                    <button onClick={() => removeReview(r.id)} className="px-3 py-1.5 rounded-xl border border-red-200 text-red-500 text-xs font-bold hover:bg-red-50 transition-all">Remover</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'disputas' && (
        <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F2F2F2]">
                {['Disputa', 'Pedido', 'Comprador', 'Vendedor', 'Motivo', 'Valor', 'Status', 'Ações'].map(h => (
                  <th key={h} className="text-left text-xs font-bold text-[#9E9E9E] uppercase tracking-wide px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F2F2]">
              {DISPUTES.map(d => (
                <tr key={d.id} className="hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-[#9E9E9E]">{d.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-[#1A1A1A]">{d.orderId}</td>
                  <td className="px-6 py-4 text-sm text-[#1A1A1A]">{d.buyer}</td>
                  <td className="px-6 py-4 text-sm text-[#9E9E9E]">{d.seller}</td>
                  <td className="px-6 py-4 text-sm text-[#666]">{d.reason}</td>
                  <td className="px-6 py-4 text-sm font-bold text-[#1A1A1A]">
                    {d.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${DISPUTE_STATUS[d.status].style}`}>
                      {DISPUTE_STATUS[d.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-xs font-bold text-[#F05A28] hover:underline">Ver</button>
                      {d.status !== 'resolved' && (
                        <button className="text-xs font-bold text-green-600 hover:underline">Resolver</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
