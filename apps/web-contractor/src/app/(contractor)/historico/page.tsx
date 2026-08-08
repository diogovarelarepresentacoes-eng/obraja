'use client'

import { useState } from 'react'

const PRIMARY = '#F1591D'

const MONTHLY = [
  { mes: 'Jan', valor: 142000 },
  { mes: 'Fev', valor: 198000 },
  { mes: 'Mar', valor: 176000 },
  { mes: 'Abr', valor: 224000 },
  { mes: 'Mai', valor: 209000 },
  { mes: 'Jun', valor: 251000 },
  { mes: 'Jul', valor: 234870 },
  { mes: 'Ago', valor: 109185 },
]

const CATEGORIES = [
  { cat: 'Cimento e Argamassa', valor: 412800, pct: 34 },
  { cat: 'Cerâmica e Pisos', valor: 271200, pct: 22 },
  { cat: 'Tintas e Revestimentos', valor: 183600, pct: 15 },
  { cat: 'Hidráulica e Elétrica', valor: 134400, pct: 11 },
  { cat: 'Ferragens e Outros', valor: 98000, pct: 8 },
  { cat: 'Madeiras e MDF', valor: 122000, pct: 10 },
]

const TOP_SUPPLIERS = [
  { name: 'Materiais Belo', orders: 34, total: 287450, avg: 8454 },
  { name: 'Ind. Votorantim', orders: 12, total: 224600, avg: 18717 },
  { name: 'DepósitoMax', orders: 28, total: 198340, avg: 7083 },
  { name: 'Construfácil Sul', orders: 19, total: 142800, avg: 7516 },
  { name: 'Ind. Itambé', orders: 8, total: 98200, avg: 12275 },
]

const RECENT_ALL = [
  { id: '#2891', supplier: 'Materiais Belo', cat: 'Cimento e Argamassa', value: 15950, date: '2026-08-01', status: 'Em entrega', statusColor: '#f97316' },
  { id: '#2890', supplier: 'DepósitoMax', cat: 'Tintas e Revestimentos', value: 10555, date: '2026-07-31', status: 'Entregue', statusColor: '#16a34a' },
  { id: '#2889', supplier: 'Construfácil Sul', cat: 'Hidráulica e Elétrica', value: 3780, date: '2026-07-29', status: 'Entregue', statusColor: '#16a34a' },
  { id: '#2888', supplier: 'Materiais Belo', cat: 'Cimento e Argamassa', value: 7500, date: '2026-07-27', status: 'Entregue', statusColor: '#16a34a' },
  { id: '#2887', supplier: 'Ind. Votorantim', cat: 'Cimento e Argamassa', value: 61800, date: '2026-07-20', status: 'Entregue', statusColor: '#16a34a' },
  { id: '#2885', supplier: 'DepósitoMax', cat: 'Cerâmica e Pisos', value: 24000, date: '2026-07-15', status: 'Entregue', statusColor: '#16a34a' },
]

const currency = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const maxMonthly = Math.max(...MONTHLY.map(m => m.valor))

