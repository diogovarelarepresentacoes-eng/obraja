'use client'

import { useState } from 'react'

type Product = {
  name: string
  category: string
  categoryKey: string
  retail: string
  wholesale: string
  stock: number
  unit: string
  active: boolean
  lowStock?: boolean
}

const products: Product[] = [
  { name: 'Cimento CP-II 50kg', category: 'Cimento', categoryKey: 'cimento', retail: 'R$ 34,90', wholesale: 'R$ 31,90', stock: 890, unit: 'sacos', active: true },
  { name: 'Cimento CP-V 50kg', category: 'Cimento', categoryKey: 'cimento', retail: 'R$ 33,50', wholesale: 'R$ 30,50', stock: 340, unit: 'sacos', active: true },
  { name: 'Argamassa AC-II 20kg', category: 'Argamassa', categoryKey: 'argamassa', retail: 'R$ 39,90', wholesale: 'R$ 37,00', stock: 420, unit: 'cx', active: true },
  { name: 'Tinta Acrílica Coral 18L', category: 'Tintas', categoryKey: 'tintas', retail: 'R$ 229,90', wholesale: 'R$ 210,00', stock: 48, unit: 'latas', active: true },
  { name: 'Fio Elétrico 2,5mm 100m', category: 'Elétrica', categoryKey: 'eletrica', retail: 'R$ 192,00', wholesale: 'R$ 180,00', stock: 65, unit: 'rolos', active: true },
  { name: 'Vergalhão CA-50 10mm 12m', category: 'Ferragens', categoryKey: 'ferragens', retail: 'R$ 56,00', wholesale: 'R$ 52,00', stock: 280, unit: 'barras', active: true },
  { name: 'Tubo PVC 100mm 6m', category: 'Hidráulica', categoryKey: 'hidraulica', retail: 'R$ 54,90', wholesale: 'R$ 49,00', stock: 75, unit: 'barras', active: true },
  { name: 'Telha Cerâmica un', category: 'Coberturas', categoryKey: 'coberturas', retail: 'R$ 3,20', wholesale: 'R$ 2,90', stock: 12000, unit: 'un', active: true },
  { name: 'Areia Média m³', category: 'Agregados', categoryKey: 'agregados', retail: 'R$ 180,00', wholesale: 'R$ 165,00', stock: 32, unit: 'm³', active: true },
  { name: 'Bloco Cerâmico 9×19×19', category: 'Blocos', categoryKey: 'blocos', retail: 'R$ 0,95', wholesale: 'R$ 0,82', stock: 45000, unit: 'un', active: true },
  { name: 'Calafetar 300ml Tigre', category: 'Vedantes', categoryKey: 'vedantes', retail: 'R$ 16,90', wholesale: 'R$ 14,50', stock: 8, unit: 'un', active: true, lowStock: true },
  { name: 'Tela de Aço 6×2,4m', category: 'Ferragens', categoryKey: 'ferragens', retail: 'R$ 152,00', wholesale: 'R$ 140,00', stock: 42, unit: 'pç', active: true },
]

type CategoryMeta = { color: string; bg: string; icon: React.ReactNode }

const CATEGORY_META: Record<string, CategoryMeta> = {
  cimento: {
    color: 'text-stone-700', bg: 'bg-stone-100',
    icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  },
  argamassa: {
    color: 'text-amber-700', bg: 'bg-amber-100',
    icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="1" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><line x1="12" y1="12" x2="12" y2="17" /><line x1="9.5" y1="14.5" x2="14.5" y2="14.5" /></svg>,
  },
  tintas: {
    color: 'text-rose-700', bg: 'bg-rose-100',
    icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 11V5a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2h5" /><circle cx="18" cy="18" r="3" /><path d="M18 15v3" /></svg>,
  },
  eletrica: {
    color: 'text-blue-700', bg: 'bg-blue-100',
    icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  },
  ferragens: {
    color: 'text-slate-700', bg: 'bg-slate-100',
    icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>,
  },
  hidraulica: {
    color: 'text-cyan-700', bg: 'bg-cyan-100',
    icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" /></svg>,
  },
  coberturas: {
    color: 'text-orange-700', bg: 'bg-orange-100',
    icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  },
  agregados: {
    color: 'text-yellow-700', bg: 'bg-yellow-100',
    icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /></svg>,
  },
  blocos: {
    color: 'text-red-700', bg: 'bg-red-100',
    icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" /></svg>,
  },
  vedantes: {
    color: 'text-purple-700', bg: 'bg-purple-100',
    icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  },
}

