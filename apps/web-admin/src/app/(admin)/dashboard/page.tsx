'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Link from 'next/link'

const STATS = [
  { label: 'GMV do Mês', value: 'R$ 1,24M', change: '+18%', icon: '💰', color: '#F05A28' },
  { label: 'Pedidos Ativos', value: '156', change: '+7%', icon: '🛒', color: '#3B82F6' },
  { label: 'Aprovações Pendentes', value: '38', change: '−3', icon: '⏳', color: '#FFB800' },
  { label: 'Usuários Totais', value: '2.847', change: '+124', icon: '👥', color: '#22C55E' },
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

function formatCurrency(v: number) {
  return `R$ ${(v / 1000).toFixed(0)}k`
}

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
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: s.color + '15' }}>
                {s.icon}
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-50 text-green-700">{s.change}</span>
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
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={REVENUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F2F2F2" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#9E9E9E' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 11, fill: '#9E9E9E' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => [`R$ ${Number(v).toLocaleString('pt-BR')}`, 'GMV']} />
              <Line type="monotone" dataKey="valor" stroke="#F05A28" strokeWidth={2.5} dot={{ fill: '#F05A28', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
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