export default function HistoricoPage() {
  const [period, setPeriod] = useState<'3m' | '6m' | '12m'>('12m')

  const total2026 = MONTHLY.reduce((s, m) => s + m.valor, 0)
  const totalPedidos = 89
  const ticketMedio = Math.round(total2026 / totalPedidos)

  return (
    <main className="flex-1 px-8 py-8" style={{ marginTop: 64 }}>
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {[
          { label: 'Total Gasto em 2026', value: currency(total2026), sub: 'Jan – Ago', color: PRIMARY },
          { label: 'Pedidos Realizados', value: totalPedidos.toString(), sub: 'em 2026', color: '#3b82f6' },
          { label: 'Ticket Médio', value: currency(ticketMedio), sub: 'por pedido', color: '#8b5cf6' },
          { label: 'Fornecedor #1', value: 'Materiais Belo', sub: 'maior volume', color: '#16a34a' },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-2xl p-5 border" style={{ borderColor: '#F2F2F2' }}>
            <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9E9E9E' }}>{c.label}</div>
            <div className="text-xl font-black truncate" style={{ color: c.color }}>{c.value}</div>
            <div className="text-xs mt-0.5" style={{ color: '#9E9E9E' }}>{c.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5 mb-5">
        {/* Monthly chart */}
        <div className="col-span-2 bg-white rounded-2xl p-6 border" style={{ borderColor: '#F2F2F2' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="font-bold text-lg" style={{ color: '#1A1A1A' }}>Gasto por Mês</div>
              <div className="text-xs" style={{ color: '#9E9E9E' }}>2026</div>
            </div>
            <div className="flex gap-1">
              {(['3m', '6m', '12m'] as const).map(p => (
                <button key={p} onClick={() => setPeriod(p)}
                  className="px-3 py-1 rounded-lg text-xs font-bold transition-all"
                  style={period === p ? { background: PRIMARY, color: '#fff' } : { color: '#9E9E9E' }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-2 h-40">
            {MONTHLY.map(m => {
              const h = Math.round((m.valor / maxMonthly) * 100)
              const isCurrent = m.mes === 'Ago'
              return (
                <div key={m.mes} className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-xs font-bold" style={{ color: PRIMARY, opacity: isCurrent ? 0.6 : 0 }}>
                    {currency(m.valor).replace('R$ ', 'R$ ')}
                  </div>
                  <div className="w-full rounded-t-lg transition-all relative group" style={{
                    height: `${h}%`, background: isCurrent ? '#fde68a' : PRIMARY,
                    opacity: isCurrent ? 0.7 : 1,
                  }}>
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white text-xs px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {currency(m.valor)}
                    </div>
                  </div>
                  <div className="text-xs font-medium" style={{ color: '#9E9E9E' }}>{m.mes}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Category breakdown */}
        <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#F2F2F2' }}>
          <div className="font-bold text-lg mb-5" style={{ color: '#1A1A1A' }}>Por Categoria</div>
          <div className="space-y-3">
            {CATEGORIES.map((c, i) => {
              const colors = [PRIMARY, '#3b82f6', '#8b5cf6', '#16a34a', '#f97316', '#eab308']
              return (
                <div key={c.cat}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium truncate" style={{ color: '#1A1A1A', maxWidth: '65%' }}>{c.cat}</span>
                    <span style={{ color: '#9E9E9E' }}>{c.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: '#F2F2F2' }}>
                    <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: colors[i] }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Top suppliers + recent */}
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-2 bg-white rounded-2xl border" style={{ borderColor: '#F2F2F2' }}>
          <div className="px-6 py-4 border-b font-bold" style={{ borderColor: '#F2F2F2', color: '#1A1A1A' }}>
            Top Fornecedores
          </div>
          <div className="divide-y" style={{ borderColor: '#F8F8F8' }}>
            {TOP_SUPPLIERS.map((s, i) => (
              <div key={s.name} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                  style={{ background: i === 0 ? '#FFB800' : '#F2F2F2', color: i === 0 ? '#1A1A1A' : '#9E9E9E' }}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate" style={{ color: '#1A1A1A' }}>{s.name}</div>
                  <div className="text-xs" style={{ color: '#9E9E9E' }}>{s.orders} pedidos · ticket médio {currency(s.avg)}</div>
                </div>
                <div className="text-sm font-bold shrink-0" style={{ color: PRIMARY }}>{currency(s.total)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-3 bg-white rounded-2xl border overflow-hidden" style={{ borderColor: '#F2F2F2' }}>
          <div className="px-6 py-4 border-b font-bold" style={{ borderColor: '#F2F2F2', color: '#1A1A1A' }}>
            Últimos Pedidos
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #F2F2F2' }}>
                {['Pedido', 'Fornecedor', 'Categoria', 'Valor', 'Status'].map(h => (
                  <th key={h} className="text-left text-xs font-bold uppercase tracking-wide px-6 py-3" style={{ color: '#9E9E9E' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_ALL.map(r => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors" style={{ borderBottom: '1px solid #F8F8F8' }}>
                  <td className="px-6 py-3 text-sm font-mono font-bold" style={{ color: '#1A1A1A' }}>{r.id}</td>
                  <td className="px-6 py-3 text-sm" style={{ color: '#666' }}>{r.supplier}</td>
                  <td className="px-6 py-3 text-xs" style={{ color: '#9E9E9E' }}>{r.cat}</td>
                  <td className="px-6 py-3 text-sm font-bold" style={{ color: '#1A1A1A' }}>{currency(r.value)}</td>
                  <td className="px-6 py-3">
                    <span className="text-xs font-medium" style={{ color: r.statusColor }}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
