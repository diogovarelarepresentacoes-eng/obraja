'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

// ─── Mock data ───────────────────────────────────────────────────────────────

const CATEGORY_META: Record<string, { label: string; emoji: string; description: string }> = {
  'cimento-argamassa': {
    label: 'Cimento e Argamassa',
    emoji: '🧱',
    description: 'Cimento Portland, argamassas colantes e massa corrida para sua obra.',
  },
  tintas: {
    label: 'Tintas',
    emoji: '🎨',
    description: 'Tintas acrílicas, esmaltes, primers e vernizes das melhores marcas.',
  },
  ferramentas: {
    label: 'Ferramentas',
    emoji: '🔧',
    description: 'Ferramentas manuais e elétricas para profissionais e obras residenciais.',
  },
  madeira: {
    label: 'Madeira',
    emoji: '🪵',
    description: 'Madeiras aparelhadas, compensados e estruturas em madeira tratada.',
  },
  eletrica: {
    label: 'Elétrica',
    emoji: '⚡',
    description: 'Fios, cabos, disjuntores, tomadas e todo o material elétrico.',
  },
  hidraulica: {
    label: 'Hidráulica',
    emoji: '🚿',
    description: 'Tubos, conexões, registros e tudo para instalações hidráulicas completas.',
  },
  'tijolos-blocos': {
    label: 'Tijolos e Blocos',
    emoji: '🧱',
    description: 'Tijolos cerâmicos e blocos de concreto para construções de todos os portes.',
  },
  pisos: {
    label: 'Pisos',
    emoji: '🟫',
    description: 'Porcelanato, cerâmica e revestimentos para todos os ambientes.',
  },
  epi: {
    label: 'EPI',
    emoji: '🪖',
    description: 'Equipamentos de proteção individual — capacetes, luvas, botas e óculos.',
  },
}

type Product = {
  id: string
  name: string
  store: string
  price: number
  originalPrice: number
  discount: number
  emoji: string
  category: string
  installments: number
}

const ALL_PRODUCTS: Product[] = [
  { id: '1', name: 'Cimento CP II-E 50kg Votoran', store: 'Material Forte', price: 37.90, originalPrice: 49.90, discount: 24, emoji: '🧱', category: 'cimento-argamassa', installments: 10 },
  { id: '7', name: 'Argamassa Colante AC-II 20kg', store: 'Material Forte', price: 22.50, originalPrice: 31.00, discount: 27, emoji: '🪣', category: 'cimento-argamassa', installments: 0 },
  { id: '2', name: 'Tinta Látex Suvinil Branco 18L', store: 'TintaMax', price: 189.00, originalPrice: 229.00, discount: 17, emoji: '🪣', category: 'tintas', installments: 6 },
  { id: '10', name: 'Rolo de Lã Antigo 23cm', store: 'TintaMax', price: 12.90, originalPrice: 18.00, discount: 28, emoji: '🎨', category: 'tintas', installments: 0 },
  { id: '3', name: 'Furadeira Bosch GSB 13 RE', store: 'FerraCentro', price: 349.00, originalPrice: 0, discount: 0, emoji: '🔩', category: 'ferramentas', installments: 12 },
  { id: '5', name: 'Vergalhão CA-50 3/8" 12m', store: 'AçoNorte', price: 48.70, originalPrice: 0, discount: 0, emoji: '⚙️', category: 'ferramentas', installments: 3 },
  { id: '4', name: 'Tijolo Cerâmico 6 Furos (un)', store: 'DepósitoABC', price: 1.20, originalPrice: 1.60, discount: 25, emoji: '🧱', category: 'tijolos-blocos', installments: 0 },
  { id: '6', name: 'Fio Elétrico 2,5mm 100m', store: 'ElétricaPlus', price: 142.00, originalPrice: 168.00, discount: 15, emoji: '🔌', category: 'eletrica', installments: 6 },
  { id: '8', name: 'Registro de Gaveta 3/4"', store: 'HidroShop', price: 34.90, originalPrice: 44.90, discount: 22, emoji: '🔧', category: 'hidraulica', installments: 3 },
  { id: '9', name: 'Capacete de Segurança Amarelo', store: 'EPI Brasil', price: 18.00, originalPrice: 25.00, discount: 28, emoji: '🪖', category: 'epi', installments: 0 },
  { id: '11', name: 'Porcelanato 60x60 Polido (m²)', store: 'RevestMax', price: 79.90, originalPrice: 99.90, discount: 20, emoji: '🟫', category: 'pisos', installments: 6 },
  { id: '12', name: 'Madeira Pinus Aparelhada 3x15 3m', store: 'MadeiraShop', price: 28.50, originalPrice: 0, discount: 0, emoji: '🪵', category: 'madeira', installments: 0 },
]

