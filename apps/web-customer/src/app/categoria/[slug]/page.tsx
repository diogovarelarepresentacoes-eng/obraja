'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import ProductCard from '../../_components/ProductCard'
import {
  CATEGORIES,
  DAILY_OFFERS,
  BEST_SELLERS,
} from '../../_data/mock'
import type { Product } from '../../_data/mock'

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

const SLUG_TO_CATEGORY: Record<string, string> = {
  'cimento-argamassa': 'Cimento',
  'tijolos-blocos': 'Tijolos',
  eletrica: 'Elétrica',
  hidraulica: 'Hidráulica',
  tintas: 'Tintas',
  pisos: 'Pisos',
  ferramentas: 'Ferramentas',
  'aco-ferro': 'Ferro',
  impermeabilizacao: 'Impermeabilização',
  epi: 'EPI',
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'cimento-argamassa': 'Cimento Portland, argamassas colantes, massa corrida e muito mais para sua obra.',
  'tijolos-blocos': 'Tijolos cerâmicos, blocos de concreto e vedação para construções de todos os portes.',
  eletrica: 'Fios, cabos, disjuntores, tomadas e todo o material elétrico que você precisa.',
  hidraulica: 'Tubos, conexões, registros e tudo para instalações hidráulicas completas.',
  tintas: 'Tintas acrílicas, esmaltes, primers e vernizes das melhores marcas do mercado.',
  pisos: 'Porcelanato, cerâmica, piso vinílico e revestimentos para todos os ambientes.',
  ferramentas: 'Ferramentas manuais, elétricas e equipamentos profissionais para sua obra.',
  'aco-ferro': 'Vergalhões, telas soldadas, perfis e aços estruturais para construção civil.',
  impermeabilizacao: 'Mantas, membranas e produtos impermeabilizantes para lajes e fundações.',
  epi: 'Capacetes, luvas, botas, óculos e todo equipamento de proteção individual.',
}

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

function EmptyState({ categoryName }: { categoryName: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="text-6xl mb-4">📦</div>
      <h2 className="text-lg font-black mb-2" style={{ color: '#1A1A1A' }}>
        Nenhum produto encontrado
      </h2>
      <p className="text-sm max-w-xs" style={{ color: '#9E9E9E' }}>
        Ainda não temos produtos em <strong>{categoryName}</strong> com esses filtros. Tente remover os filtros ou explore outras categorias.
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

export default function CategoriaPage() {
  const params = useParams()
  const slug = typeof params.slug === 'string' ? params.slug : ''

  const categoryData = CATEGORIES.find((c) => c.slug === slug)
  const categoryName = categoryData?.label ?? slug.replace(/-/g, ' ')
  const categoryEmoji = categoryData?.emoji ?? '📦'
  const categoryDescription = CATEGORY_DESCRIPTIONS[slug] ?? `Confira os melhores produtos de ${categoryName} com os melhores preços.`
  const categoryFilter = SLUG_TO_CATEGORY[slug]

  const [sortBy, setSortBy] = useState('relevancia')
  const [priceRange, setPriceRange] = useState('todos')
  const [cartCount, setCartCount] = useState(0)

  function handleAddToCart(id: string) {
    setCartCount((n) => n + 1)
    void id
  }

  let products = categoryFilter
    ? ALL_PRODUCTS.filter((p) => p.category === categoryFilter)
    : ALL_PRODUCTS

  products = filterByPrice(products, priceRange)
  products = sortProducts(products, sortBy)

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
          <div className="flex-1 min-w-0">
            <p className="text-white font-black text-sm truncate">{categoryEmoji} {categoryName}</p>
          </div>
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

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs mb-4" style={{ color: '#9E9E9E' }}>
          <Link href="/home" className="hover:underline" style={{ color: '#9E9E9E' }}>Home</Link>
          <span>›</span>
          <Link href="/categorias" className="hover:underline" style={{ color: '#9E9E9E' }}>Categorias</Link>
          <span>›</span>
          <span className="font-bold truncate" style={{ color: '#1A1A1A' }}>{categoryName}</span>
        </nav>

        {/* Banner da categoria */}
        <div
          className="rounded-2xl p-5 mb-6 flex items-center gap-4"
          style={{
            background: 'linear-gradient(135deg, #F05A28 0%, #CC4010 100%)',
            boxShadow: '0 8px 24px rgba(240,90,40,0.25)',
          }}
        >
          <div
            className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl text-4xl"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          >
            {categoryEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-white font-black text-lg leading-tight">{categoryName}</h1>
            <p className="text-white/80 text-xs mt-1 leading-snug">{categoryDescription}</p>
          </div>
        </div>

        {/* Filtros */}
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

        {/* Contagem */}
        <p className="text-xs font-bold mb-4" style={{ color: '#9E9E9E' }}>
          {products.length > 0
            ? `${products.length} produto${products.length !== 1 ? 's' : ''} em ${categoryName}`
            : 'Nenhum produto encontrado'}
        </p>

        {/* Grade de produtos */}
        {products.length === 0 ? (
          <EmptyState categoryName={categoryName} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.map((p) => (
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