const DEFAULT_META: CategoryMeta = {
  color: 'text-gray-600', bg: 'bg-gray-100',
  icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /></svg>,
}

function getCategoryMeta(key: string): CategoryMeta {
  return CATEGORY_META[key] ?? DEFAULT_META
}

function stockBadge(qty: number, lowStock?: boolean): string {
  if (lowStock || qty < 10) return 'text-red-600 bg-red-50'
  if (qty <= 50) return 'text-[#F05A28] bg-[#FFF3EE]'
  return 'text-emerald-700 bg-emerald-50'
}

const CATEGORIES = ['Todas as categorias', 'Cimento', 'Argamassa', 'Tintas', 'Elétrica', 'Ferragens', 'Hidráulica', 'Coberturas', 'Agregados', 'Blocos', 'Vedantes']

function EditIcon() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  )
}

function WarnIcon() {
  return (
    <svg width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

export default function CatalogoPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9E9E]" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Buscar produto..."
              className="pl-9 pr-4 py-2 text-sm border border-[#E5E5E5] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F05A28]/25 w-52"
            />
          </div>
          <select className="px-3 py-2 text-sm border border-[#E5E5E5] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F05A28]/25 text-[#1A1A1A]">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select className="px-3 py-2 text-sm border border-[#E5E5E5] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F05A28]/25 text-[#1A1A1A]">
            <option>Mais vendido</option>
            <option>Preço ↑</option>
            <option>Preço ↓</option>
            <option>Nome A–Z</option>
          </select>
          {/* View toggle */}
          <div className="flex items-center border border-[#E5E5E5] rounded-lg overflow-hidden">
            <button
              onClick={() => setView('grid')}
              className={`p-2 transition-colors ${view === 'grid' ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#9E9E9E] hover:bg-[#F2F2F2]'}`}
              title="Grade"
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 transition-colors ${view === 'list' ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#9E9E9E] hover:bg-[#F2F2F2]'}`}
              title="Lista"
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        <button className="px-4 py-2 bg-[#F05A28] text-white text-sm font-bold rounded-lg hover:bg-[#CC4010] transition-colors whitespace-nowrap">
          + Adicionar Produto
        </button>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {products.map((p) => {
            const meta = getCategoryMeta(p.categoryKey)
            return (
              <div
                key={p.name}
                className={`bg-white rounded-xl border overflow-hidden transition-shadow hover:shadow-md ${
                  p.lowStock ? 'border-red-200' : 'border-[#E5E5E5]'
                }`}
              >
                <div className="px-4 pt-4 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${meta.bg} ${meta.color}`}>
                      {meta.icon}
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>
                      {p.category}
                    </span>
                  </div>
                  {p.lowStock && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                      <WarnIcon />
                      Estoque baixo
                    </span>
                  )}
                </div>

                <div className="px-4 pb-4 space-y-3">
                  <p className="font-bold text-[#1A1A1A] text-sm leading-snug">{p.name}</p>
                  <div className="flex items-baseline gap-4">
                    <div>
                      <span className="text-lg font-black text-[#1A1A1A]">{p.retail}</span>
                      <span className="text-xs text-[#9E9E9E] ml-1">varejo</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-[#9E9E9E]">{p.wholesale}</span>
                      <span className="text-xs text-[#9E9E9E] ml-1">atacado</span>
                    </div>
                  </div>
                  <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-lg ${stockBadge(p.stock, p.lowStock)}`}>
                    {p.stock.toLocaleString('pt-BR')} {p.unit} em estoque
                  </span>
                </div>

                <div className="px-4 py-3 border-t border-[#F2F2F2] flex items-center justify-between bg-[#FAFAFA]">
                  <div className="flex items-center gap-1.5">
                    <button
                      className={`w-9 h-5 rounded-full relative transition-colors ${p.active ? 'bg-emerald-500' : 'bg-[#E5E5E5]'}`}
                      title={p.active ? 'Ativo' : 'Inativo'}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow transition-[right,left] ${p.active ? 'right-0.5' : 'left-0.5'}`} />
                    </button>
                    <span className={`text-xs font-semibold ${p.active ? 'text-emerald-600' : 'text-[#9E9E9E]'}`}>
                      {p.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button title="Editar" className="p-1.5 rounded-lg hover:bg-[#F2F2F2] text-[#9E9E9E] hover:text-[#1A1A1A] transition-colors">
                      <EditIcon />
                    </button>
                    <button title="Excluir" className="p-1.5 rounded-lg hover:bg-red-50 text-[#9E9E9E] hover:text-red-500 transition-colors">
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8F8F8] border-b border-[#E5E5E5]">
                  {['Produto', 'Categoria', 'Varejo', 'Atacado', 'Estoque', 'Status', 'Ações'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F2F2]">
                {products.map((p) => {
                  const meta = getCategoryMeta(p.categoryKey)
                  return (
                    <tr key={p.name} className="hover:bg-[#FAFAFA] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${meta.bg} ${meta.color}`}>
                            {meta.icon}
                          </div>
                          <span className="font-semibold text-[#1A1A1A] truncate max-w-[200px]">{p.name}</span>
                          {p.lowStock && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full shrink-0">
                              <WarnIcon />
                              Baixo
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>
                          {p.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-[#1A1A1A] whitespace-nowrap">{p.retail}</td>
                      <td className="px-4 py-3 text-[#9E9E9E] whitespace-nowrap">{p.wholesale}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${stockBadge(p.stock, p.lowStock)}`}>
                          {p.stock.toLocaleString('pt-BR')} {p.unit}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button className={`w-8 h-4 rounded-full relative transition-colors ${p.active ? 'bg-emerald-500' : 'bg-[#E5E5E5]'}`}>
                            <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[1px] shadow ${p.active ? 'right-[1px]' : 'left-[1px]'}`} />
                          </button>
                          <span className={`text-xs font-semibold ${p.active ? 'text-emerald-600' : 'text-[#9E9E9E]'}`}>
                            {p.active ? 'Ativo' : 'Inativo'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button title="Editar" className="p-1.5 rounded-lg hover:bg-[#F2F2F2] text-[#9E9E9E] hover:text-[#1A1A1A] transition-colors">
                            <EditIcon />
                          </button>
                          <button title="Excluir" className="p-1.5 rounded-lg hover:bg-red-50 text-[#9E9E9E] hover:text-red-500 transition-colors">
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between pt-1">
        <p className="text-sm text-[#9E9E9E]">Exibindo 12 de 234 produtos</p>
        <div className="flex items-center gap-1.5">
          <button className="px-3 py-1.5 rounded-lg border border-[#E5E5E5] text-sm text-[#9E9E9E] hover:bg-white transition-colors">← Anterior</button>
          <span className="px-3 py-1.5 rounded-lg bg-[#F05A28] text-white text-sm font-bold">1</span>
          <button className="px-3 py-1.5 rounded-lg border border-[#E5E5E5] text-sm text-[#9E9E9E] hover:bg-white transition-colors">2</button>
          <button className="px-3 py-1.5 rounded-lg border border-[#E5E5E5] text-sm text-[#9E9E9E] hover:bg-white transition-colors">Próxima →</button>
        </div>
      </div>
    </div>
  )
}
