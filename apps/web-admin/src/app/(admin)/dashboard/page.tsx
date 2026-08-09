'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const RevenueChart = dynamic(() => import('./_RevenueChart'), {
  ssr: false,
  loading: () => <div className="h-[200px] bg-[#F8F8F8] rounded-xl animate-pulse" />,
})

const STAT_ICONS: Record<string, React.ReactNode> = {
  gmv: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  ),
  pedidos: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
    </svg>
  ),
  aprovacoes: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  usuarios: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
}

const STATS = [
  { label: 'GMV do Mês', value: 'R$ 1,24M', change: '+18%', positive: true, iconKey: 'gmv', color: '#F05A28' },
  { label: 'Pedidos Ativos', value: '156', change: '+7%', positive: true, iconKey: 'pedidos', color: '#3B82F6' },
  { label: 'Aprovações Pendentes', value: '38', change: '−3', positive: false, iconKey: 'aprovacoes', color: '#FFB800' },
  { label: 'Usuários Totais', value: '2.847', change: '+124', positive: true, iconKey: 'usuarios', color: '#22C55E' },
]

const REVENUE_DATA = [
  { mes: 'Mar', valor: 820000 },
  { mes: 'Abr', valor: 940000 },
  { mes: 'Mai', valor: 880000 },
  { mes: 'Jun', valor: 1050000 },
  { mes: 'Jul', valor: 1190000 },
  { mes: 'Ago', valor: 1240000 },
]

const RECENT_APPROVALS = [
  { id: '1', name: 'Materiais São Paulo Ltda', type: 'Loja', cnpj: '12.345.678/0001-90', at: '2 min atrás' },
  { id: '2', name: 'Cimento Rio Grande S.A.', type: 'Indústria', cnpj: '98.765.432/0001-10', at: '18 min atrás' },
  { id: '3', name: 'Construtora BH Norte', type: 'Construtora', cnpj: '55.444.333/0001-22', at: '1h atrás' },
  { id: '4', name: 'Tintas do Sul Distribuidora', type: 'Loja', cnpj: '11.222.333/0001-44', at: '2h atrás' },
]

const RECENT_ORDERS = [
  { id: '#8821', buyer: 'Construtora ABC', seller: 'Materiais SP', total: 'R$ 4.320', status: 'Em entrega' },
  { id: '#8820', buyer: 'João Silva', seller: 'Ferragens Belo', total: 'R$ 287', status: 'Entregue' },
  { id: '#8819', buyer: 'Eng. Carvalho', seller: 'Cerâmica Norte', total: 'R$ 1.890', status: 'Preparando' },
  { id: '#8818', buyer: 'Reforma Casa', seller: 'Tintas Premium', total: 'R$ 543', status: 'Entregue' },
]

const ROLE_STATS = [
  { role: 'Lojas', count: 1240, color: '#F05A28' },
  { role: 'Indústrias', count: 318, color: '#3B82F6' },
  { role: 'Construtoras', count: 492, color: '#22C55E' },
  { role: 'Entregadores', count: 687, color: '#FFB800' },
  { role: 'Consumidores', count: 110, color: '#9E9E9E' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-[#1A1A1A]">Dashboard</h1>
        <p className="text-[#9E9E9E] text-sm mt-1">Visão geral do marketplace ObraJá · Agosto 2026</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-5">
        {STATS.map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-[#E5E5E5]">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: s.color + '18', color: s.color }}>
                {STAT_ICONS[s.iconKey]}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.positive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>{s.change}</span>
            </div>
            <div className="text-2xl font-black text-[#1A1A1A]">{s.value}</div>
            <div className="text-sm text-[#9E9E9E] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Chart + Roles */}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 bg-white rounded-2xl p-6 border border-[#E5E5E5]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="font-black text-[#1A1A1A]">Receita (GMV)</div>
              <div className="text-xs text-[#9E9E9E] mt-0.5">Últimos 6 meses</div>
            </div>
            <span className="text-xs font-bold text-[#F05A28] bg-[#FFF3EE] px-3 py-1 rounded-full">+18% vs mês anterior</span>
          </div>
          <RevenueChart data={REVENUE_DATA} />
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
          <div className="font-black text-[#1A1A1A] mb-1">Usuários por Perfil</div>
          <div className="text-xs text-[#9E9E9E] mb-6">2.847 cadastrados</div>
          <div className="space-y-4">
            {ROLE_STATS.map(r => {
              const total = ROLE_STATS.reduce((s, x) => s + x.count, 0)
              const pct = Math.round((r.count / total) * 100)
              return (
                <div key={r.role}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-[#1A1A1A]">{r.role}</span>
                    <span className="text-[#9E9E9E]">{r.count.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 bg-[#F2F2F2] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: r.color }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
            <div className="font-black text-[#1A1A1A]">Aprovações Recentes</div>
            <Link href="/aprovacoes" className="text-xs font-bold text-[#F05A28] hover:underline">Ver todas →</Link>
          </div>
          <div className="divide-y divide-[#F2F2F2]">
            {RECENT_APPROVALS.map(a => (
              <div key={a.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-[#FAFAFA] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#F8F8F8] flex items-center justify-center text-sm font-bold text-[#9E9E9E]">
                  {a.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#1A1A1A] truncate">{a.name}</div>
                  <div className="text-xs text-[#9E9E9E]">{a.cnpj} · {a.at}</div>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  a.type === 'Loja' ? 'bg-[#FFF3EE] text-[#F05A28]'
                  : a.type === 'Indústria' ? 'bg-blue-50 text-blue-700'
                  : 'bg-green-50 text-green-700'
                }`}>{a.type}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
            <div className="font-black text-[#1A1A1A]">Pedidos Recentes</div>
            <Link href="/pedidos" className="text-xs font-bold text-[#F05A28] hover:underline">Ver todos →</Link>
          </div>
          <div className="divide-y divide-[#F2F2F2]">
            {RECENT_ORDERS.map(o => (
              <div key={o.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-[#FAFAFA] transition-colors">
                <span className="text-xs font-mono font-bold text-[#9E9E9E] w-12">{o.id}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#1A1A1A] truncate">{o.buyer}</div>
                  <div className="text-xs text-[#9E9E9E]">{o.seller}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[#1A1A1A]">{o.total}</div>
                  <span className={`text-xs font-medium ${
                    o.status === 'Entregue' ? 'text-green-600'
                    : o.status === 'Em entrega' ? 'text-blue-600'
                    : 'text-[#FFB800]'
                  }`}>{o.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
