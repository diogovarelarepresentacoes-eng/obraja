import type { ReplenishmentDisplayStatus } from '@obraja/shared'
import React from 'react'

type ReplenishmentOrder = {
  id: string
  supplier: string
  product: string
  total: string
  status: ReplenishmentDisplayStatus
  date: string
}

type CategoryMeta = { color: string; bg: string; icon: React.ReactNode }

const CATEGORY_META: Record<string, CategoryMeta> = {
  cimento: { color: 'text-stone-700', bg: 'bg-stone-100', icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
  vedantes: { color: 'text-purple-700', bg: 'bg-purple-100', icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
  tintas: { color: 'text-rose-700', bg: 'bg-rose-100', icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 11V6l-4-4H6a2 2 0 00-2 2v12a2 2 0 002 2h6" /><path d="M14 2v4h4" /><path d="M17 15l-3 3 3 3" /><circle cx="19" cy="18" r="2" /><path d="M19 16v-1" /></svg> },
}
const DEFAULT_META: CategoryMeta = { color: 'text-gray-600', bg: 'bg-gray-100', icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /></svg> }
function getCategoryMeta(key: string): CategoryMeta { return CATEGORY_META[key] ?? DEFAULT_META }

const criticalStock = [
  {
    product: 'Cimento CP-II 50kg',
    current: '45 sacos',
    minimum: '200 sacos',
    supplier: 'Votorantim',
    categoryKey: 'cimento',
  },
  {
    product: 'Calafetar 300ml Tigre',
    current: '8 un',
    minimum: '50 un',
    supplier: 'Tigre',
    categoryKey: 'vedantes',
  },
  {
    product: 'Tinta Acrílica Coral 18L Branco',
    current: '12 latas',
    minimum: '30 latas',
    supplier: 'Coral Tintas',
    categoryKey: 'tintas',
  },
]

const statusBadge: Record<ReplenishmentDisplayStatus, string> = {
  Aguardando: 'bg-yellow-100 text-yellow-800',
  Confirmado: 'bg-blue-100 text-blue-800',
  'Em produção': 'bg-purple-100 text-purple-800',
  Entregue: 'bg-green-100 text-green-800',
  Cancelado: 'bg-red-100 text-red-800',
}

const replenishmentOrders: ReplenishmentOrder[] = [
  {
    id: '#R-089',
    supplier: 'Belgo Zincor',
    product: 'Vergalhão CA-50 (500 barras)',
    total: 'R$ 26.000,00',
    status: 'Aguardando',
    date: '01/08/2026',
  },
  {
    id: '#R-088',
    supplier: 'Votorantim',
    product: 'Cimento CP-II (5.000 sacos)',
    total: 'R$ 159.500,00',
    status: 'Confirmado',
    date: '30/07/2026',
  },
  {
    id: '#R-087',
    supplier: 'Coral Tintas',
    product: 'Tinta Acrílica 18L (200 latas)',
    total: 'R$ 42.000,00',
    status: 'Em produção',
    date: '28/07/2026',
  },
  {
    id: '#R-086',
    supplier: 'Tigre',
    product: 'Calafetar 300ml (500 un)',
    total: 'R$ 7.250,00',
    status: 'Entregue',
    date: '25/07/2026',
  },
  {
    id: '#R-085',
    supplier: 'Tupy',
    product: 'Tubo PVC 100mm 6m (200 barras)',
    total: 'R$ 9.800,00',
    status: 'Entregue',
    date: '22/07/2026',
  },
]

export default function ReposicaoPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#9E9E9E]">Gerencie pedidos de reposição aos seus fornecedores</p>
        <button className="px-4 py-2 bg-[#F05A28] text-white text-sm font-bold rounded-lg hover:bg-[#CC4010] transition-colors">
          + Novo Pedido
        </button>
      </div>

      {/* Critical stock alert card */}
      <div className="bg-white rounded-[10px] border-2 border-red-300 overflow-hidden">
        <div className="px-6 py-4 bg-red-50 border-b border-red-200 flex items-center gap-3">
          <svg width="20" height="20" fill="none" stroke="#EF4444" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <div>
            <h2 className="text-base font-bold text-red-700">Alertas de Estoque Crítico</h2>
            <p className="text-xs text-red-500 mt-0.5">Estes produtos estão abaixo do nível mínimo recomendado</p>
          </div>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {criticalStock.map((item) => {
            const meta = getCategoryMeta(item.categoryKey)
            return (
              <div key={item.product} className="bg-red-50 border border-red-200 rounded-lg p-4 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${meta.bg} ${meta.color}`}>
                    {meta.icon}
                  </div>
                  <div>
                    <p className="font-bold text-[#1A1A1A] text-sm leading-tight">{item.product}</p>
                    <p className="text-xs text-[#9E9E9E] mt-1">
                      Atual: <span className="text-red-600 font-bold">{item.current}</span>
                    </p>
                    <p className="text-xs text-[#9E9E9E]">
                      Mínimo: {item.minimum}
                    </p>
                    <p className="text-xs text-[#9E9E9E]">
                      Fornecedor: <span className="font-semibold text-[#1A1A1A]">{item.supplier}</span>
                    </p>
                  </div>
                </div>
                <button className="w-full px-3 py-2 bg-[#F05A28] text-white text-xs font-bold rounded-lg hover:bg-[#CC4010] transition-colors">
                  Pedir Reposição
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Replenishment orders table */}
      <div className="bg-white rounded-[10px] border border-[#E5E5E5] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between">
          <h2 className="text-base font-bold text-[#1A1A1A]">Pedidos Enviados</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9E9E]" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Buscar pedido..."
                className="pl-8 pr-3 py-1.5 text-sm border border-[#E5E5E5] rounded-lg bg-[#F8F8F8] focus:outline-none focus:ring-2 focus:ring-[#F05A28] w-48"
              />
            </div>
            <select className="px-3 py-1.5 text-sm border border-[#E5E5E5] rounded-lg bg-[#F8F8F8] focus:outline-none focus:ring-2 focus:ring-[#F05A28] text-[#1A1A1A]">
              <option>Todos os status</option>
              <option>Aguardando</option>
              <option>Confirmado</option>
              <option>Em produção</option>
              <option>Entregue</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8F8F8] border-b border-[#E5E5E5]">
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Pedido</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Fornecedor</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Produto / Qtd.</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Total</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Data</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F2F2]">
              {replenishmentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-5 py-4 font-bold text-[#1A1A1A]">{order.id}</td>
                  <td className="px-4 py-4 font-semibold text-[#1A1A1A]">{order.supplier}</td>
                  <td className="px-4 py-4 text-[#9E9E9E] max-w-[200px] truncate">{order.product}</td>
                  <td className="px-4 py-4 font-bold text-[#1A1A1A]">{order.total}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${statusBadge[order.status] ?? 'bg-gray-100 text-gray-700'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[#9E9E9E] whitespace-nowrap">{order.date}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      {/* View */}
                      <button title="Ver detalhes" className="p-1.5 rounded-lg hover:bg-[#F2F2F2] text-[#9E9E9E] hover:text-[#1A1A1A] transition-colors">
                        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      {/* Cancel */}
                      {order.status === 'Aguardando' && (
                        <button title="Cancelar pedido" className="p-1.5 rounded-lg hover:bg-red-50 text-[#9E9E9E] hover:text-red-500 transition-colors">
                          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E5E5E5] bg-[#F8F8F8] flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm">
            <span className="text-[#9E9E9E]">
              Total em aberto:{' '}
              <span className="font-bold text-[#1A1A1A]">R$ 244.750,00</span>
            </span>
            <span className="text-[#9E9E9E]">
              Já entregue:{' '}
              <span className="font-bold text-green-600">R$ 17.050,00</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-[#E5E5E5] text-sm text-[#9E9E9E] hover:bg-white transition-colors">
              ← Anterior
            </button>
            <span className="px-3 py-1.5 rounded-lg bg-[#F05A28] text-white text-sm font-bold">1</span>
            <button className="px-3 py-1.5 rounded-lg border border-[#E5E5E5] text-sm text-[#9E9E9E] hover:bg-white transition-colors">
              Próxima →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
