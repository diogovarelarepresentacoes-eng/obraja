'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// ─── Mock data ───────────────────────────────────────────────────────────────

const CATEGORIES = [
  { slug: 'cimento-argamassa', emoji: '🧱', label: 'Cimento' },
  { slug: 'tintas', emoji: '🎨', label: 'Tinta' },
  { slug: 'ferramentas', emoji: '🔧', label: 'Ferramentas' },
  { slug: 'madeira', emoji: '🪵', label: 'Madeira' },
  { slug: 'eletrica', emoji: '⚡', label: 'Elétrica' },
  { slug: 'hidraulica', emoji: '🚿', label: 'Hidráulica' },
]

const BEST_SELLERS = [
  { id: '1', name: 'Cimento CP II-E 50kg Votoran', store: 'Material Forte', price: 37.90, originalPrice: 49.90, discount: 24, emoji: '🧱', category: 'Cimento', installments: 10 },
  { id: '2', name: 'Tinta Látex Suvinil Branco 18L', store: 'TintaMax', price: 189.00, originalPrice: 229.00, discount: 17, emoji: '🪣', category: 'Tintas', installments: 6 },
  { id: '3', name: 'Furadeira Bosch GSB 13 RE', store: 'FerraCentro', price: 349.00, originalPrice: 0, discount: 0, emoji: '🔩', category: 'Ferramentas', installments: 12 },
  { id: '4', name: 'Tijolo Cerâmico 6 Furos (un)', store: 'DepósitoABC', price: 1.20, originalPrice: 1.60, discount: 25, emoji: '🧱', category: 'Tijolos', installments: 0 },
  { id: '5', name: 'Vergalhão CA-50 3/8" 12m', store: 'AçoNorte', price: 48.70, originalPrice: 0, discount: 0, emoji: '⚙️', category: 'Ferro', installments: 3 },
  { id: '6', name: 'Fio Elétrico 2,5mm 100m', store: 'ElétricaPlus', price: 142.00, originalPrice: 168.00, discount: 15, emoji: '🔌', category: 'Elétrica', installments: 6 },
]

const DAILY_OFFERS = [
  { id: '7', name: 'Argamassa Colante AC-II 20kg', store: 'Material Forte', price: 22.50, originalPrice: 31.00, discount: 27, emoji: '🪣', category: 'Cimento', installments: 0 },
  { id: '8', name: 'Registro de Gaveta 3/4"', store: 'HidroShop', price: 34.90, originalPrice: 44.90, discount: 22, emoji: '🔧', category: 'Hidráulica', installments: 3 },
  { id: '9', name: 'Capacete de Segurança Amarelo', store: 'EPI Brasil', price: 18.00, originalPrice: 25.00, discount: 28, emoji: '🪖', category: 'EPI', installments: 0 },
  { id: '10', name: 'Rolo de Lã Antigo 23cm', store: 'TintaMax', price: 12.90, originalPrice: 18.00, discount: 28, emoji: '🎨', category: 'Tintas', installments: 0 },
]

const NEARBY_STORES = [
  { id: 's1', name: 'Material Forte', rating: 4.8, reviews: 342, distance: '1,2 km', specialty: 'Cimento, tijolos, areia' },
  { id: 's2', name: 'TintaMax Construção', rating: 4.6, reviews: 198, distance: '2,4 km', specialty: 'Tintas e revestimentos' },
  { id: 's3', name: 'FerraCentro', rating: 4.9, reviews: 511, distance: '3,1 km', specialty: 'Ferramentas e EPIs' },
]

// ─── Sub-components (inline) ────────────────────────────────────────────────

function Logo() {
  return (
    <span className="text-xl font-black tracking-tight leading-none">
      <span className="text-white">Obra</span>
      <span style={{ color: '#F05A28' }}>Já</span>
    </span>
  )
}

function ProductCard({
  product,
  onAdd,
}: {
  product: (typeof BEST_SELLERS)[0]
  onAdd: (id: string) => void
}) {
  const fmtPrice = (v: number) =>
    v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div
      className="bg-white rounded-xl flex flex-col overflow-hidden flex-shrink-0 w-40 sm:w-44 transition-all hover:shadow-md"
      style={{ border: '1px solid #E5E5E5' }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = '#F05A28')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = '#E5E5E5')}
    >
      {/* Imagem */}
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

      {/* Info */}
      <div className="p-2.5 flex flex-col flex-1">
        <p className="text-xs text-gray-400 mb-0.5">{product.store}</p>
        <p
          className="text-sm font-medium leading-snug line-clamp-2 flex-1"
          style={{ color: '#1A1A1A' }}
        >
          {product.name}
        </p>

        <div className="mt-2">
          {product.originalPrice > 0 && (
            <p className="text-xs text-gray-400 line-through leading-none">
              R$ {fmtPrice(product.originalPrice)}
            </p>
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
          + Carrinho
        </button>
      </div>
    </div>
  )
}

