'use client'

import { useState } from 'react'

interface Product {
  id: string
  name: string
  seller: string
  sellerType: 'store' | 'industry'
  category: string
  price: number
  unit: string
  submittedAt: string
  status: 'pending' | 'approved' | 'rejected'
}

const MOCK: Product[] = [
  { id: '1', name: 'Cimento CP-II 50kg', seller: 'Cimentos Brasil S.A.', sellerType: 'industry', category: 'Cimento e Argamassa', price: 38.90, unit: 'sc', submittedAt: '2026-08-02', status: 'pending' },
  { id: '2', name: 'Tinta Acrílica Premium 18L Branco', seller: 'Tintas Norte Ltda', sellerType: 'store', category: 'Tintas e Revestimentos', price: 189.90, unit: 'bld', submittedAt: '2026-08-02', status: 'pending' },
  { id: '3', name: 'Cerâmica 45x45 Bege Nude', seller: 'Cerâmica Nordeste', sellerType: 'industry', category: 'Cerâmica, Pisos e Azulejos', price: 42.50, unit: 'm2', submittedAt: '2026-08-01', status: 'pending' },
  { id: '4', name: 'Tubo PVC 100mm 6m', seller: 'Hidro Materiais SP', sellerType: 'store', category: 'Hidráulica e Encanamento', price: 58.00, unit: 'un', submittedAt: '2026-08-01', status: 'pending' },
  { id: '5', name: 'Brita Nº 1 - Saco 20kg', seller: 'Pedreira São Pedro', sellerType: 'industry', category: 'Areia, Brita e Pedra', price: 12.90, unit: 'sc', submittedAt: '2026-07-31', status: 'pending' },
  { id: '6', name: 'Fio Flexível 2,5mm 100m', seller: 'Elétrica Total', sellerType: 'store', category: 'Elétrica e Iluminação', price: 134.00, unit: 'rolo', submittedAt: '2026-07-30', status: 'approved' },
  { id: '7', name: 'Impermeabilizante Vedacit 18kg', seller: 'Materiais BH', sellerType: 'store', category: 'Impermeabilização', price: 98.00, unit: 'bld', submittedAt: '2026-07-29', status: 'rejected' },
]

export default function ProdutosPage() {
  const [data, setData] = useState<Product[]>(MOCK)
  const [statusFilter, setStatusFilter] = useState('pending')
  const [search, setSearch] = useState('')

  const filtered = data.filter(p =>
    (statusFilter === 'all' || p.status === statusFilter) &&
    (search === '' || p.name.toLowerCase().includes(search.toLowerCase()) || p.seller.toLowerCase().includes(search.toLowerCase()))
  )

  const counts = {
    pending: data.filter(p => p.status === 'pending').length,
    approved: data.filter(p => p.status === 'approved').length,
    rejected: data.filter(p => p.status === 'rejected').length,
  }

  function approve(id: string) { setData(d => d.map(p => p.id === id ? { ...p, status: 'approved' as const } : p)) }
  function reject(id: string) { setData(d => d.map(p => p.id === id ? { ...p, status: 'rejected' as const } : p)) }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#1A1A1A]">Produtos</h1>
          <p className="text-[#9E9E9E] text-sm mt-1">{counts.pending} produtos aguardando moderação</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pendentes', count: counts.pending, color: '#FFB800', bg: 'bg-yellow-50' },
          { label: 'Aprovados', count: counts.approved, color: '#22C55E', bg: 'bg-green-50' },
          { label: 'Rejeitados', count: counts.rejected, color: '#EF4444', bg: 'bg-red-50' },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl p-4 border ${s.bg} border-transparent`}>
            <div className="text-2xl font-black" style={{ color: s.color }}>{s.count}</div>
            <div className="text-sm font-medium text-[#666]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
        {/* Filter bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5] gap-4">
          <div className="flex gap-1">
            {[['all', 'Todos'], ['pending', 'Pendentes'], ['approved', 'Aprovados'], ['rejected', 'Rejeitados']].map(([key, label]) => (
              <button key={key} onClick={() => setStatusFilter(key)}
                className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${statusFilter === key ? 'bg-[#1A1A1A] text-white' : 'text-[#9E9E9E] hover:text-[#1A1A1A]'}`}>
                {label}
              </button>
            ))}
          </div>
          <input
            placeholder="Buscar produto ou vendedor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 h-9 w-64 bg-[#F8F8F8] rounded-xl text-sm border border-[#E5E5E5] focus:border-[#F05A28] focus:outline-none"
          />
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-[#F2F2F2]">
              {['Produto', 'Vendedor', 'Categoria', 'Preço', 'Enviado', 'Status', 'Ações'].map(h => (
                <th key={h} className="text-left text-xs font-bold text-[#9E9E9E] uppercase tracking-wide px-6 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2F2F2]">
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-12 text-[#9E9E9E] text-sm">Nenhum resultado</td></tr>
            ) : filtered.map(p => (
              <tr key={p.id} className="hover:bg-[#FAFAFA] transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-[#1A1A1A]">{p.name}</div>
                  <div className="text-xs text-[#9E9E9E]">por {p.unit}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-[#1A1A1A]">{p.seller}</div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.sellerType === 'industry' ? 'bg-blue-50 text-blue-700' : 'bg-[#FFF3EE] text-[#F05A28]'}`}>
                    {p.sellerType === 'industry' ? 'Indústria' : 'Loja'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-[#666]">{p.category}</td>
                <td className="px-6 py-4 text-sm font-bold text-[#1A1A1A]">
                  {p.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
                <td className="px-6 py-4 text-sm text-[#9E9E9E]">{new Date(p.submittedAt).toLocaleDateString('pt-BR')}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                    p.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                    : p.status === 'approved' ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    {p.status === 'pending' ? 'Pendente' : p.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {p.status === 'pending' && (
                      <>
                        <button onClick={() => approve(p.id)} className="text-xs font-bold text-green-600 hover:underline">Aprovar</button>
                        <button onClick={() => reject(p.id)} className="text-xs font-bold text-red-500 hover:underline">Rejeitar</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
