'use client'

import Link from 'next/link'
import { useState } from 'react'
import ProductCard from '../_components/ProductCard'
import StoreCard from '../_components/StoreCard'
import BottomNav from '../_components/BottomNav'
import {
  CATEGORIES,
  DAILY_OFFERS,
  BEST_SELLERS,
  NEARBY_STORES,
  PROFESSIONAL_TYPES,
} from '../_data/mock'

function Logo() {
  return (
    <span className="text-xl font-black tracking-tight leading-none">
      <span className="text-white">Obra</span>
      <span style={{ color: '#F05A28' }}>Já</span>
    </span>
  )
}

function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-black" style={{ color: '#1A1A1A' }}>{title}</h2>
      <Link href={href} className="text-xs font-bold" style={{ color: '#F05A28' }}>
        Ver todos →
      </Link>
    </div>
  )
}

function CategoryChip({ slug, emoji, label }: { slug: string; emoji: string; label: string }) {
  return (
    <Link href={`/categoria/${slug}`} className="flex-shrink-0 flex flex-col items-center gap-1.5">
      <div
        className="w-16 h-16 flex items-center justify-center rounded-2xl text-2xl transition-all hover:scale-105"
        style={{ background: '#FFF3EE', border: '2px solid #FFE4D6' }}
      >
        {emoji}
      </div>
      <span className="text-[11px] font-medium text-center leading-tight w-16" style={{ color: '#1A1A1A' }}>
        {label}
      </span>
    </Link>
  )
}

function CartIcon({ count }: { count: number }) {
  return (
    <Link href="/carrinho" className="relative" aria-label={`Carrinho, ${count} itens`}>
      <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
      {count > 0 && (
        <span
          className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-white text-[10px] font-black"
          style={{ background: '#F05A28', padding: '0 4px' }}
        >
          {count}
        </span>
      )}
    </Link>
  )
}

export default function CustomerHome() {
  const [cartCount, setCartCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  function handleAddToCart(id: string) {
    setCartCount((n) => n + 1)
    void id
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/busca?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div style={{ background: '#F5F5F5', minHeight: '100vh' }}>

      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(26,26,26,0.90)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
        }}
      >
        <div className="container-app flex items-center gap-3" style={{ height: 'var(--header-height)' }}>
          <Logo />
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm select-none">🔎</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar materiais, lojas..."
                className="w-full py-2 pl-9 pr-3 rounded-xl text-sm outline-none"
                style={{ background: '#2D2D2D', color: '#fff', border: '1px solid #3D3D3D' }}
              />
            </div>
          </form>
          <div className="flex items-center gap-3 flex-shrink-0">
            <CartIcon count={cartCount} />
            <Link href="/perfil">
              <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <main className="container-app pb-20 md:pb-8" style={{ paddingTop: 'calc(var(--header-height) + 1rem)' }}>

        <div
          className="rounded-2xl p-4 mb-6 flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg, #F05A28 0%, #CC4010 100%)', boxShadow: '0 8px 24px rgba(240,90,40,0.30)' }}
        >
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-wider opacity-80">Oferta do dia</p>
            <p className="text-white font-black text-sm mt-0.5">🚚 Frete grátis acima de R$ 500 hoje!</p>
            <p className="text-white/70 text-xs mt-1">
              Use o cupom <strong className="text-white">FRETEGRATIS</strong> no checkout
            </p>
          </div>
          <Link
            href="/busca"
            className="flex-shrink-0 ml-3 text-xs font-black px-3 py-2 rounded-xl"
            style={{ background: '#fff', color: '#F05A28' }}
          >
            Ver marketplace
          </Link>
        </div>

        <section className="mb-6">
          <SectionHeader title="Categorias" href="/categorias" />
          <div className="flex gap-4 pb-2 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <CategoryChip key={cat.slug} slug={cat.slug} emoji={cat.emoji} label={cat.label} />
            ))}
          </div>
        </section>

        <section className="mb-6">
          <SectionHeader title="🔥 Ofertas do dia" href="/busca?tipo=ofertas" />
          <div className="flex gap-3 pb-2 overflow-x-auto">
            {DAILY_OFFERS.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
            ))}
          </div>
        </section>

        <section className="mb-6">
          <div
            className="rounded-2xl p-5"
            style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)', border: '1px solid #3D3D3D' }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#F05A28' }}>
                  📋 Minha Obra
                </p>
                <p className="text-white font-black text-sm mt-1 leading-snug">
                  Monte a lista da sua obra e receba orçamentos de várias lojas
                </p>
              </div>
              <div className="flex-shrink-0 text-4xl">🏠</div>
            </div>
            <div className="flex gap-3 mt-4">
              <Link
                href="/minha-obra"
                className="flex-1 text-center py-2.5 rounded-xl text-sm font-black text-white"
                style={{ background: '#F05A28' }}
              >
                Começar lista
              </Link>
              <Link
                href="/orcamento"
                className="flex-1 text-center py-2.5 rounded-xl text-sm font-bold"
                style={{ background: '#3D3D3D', color: '#fff' }}
              >
                Solicitar orçamento
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <SectionHeader title="⭐ Mais vendidos" href="/busca?tipo=mais-vendidos" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {BEST_SELLERS.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
            ))}
          </div>
        </section>

        <section className="mb-6">
          <SectionHeader title="🏪 Lojas próximas" href="/lojas" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {NEARBY_STORES.map((s) => (
              <StoreCard key={s.id} store={s} />
            ))}
          </div>
        </section>

        <section className="mb-6">
          <SectionHeader title="Compre por profissão" href="/perfis" />
          <div className="grid grid-cols-2 gap-3">
            {PROFESSIONAL_TYPES.map((prof) => (
              <Link
                key={prof.id}
                href={`/busca?perfil=${prof.id}`}
                className="rounded-2xl p-4"
                style={{ background: '#fff', border: `2px solid ${prof.color}22` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{prof.emoji}</span>
                  <span className="font-black text-sm" style={{ color: '#1A1A1A' }}>{prof.title}</span>
                </div>
                <ul className="space-y-1">
                  {prof.items.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-center gap-1.5 text-xs" style={{ color: '#666' }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: prof.color }} />
                      {item}
                    </li>
                  ))}
                  {prof.items.length > 3 && (
                    <li className="text-xs font-bold" style={{ color: prof.color }}>
                      +{prof.items.length - 3} mais →
                    </li>
                  )}
                </ul>
              </Link>
            ))}
          </div>
        </section>

        <footer className="text-center py-6">
          <Logo />
          <p className="text-xs mt-2" style={{ color: '#9E9E9E' }}>O marketplace de materiais de construção</p>
          <p className="text-xs mt-4" style={{ color: '#D4D4D4' }}>© 2026 ObraJá. Todos os direitos reservados.</p>
        </footer>

      </main>

      <BottomNav active="home" />
    </div>
  )
}