function BottomNav({ active }: { active: string }) {
  const items = [
    { key: 'home', href: '/home', label: 'Início', icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21V12h6v9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )},
    { key: 'busca', href: '/busca', label: 'Busca', icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    )},
    { key: 'carrinho', href: '/carrinho', label: 'Carrinho', icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )},
    { key: 'pedidos', href: '/pedidos', label: 'Pedidos', icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" strokeLinecap="round" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" strokeLinecap="round" />
      </svg>
    )},
    { key: 'perfil', href: '/perfil', label: 'Perfil', icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )},
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 md:hidden z-40 bg-white border-t"
      style={{ borderColor: '#E5E5E5' }}
    >
      <div className="flex">
        {items.map((item) => {
          const isActive = active === item.key
          return (
            <Link
              key={item.key}
              href={item.href}
              className="flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium"
              style={{ color: isActive ? '#F05A28' : '#9E9E9E' }}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CustomerHome() {
  const router = useRouter()
  const [cartCount, setCartCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  function handleAddToCart(id: string) {
    setCartCount((n) => n + 1)
    void id
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/busca?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="bg-[#F5F5F5] min-h-screen">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 h-16"
        style={{ background: '#1A1A1A', boxShadow: '0 1px 0 rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-5xl mx-auto px-4 h-full flex items-center gap-3">
          <Logo />

          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="16" height="16" fill="none" stroke="#9E9E9E" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar materiais, lojas..."
                className="w-full py-2 pl-9 pr-3 rounded-lg text-sm outline-none bg-white border"
                style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }}
              />
            </div>
          </form>

          <Link href="/carrinho" className="relative flex-shrink-0" aria-label="Carrinho">
            <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {cartCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-white text-[10px] font-bold"
                style={{ background: '#F05A28', padding: '0 4px' }}
              >
                {cartCount}
              </span>
            )}
          </Link>

          <Link href="/perfil" aria-label="Meu perfil" className="flex-shrink-0">
            <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        </div>
      </header>

      {/* ── Main ──────────────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 pt-20 pb-24 md:pb-8">

        {/* Chips de categoria rápida */}
        <section className="py-3 mb-2">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-[#E5E5E5] hover:border-[#F05A28] transition-colors"
                style={{ color: '#1A1A1A' }}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Banner hero */}
        <section className="mb-6">
          <div
            className="rounded-xl p-5 flex items-center justify-between"
            style={{ background: '#F05A28' }}
          >
            <div>
              <p className="text-white/80 text-xs font-medium mb-1">Promoção ativa</p>
              <p className="text-white font-bold text-base leading-snug">
                Frete grátis acima de R$ 500
              </p>
              <p className="text-white/70 text-xs mt-0.5">
                Cupom: <span className="font-bold text-white">FRETEGRATIS</span>
              </p>
            </div>
            <Link
              href="/busca"
              className="flex-shrink-0 ml-4 bg-white text-sm font-semibold px-4 py-2 rounded-lg"
              style={{ color: '#F05A28' }}
            >
              Ver ofertas
            </Link>
          </div>
        </section>

        {/* Seção categorias */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold" style={{ color: '#1A1A1A' }}>Categorias</h2>
            <Link href="/categorias" className="text-xs font-medium" style={{ color: '#F05A28' }}>Ver todas</Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-xl border border-[#E5E5E5] hover:border-[#F05A28] transition-colors"
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-[11px] font-medium text-center leading-tight" style={{ color: '#1A1A1A' }}>
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Mais vendidos — scroll horizontal */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold" style={{ color: '#1A1A1A' }}>Mais vendidos</h2>
            <Link href="/busca?tipo=mais-vendidos" className="text-xs font-medium" style={{ color: '#F05A28' }}>Ver todos</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {BEST_SELLERS.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
            ))}
          </div>
        </section>

        {/* Ofertas do dia — scroll horizontal */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold" style={{ color: '#1A1A1A' }}>Ofertas do dia</h2>
            <Link href="/busca?tipo=ofertas" className="text-xs font-medium" style={{ color: '#F05A28' }}>Ver todas</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {DAILY_OFFERS.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
            ))}
          </div>
        </section>

        {/* Lojas próximas */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold" style={{ color: '#1A1A1A' }}>Lojas próximas</h2>
            <Link href="/lojas" className="text-xs font-medium" style={{ color: '#F05A28' }}>Ver todas</Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {NEARBY_STORES.map((store) => (
              <Link
                key={store.id}
                href={`/loja/${store.id}`}
                className="bg-white rounded-xl border border-[#E5E5E5] p-4 hover:border-[#F05A28] transition-colors flex items-start gap-3"
              >
                {/* Avatar placeholder */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: '#1A1A1A' }}
                >
                  {store.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: '#1A1A1A' }}>{store.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-xs" style={{ color: '#FFB800' }}>★</span>
                    <span className="text-xs font-medium" style={{ color: '#1A1A1A' }}>{store.rating}</span>
                    <span className="text-xs" style={{ color: '#9E9E9E' }}>({store.reviews})</span>
                  </div>
                  <p className="text-xs mt-0.5 truncate" style={{ color: '#9E9E9E' }}>{store.specialty}</p>
                  <p className="text-xs font-medium mt-1" style={{ color: '#16A34A' }}>{store.distance}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer simples */}
        <footer className="text-center py-6 border-t border-[#E5E5E5]">
          <Logo />
          <p className="text-xs mt-2" style={{ color: '#9E9E9E' }}>
            O marketplace de materiais de construção
          </p>
          <p className="text-xs mt-4" style={{ color: '#9E9E9E' }}>
            © 2026 ObraJá. Todos os direitos reservados.
          </p>
        </footer>
      </main>

      <BottomNav active="home" />
    </div>
  )
}
