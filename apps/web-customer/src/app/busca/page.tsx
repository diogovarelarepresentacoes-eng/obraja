'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import ProductCard from '../_components/ProductCard'
import {
  CATEGORIES,
  DAILY_OFFERS,
  BEST_SELLERS,
} from '../_data/mock'
import type { Product } from '../_data/mock'

const ALL_PRODUCTS: Product[] = [...DAILY_OFFERS, ...BEST_SELLERS]

const SORT_OPTIONS = [
  { value: 'relevancia', label: 'Relevância' },
  { value: 'menor-preco', label: 'Menor preço' },
  { value: 'maior-preco', label: 'Maior preço' },
  { value: 'mais-vendidos', label: 'Mais vendidos' },
]

const PRICE_RANGES = [
  { value: 'todos', label: 'Qualquer valor' },
  { value: '0-50', label: 'Até R$ 50' },
  { value: '50-200', label: 'R$ 50 a R$ 200' },
  { value: '200-500', label: 'R$ 200 a R$ 500' },
  { value: '500+', label: 'Acima de R$ 500' },
]

function Logo() {
  return (
    <span className="text-xl font-black tracking-tight leading-none">
      <span className="text-white">Obra</span>
      <span style={{ color: '#F05A28' }}>Já</span>
    </span>
  )
}

function filterByPrice(products: Product[], range: string): Product[] {
  if (range === 'todos') return products
  if (range === '0-50') return products.filter((p) => p.price <= 50)
  if (range === '50-200') return products.filter((p) => p.price > 50 && p.price <= 200)
  if (range === '200-500') return products.filter((p) => p.price > 200 && p.price <= 500)
  if (range === '500+') return products.filter((p) => p.price > 500)
  return products
}

function sortProducts(products: Product[], sort: string): Product[] {
  const copy = [...products]
  if (sort === 'menor-preco') return copy.sort((a, b) => a.price - b.price)
  if (sort === 'maior-preco') return copy.sort((a, b) => b.price - a.price)
  if (sort === 'mais-vendidos') return copy.sort((a, b) => b.discount - a.discount)
  return copy
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="text-6xl mb-4">🔍</div>
      <h2 className="text-lg font-black mb-2" style={{ color: '#1A1A1A' }}>
        Nenhum resultado encontrado
      </h2>
      <p className="text-sm max-w-xs" style={{ color: '#9E9E9E' }}>
        {query
          ? `Não encontramos produtos para "${query}". Tente palavras diferentes ou navegue pelas categorias.`
          : 'Tente buscar por cimento, tinta, tijolos ou outra categoria.'}
      </p>
      <Link
        href="/home"
        className="mt-6 px-6 py-2.5 rounded-xl text-sm font-bold text-white"
        style={{ background: '#F05A28' }}
      >
        Explorar marketplace
      </Link>
    </div>
  )
}

function BuscaContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const initialCategoria = searchParams.get('categoria') ?? ''

  const [searchInput, setSearchInput] = useState(initialQuery)
  const [activeCategoria, setActiveCategoria] = useState(initialCategoria)
  const [sortBy, setSortBy] = useState('relevancia')
  const [priceRange, setPriceRange] = useState('todos')
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    setSearchInput(initialQuery)
  }, [initialQuery])

  useEffect(() => {
    setActiveCategoria(initialCategoria)
  }, [initialCategoria])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchInput.trim()) params.set('q', searchInput.trim())
    if (activeCategoria) params.set('categoria', activeCategoria)
    window.location.href = `/busca?${params.toString()}`
  }

  function handleAddToCart(id: string) {
    setCartCount((n) => n + 1)
    void id
  }

  const categorySlugMap: Record<string, string> = {
    'cimento-argamassa': 'Cimento',
    'tijolos-blocos': 'Tijolos',
    eletrica: 'Elétrica',
    hidraulica: 'Hidráulica',
    tintas: 'Tintas',
    pisos: 'Pisos',
    ferramentas: 'Ferramentas',
    'aco-ferro': 'Ferro',
    epi: 'EPI',
  }

  let results = ALL_PRODUCTS

  if (initialQuery) {
    const q = initialQuery.toLowerCase()
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.store.toLowerCase().includes(q)
    )
  }

  if (activeCategoria && categorySlugMap[activeCategoria]) {
    results = results.filter((p) => p.category === categorySlugMap[activeCategoria])
  }

  results = filterByPrice(results, priceRange)
  results = sortProducts(results, sortBy)

  return (
    <div style={{ background: '#F5F5F5', minHeight: '100vh' }}>
      {/* Header fixo */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(26,26,26,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
        }}
      >
        <div className="container-app flex items-center gap-3" style={{ height: 'var(--header-height)' }}>
          <Link href="/home" aria-label="Voltar" className="flex-shrink-0">
            <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2.2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/home" className="flex-shrink-0">
            <Logo />
          </Link>
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm select-none">🔎</span>
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Buscar materiais, lojas..."
                className="w-full py-2 pl-9 pr-3 rounded-xl text-sm outline-none"
                style={{ background: '#2D2D2D', color: '#fff', border: '1px solid #3D3D3D' }}
              />
            </div>
          </form>
          <Link href="/carrinho" className="relative flex-shrink-0" aria-label="Carrinho">
            <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-white text-[10px] font-black"
                style={{ background: '#F05A28', padding: '0 4px' }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      <main className="container-app pb-20" style={{ paddingTop: 'calc(var(--header-height) + 1rem)' }}>

        {/* Filtro de categorias */}
        <div className="flex gap-2 pb-2 overflow-x-auto mb-4">
          <button
            onClick={() => setActiveCategoria('')}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
            style={{
              background: activeCategoria === '' ? '#F05A28' : '#fff',
              color: activeCategoria === '' ? '#fff' : '#1A1A1A',
              border: activeCategoria === '' ? 'none' : '1px solid #E0E0E0',
            }}
          >
            Todos
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategoria(activeCategoria === cat.slug ? '' : cat.slug)}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{
                background: activeCategoria === cat.slug ? '#F05A28' : '#fff',
                color: activeCategoria === cat.slug ? '#fff' : '#1A1A1A',
                border: activeCategoria === cat.slug ? 'none' : '1px solid #E0E0E0',
              }}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Filtros: ordenar + faixa de preço */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none rounded-xl px-3 py-2 text-xs font-bold pr-7 outline-none"
              style={{ background: '#fff', color: '#1A1A1A', border: '1px solid #E0E0E0' }}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[10px]" style={{ color: '#9E9E9E' }}>▼</span>
          </div>
          <div className="relative flex-1">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full appearance-none rounded-xl px-3 py-2 text-xs font-bold pr-7 outline-none"
              style={{ background: '#fff', color: '#1A1A1A', border: '1px solid #E0E0E0' }}
            >
              {PRICE_RANGES.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[10px]" style={{ color: '#9E9E9E' }}>▼</span>
          </div>
        </div>

        {/* Contagem de resultados */}
        <p className="text-xs font-bold mb-4" style={{ color: '#9E9E9E' }}>
          {results.length > 0
            ? `${results.length} produto${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}`
            : 'Nenhum produto encontrado'}
        </p>

        {/* Grade de produtos ou estado vazio */}
        {results.length === 0 ? (
          <EmptyState query={initialQuery} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {results.map((p) => (
              <div key={p.id} className="flex justify-center">
                <ProductCard product={p} onAdd={handleAddToCart} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default function BuscaPage() {
  return (
    <Suspense
      fallback={
        <div style={{ background: '#F5F5F5', minHeight: '100vh' }} className="flex items-center justify-center">
          <p className="text-sm" style={{ color: '#9E9E9E' }}>Carregando busca...</p>
        </div>
      }
    >
      <BuscaContent />
    </Suspense>
  )
}
