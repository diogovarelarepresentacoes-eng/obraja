'use client'

import { useState } from 'react'

const STATUS_STYLE: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
  preparing: 'bg-purple-50 text-purple-700 border-purple-200',
  ready_for_pickup: 'bg-orange-50 text-orange-700 border-orange-200',
  in_delivery: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  delivered: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
}
const STATUS_LABEL: Record<string, string> = {
  pending: 'Pendente', confirmed: 'Confirmado', preparing: 'Preparando',
  ready_for_pickup: 'Pronto p/ Retirada', in_delivery: 'Em Entrega',
  delivered: 'Entregue', cancelled: 'Cancelado',
}
const PAYMENT_METHOD: Record<string, string> = {
  pix: 'Pix', credit_card: 'Cartão', debit_card: 'Débito', boleto: 'Boleto', invoice: 'Faturado',
}

const ORDERS = [
  { id: '#8821', buyer: 'Construtora ABC Ltda', seller: 'Materiais São Paulo', total: 4320.00, items: 5, method: 'invoice', status: 'in_delivery', createdAt: '2026-08-02T14:22:00' },
  { id: '#8820', buyer: 'João da Silva', seller: 'Ferragens BH', total: 287.50, items: 2, method: 'pix', status: 'delivered', createdAt: '2026-08-02T11:15:00' },
  { id: '#8819', buyer: 'Engenharia Carvalho', seller: 'Cerâmica Norte', total: 1890.00, items: 3, method: 'credit_card', status: 'preparing', createdAt: '2026-08-02T09:44:00' },
  { id: '#8818', buyer: 'Reforma Casa Verde', seller: 'Tintas Premium SP', total: 543.90, items: 4, method: 'pix', status: 'delivered', createdAt: '2026-08-01T16:30:00' },
  { id: '#8817', buyer: 'Ana Luiza Ferreira', seller: 'Elétrica Total', total: 198.00, items: 1, method: 'debit_card', status: 'confirmed', createdAt: '2026-08-01T14:10:00' },
  { id: '#8816', buyer: 'MG Construções Ltda', seller: 'Hidro Materiais', total: 7820.00, items: 8, method: 'invoice', status: 'pending', createdAt: '2026-08-01T10:05:00' },
  { id: '#8815', buyer: 'Pedro Henrique Costa', seller: 'Madeiras Sul', total: 1240.00, items: 2, method: 'boleto', status: 'cancelled', createdAt: '2026-07-31T15:22:00' },
]

const STAT_GROUPS = [
  { label: 'Total Hoje', value: 'R$ 15.059', sub: '7 pedidos', color: '#F05A28' },
  { label: 'Em Entrega', value: '1', sub: '1 ativo', color: '#3B82F6' },
  { label: 'Cancelados', value: '1', sub: 'hoje', color: '#EF4444' },
  { label: 'Ticket Médio', value: 'R$ 2.151', sub: 'hoje', color: '#22C55E' },
]

export default function PedidosPage() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = ORDERS.filter(o =>
    (statusFilter === 'all' || o.status === statusFilter) &&
    (search === '' || o.id.includes(search) || o.buyer.toLowerCase().includes(search.toLowerCase()) || o.seller.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#1A1A1A]">Pedidos</h1>
        <p className="text-[#9E9E9E] text-sm mt-1">Visão geral de todos os pedidos da plataforma</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {STAT_GROUPS.map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-[#E5E5E5]">
            <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
            <div className="text-sm font-semibold text-[#1A1A1A] mt-0.5">{s.label}</div>
            <div className="text-xs text-[#9E9E9E]">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5] gap-4 flex-wrap">
          <div className="flex gap-1 flex-wrap">
            {[['all', 'Todos'], ['pending', 'Pendente'], ['in_delivery', 'Entregando'], ['delivered', 'Entregue'], ['cancelled', 'Cancelado']].map(([key, label]) => (
              <button key={key} onClick={() => setStatusFilter(key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${statusFilter === key ? 'bg-[#1A1A1A] text-white' : 'text-[#9E9E9E] hover:text-[#1A1A1A]'}`}>
                {label}
              </button>
            ))}
          </div>
          <input
            placeholder="Buscar por ID, comprador ou vendedor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 h-9 w-72 bg-[#F8F8F8] rounded-xl text-sm border border-[#E5E5E5] focus:border-[#F05A28] focus:outline-none"
          />
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-[#F2F2F2]">
              {['Pedido', 'Comprador', 'Vendedor', 'Itens', 'Total', 'Pagamento', 'Status', 'Data'].map(h => (
                <th key={h} className="text-left text-xs font-bold text-[#9E9E9E] uppercase tracking-wide px-6 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2F2F2]">
            {filtered.map(o => (
              <tr key={o.id} className="hover:bg-[#FAFAFA] transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-[#1A1A1A]">{o.id}</td>
                <td className="px-6 py-4 text-sm text-[#1A1A1A]">{o.buyer}</td>
                <td className="px-6 py-4 text-sm text-[#9E9E9E]">{o.seller}</td>
                <td className="px-6 py-4 text-sm text-center text-[#1A1A1A] font-medium">{o.items}</td>
                <td className="px-6 py-4 text-sm font-bold text-[#1A1A1A]">
                  {o.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium bg-[#F8F8F8] border border-[#E5E5E5] px-2 py-0.5 rounded-full">
                    {PAYMENT_METHOD[o.method]}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLE[o.status]}`}>
                    {STATUS_LABEL[o.status]}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-[#9E9E9E]">
                  {new Date(o.createdAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