const PRICE_CHIPS = [
  { value: 'todos', label: 'Qualquer valor' },
  { value: '0-100', label: 'Até R$ 100' },
  { value: '100-500', label: 'R$ 100–500' },
  { value: '500+', label: 'R$ 500+' },
]

const SORT_OPTIONS = [
  { value: 'relevancia', label: 'Relevância' },
  { value: 'menor-preco', label: 'Menor preço' },
  { value: 'maior-preco', label: 'Maior preço' },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtPrice(v: number) {
  return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function applyFilters(products: Product[], slug: string, priceRange: string, sort: string): Product[] {
  let result = products.filter((p) => p.category === slug)

  if (priceRange === '0-100') result = result.filter((p) => p.price <= 100)
  else if (priceRange === '100-500') result = result.filter((p) => p.price > 100 && p.price <= 500)
  else if (priceRange === '500+') result = result.filter((p) => p.price > 500)

  if (sort === 'menor-preco') result.sort((a, b) => a.price - b.price)
  if (sort === 'maior-preco') result.sort((a, b) => b.price - a.price)

  return result
}

// ─── ProductCard (inline) ─────────────────────────────────────────────────────

function ProductCard({
  product,
  onAdd,
}: {
  product: Product
  onAdd: (id: string) => void
}) {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden flex flex-col transition-all hover:shadow-md"
      style={{ border: '1px solid #E5E5E5' }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = '#F05A28')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = '#E5E5E5')}
    >
      <div className="relative aspect-square bg-[#F5F5F5] flex items-center justify-center text-4xl">
        <span>{product.emoji}</span>
        {product.discount > 0 && (
          <span
            className="absolute top-2 left-2 text-[10px] font-bold rounded-full px-2 py-0.5"
            style={{ background: '#FFB800', color: '#1A1A1A' }}
          >
            -{product.discount}%
          </span>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1">
        <p className="text-xs mb-0.5" style={{ color: '#9E9E9E' }}>{product.store}</p>
        <p
          className="text-sm font-medium leading-snug line-clamp-2 flex-1"
          style={{ color: '#1A1A1A' }}
        >
          {product.name}
        </p>

        <div className="mt-2">
          {product.originalPrice > 0 && (
            <p className="text-xs text-gray-400 line-through">R$ {fmtPrice(product.originalPrice)}</p>
          )}
          <p className="text-base font-bold" style={{ color: '#1A1A1A' }}>
            R$ {fmtPrice(product.price)}
          </p>
          {product.installments > 1 && (
            <p className="text-xs text-green-600">
              {product.installments}x de R$ {fmtPrice(product.price / product.installments)}
            </p>
          )}
        </div>

        <button
          onClick={() => onAdd(product.id)}
          className="mt-2 w-full text-sm font-semibold py-2 rounded-lg text-white transition-colors"
          style={{ background: '#F05A28' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#CC4010')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#F05A28')}
        >
          + Adicionar
        </button>
      </div>
    </div>
  )
}

// ─── Empty state ─────────────────────────────────────────────────────────────

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ background: '#F5F5F5' }}
      >
        <svg width="28" height="28" fill="none" stroke="#9E9E9E" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
          <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
        </svg>
      </div>
      <h2 className="text-base font-bold mb-2" style={{ color: '#1A1A1A' }}>
        Nenhum produto encontrado
      </h2>
      <p className="text-sm max-w-xs" style={{ color: '#9E9E9E' }}>
        Ainda não há produtos em <strong>{label}</strong> com esses filtros.
      </p>
      <Link
        href="/home"
        className="mt-6 px-6 py-2.5 rounded-lg text-sm font-semibold text-white"
        style={{ background: '#F05A28' }}
      >
        Explorar marketplace
      </Link>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CategoriaPage() {
  const params = useParams()
  const router = useRouter()
  const slug = typeof params.slug === 'string' ? params.slug : ''

  const meta = CATEGORY_META[slug] ?? {
    label: slug.replace(/-/g, ' '),
    emoji: '📦',
    description: `Confira os melhores produtos de ${slug.replace(/-/g, ' ')}.`,
  }

  const [priceRange, setPriceRange] = useState('todos')
  const [sortBy, setSortBy] = useState('relevancia')
  const [cartCount, setCartCount] = useState(0)

  function handleAddToCart(id: string) {
    setCartCount((n) => n + 1)
    void id
  }

  const products = applyFilters(ALL_PRODUCTS, slug, priceRange, sortBy)

  return (
    <div className="bg-[#F5F5F5] min-h-screen">

      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 h-14"
        style={{ background: '#1A1A1A' }}
      >
        <div className="max-w-5xl mx-auto px-4 h-full flex items-center gap-3">
          <button onClick={() => router.back()} aria-label="Voltar" className="flex-shrink-0">
            <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2.2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Breadcrumb no header */}
          <div className="flex-1 flex items-center gap-1.5 text-sm min-w-0">
            <Link href="/home" className="text-white/60 hover:text-white transition-colors flex-shrink-0 text-xs">
              Home
            </Link>
            <span className="text-white/40 text-xs">›</span>
            <span className="text-white font-medium text-xs truncate">{meta.label}</span>
          </div>

          <Link href="/carrinho" className="relative flex-shrink-0" aria-label="Carrinho">
            <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {cartCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 flex items-center justify-center rounded-full text-white font-bold"
                style={{ background: '#F05A28', fontSize: '10px', padding: '0 3px' }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-16 pb-8">

        {/* Banner da categoria */}
        <div className="rounded-xl p-5 mb-5 flex items-center gap-4 bg-[#F5F5F5] border border-[#E5E5E5]">
          <div
            className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-3xl bg-white border border-[#E5E5E5]"
          >
            {meta.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold leading-tight" style={{ color: '#1A1A1A' }}>
              {meta.label}
            </h1>
            <p className="text-sm mt-0.5 leading-snug" style={{ color: '#9E9E9E' }}>
              {meta.description}
            </p>
          </div>
        </div>

        {/* Filtros de preço (chips) */}
        <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-none pb-1">
          {PRICE_CHIPS.map((chip) => (
            <button
              key={chip.value}
              onClick={() => setPriceRange(chip.value)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
              style={{
                background: priceRange === chip.value ? '#F05A28' : '#fff',
                color: priceRange === chip.value ? '#fff' : '#1A1A1A',
                borderColor: priceRange === chip.value ? '#F05A28' : '#E5E5E5',
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Barra de resultado + sort */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs" style={{ color: '#9E9E9E' }}>
            {products.length} produto{products.length !== 1 ? 's' : ''} em {meta.label}
          </p>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none text-xs font-medium pl-3 pr-7 py-1.5 rounded-lg border border-[#E5E5E5] bg-white outline-none"
              style={{ color: '#1A1A1A' }}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[10px]" style={{ color: '#9E9E9E' }}>▼</span>
          </div>
        </div>

        {/* Grid ou empty */}
        {products.length === 0 ? (
          <EmptyState label={meta.label} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
