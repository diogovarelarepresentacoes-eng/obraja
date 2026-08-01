'use client'

import { useState } from 'react'

const suppliers = [
  {
    name: 'Materiais Belo',
    type: 'Loja',
    initials: 'MB',
    color: '#F1591D',
    rating: 4.8,
    orders: 47,
    spent: 'R$ 123.450',
    city: 'Belo Horizonte, MG',
    categories: ['Cimento', 'Argamassa', 'Tintas'],
  },
  {
    name: 'DepósitoMax',
    type: 'Loja',
    initials: 'DM',
    color: '#3b82f6',
    rating: 4.5,
    orders: 23,
    spent: 'R$ 67.200',
    city: 'São Paulo, SP',
    categories: ['Pisos', 'Revestimentos', 'Cerâmica'],
  },
  {
    name: 'Construfácil Sul',
    type: 'Loja',
    initials: 'CS',
    color: '#22c55e',
    rating: 4.6,
    orders: 18,
    spent: 'R$ 44.120',
    city: 'Curitiba, PR',
    categories: ['Hidráulico', 'Elétrico', 'Ferramentas'],
  },
  {
    name: 'Ind. Votorantim',
    type: 'Indústria',
    initials: 'IV',
    color: '#6366f1',
    rating: 4.9,
    orders: 5,
    spent: 'R$ 82.700',
    city: 'Votorantim, SP',
    categories: ['Cimento', 'Concreto'],
  },
  {
    name: 'Ind. Itambé',
    type: 'Indústria',
    initials: 'II',
    color: '#a855f7',
    rating: 4.7,
    orders: 3,
    spent: 'R$ 34.500',
    city: 'Curitiba, PR',
    categories: ['Cimento', 'Argamassa'],
  },
  {
    name: 'Materiais RJ',
    type: 'Loja',
    initials: 'MR',
    color: '#f59e0b',
    rating: 4.3,
    orders: 8,
    spent: 'R$ 18.320',
    city: 'Rio de Janeiro, RJ',
    categories: ['Tintas', 'Impermeabilizantes'],
  },
]

const filterTypes = ['Todos', 'Lojas', 'Indústrias']

function StarRating({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5">
      <span style={{ color: '#FFB800', fontSize: 14 }}>★</span>
      <span className="text-sm font-bold" style={{ color: '#1A1A1A' }}>
        {value.toFixed(1)}
      </span>
    </span>
  )
}

export default function FornecedoresPage() {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('Todos')

  const filtered = suppliers.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase()) ||
      s.categories.some((c) => c.toLowerCase().includes(search.toLowerCase()))
    const matchesType =
      filterType === 'Todos' ||
      (filterType === 'Lojas' && s.type === 'Loja') ||
      (filterType === 'Indústrias' && s.type === 'Indústria')
    return matchesSearch && matchesType
  })

  return (
    <main className="flex-1 px-8 py-8" style={{ marginTop: 64 }}>
      {/* Controls */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        {/* Type filter */}
        <div
          className="flex items-center rounded-lg overflow-hidden"
          style={{ background: '#F2F2F2', padding: 4, gap: 2 }}
        >
          {filterTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className="px-4 py-2 rounded-md text-sm font-semibold transition-colors"
              style={
                filterType === type
                  ? { background: '#fff', color: '#1A1A1A', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }
                  : { background: 'transparent', color: '#9E9E9E' }
              }
            >
              {type}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#9E9E9E"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar fornecedor, cidade ou produto..."
            className="pl-9 pr-4 py-2 rounded-lg text-sm outline-none"
            style={{
              background: '#fff',
              border: '1px solid #E5E5E5',
              color: '#1A1A1A',
              width: 300,
            }}
          />
        </div>
      </div>

      {/* Summary bar */}
      <div
        className="rounded-xl px-6 py-4 mb-6 flex items-center gap-8"
        style={{ background: '#1A1A1A' }}
      >
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#9E9E9E' }}>
            Total de Fornecedores
          </div>
          <div className="text-xl font-black" style={{ color: '#fff' }}>
            {filtered.length} ativos
          </div>
        </div>
        <div className="w-px h-10" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#9E9E9E' }}>
            Gasto Total (12 meses)
          </div>
          <div className="text-xl font-black" style={{ color: '#F1591D' }}>
            R$ 370.290
          </div>
        </div>
        <div className="w-px h-10" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#9E9E9E' }}>
            Total de Pedidos
          </div>
          <div className="text-xl font-black" style={{ color: '#fff' }}>
            104 pedidos
          </div>
        </div>
        <div className="ml-auto">
          <button
            className="px-5 py-2 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ background: '#F1591D', color: '#fff' }}
          >
            + Adicionar Fornecedor
          </button>
        </div>
      </div>

      {/* Supplier Grid */}
      {filtered.length === 0 ? (
        <div
          className="rounded-xl px-6 py-16 flex flex-col items-center gap-3"
          style={{ background: '#fff', border: '1px solid #F2F2F2' }}
        >
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#E5E5E5" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <p className="text-base font-semibold" style={{ color: '#9E9E9E' }}>
            Nenhum fornecedor encontrado
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {filtered.map((supplier) => (
            <div
              key={supplier.name}
              className="rounded-xl overflow-hidden transition-shadow hover:shadow-md"
              style={{ background: '#fff', border: '1px solid #F2F2F2' }}
            >
              {/* Card header */}
              <div
                className="px-5 py-5 flex items-start gap-4"
                style={{ borderBottom: '1px solid #F2F2F2' }}
              >
                {/* Logo placeholder */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-black shrink-0"
                  style={{ background: supplier.color, color: '#fff' }}
                >
                  {supplier.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-base leading-tight" style={{ color: '#1A1A1A' }}>
                      {supplier.name}
                    </h3>
                    <StarRating value={supplier.rating} />
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={
                        supplier.type === 'Indústria'
                          ? { background: '#ede9fe', color: '#7c3aed' }
                          : { background: '#fef3c7', color: '#d97706' }
                      }
                    >
                      {supplier.type}
                    </span>
                    <span className="text-xs" style={{ color: '#9E9E9E' }}>
                      {supplier.city}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="px-5 py-4 grid grid-cols-2 gap-4" style={{ borderBottom: '1px solid #F2F2F2' }}>
                <div>
                  <div className="text-xs" style={{ color: '#9E9E9E' }}>Pedidos</div>
                  <div className="text-lg font-black" style={{ color: '#1A1A1A' }}>
                    {supplier.orders}
                  </div>
                </div>
                <div>
                  <div className="text-xs" style={{ color: '#9E9E9E' }}>Gasto Total</div>
                  <div className="text-sm font-bold" style={{ color: '#F1591D' }}>
                    {supplier.spent}
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="px-5 py-3 flex flex-wrap gap-1.5" style={{ borderBottom: '1px solid #F2F2F2' }}>
                {supplier.categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium"
                    style={{ background: '#F2F2F2', color: '#9E9E9E' }}
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="px-5 py-4 flex gap-2">
                <button
                  className="flex-1 py-2 rounded-lg text-xs font-semibold transition-colors hover:bg-gray-100"
                  style={{ background: '#F2F2F2', color: '#1A1A1A' }}
                >
                  Ver Catálogo
                </button>
                <button
                  className="flex-1 py-2 rounded-lg text-xs font-semibold transition-opacity hover:opacity-90"
                  style={{ background: '#F1591D', color: '#fff' }}
                >
                  Solicitar Cotação
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
