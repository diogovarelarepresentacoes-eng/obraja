'use client'

import { useState } from 'react'
import Link from 'next/link'

type CartItem = {
  id: string
  name: string
  store: string
  price: number
  unit: string
  qty: number
  emoji: string
}

const MOCK_ITEMS: CartItem[] = [
  {
    id: '1',
    name: 'Cimento CP II-E 50kg Votoran',
    store: 'Material Forte',
    price: 37.90,
    unit: 'saco',
    qty: 10,
    emoji: '🏗️',
  },
  {
    id: '2',
    name: 'Areia Média Lavada 20kg',
    store: 'Material Forte',
    price: 14.50,
    unit: 'saco',
    qty: 5,
    emoji: '🪨',
  },
  {
    id: '3',
    name: 'Tijolo Cerâmico 8 Furos (unidade)',
    store: 'ConstruBem',
    price: 1.20,
    unit: 'unid.',
    qty: 200,
    emoji: '🧱',
  },
]

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function CarrinhoPage() {
  const [items, setItems] = useState<CartItem[]>(MOCK_ITEMS)
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [cep, setCep] = useState('')
  const [freteCalculado, setFreteCalculado] = useState<number | null>(null)

  const updateQty = (id: string, delta: number) => {
    setItems(prev =>
      prev
        .map(item => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item)
        .filter(item => item.qty > 0)
    )
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'OBRA10') {
      setCouponApplied(true)
    }
  }

  const calcularFrete = () => {
    if (cep.replace(/\D/g, '').length === 8) {
      setFreteCalculado(subtotal >= 500 ? 0 : 35.90)
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const desconto = couponApplied ? subtotal * 0.1 : 0
  const frete = freteCalculado !== null ? freteCalculado : (subtotal >= 500 ? 0 : null)
  const total = subtotal - desconto + (frete ?? 0)

  // Agrupar por loja
  const stores = Array.from(new Set(items.map(i => i.store)))

  if (items.length === 0) {
    return (
      <>
        <NavBar itemCount={0} />
        <main className="min-h-screen pt-16 flex flex-col items-center justify-center px-4" style={{ backgroundColor: '#F5F5F5' }}>
          <div className="text-center space-y-4">
            <span style={{ fontSize: '80px', lineHeight: 1 }}>🛒</span>
            <h2 className="text-2xl font-black" style={{ color: '#1A1A1A' }}>Carrinho vazio</h2>
            <p className="text-sm" style={{ color: '#9E9E9E' }}>
              Você ainda não adicionou nenhum produto.
            </p>
            <Link
              href="/marketplace"
              className="inline-block px-8 py-4 rounded-2xl text-white font-black text-lg mt-4"
              style={{ backgroundColor: '#F05A28', boxShadow: '0 4px 16px rgba(240,90,40,0.35)' }}
            >
              Explorar produtos
            </Link>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <NavBar itemCount={items.reduce((s, i) => s + i.qty, 0)} />

      <main className="min-h-screen pt-16" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Itens do carrinho */}
            <div className="lg:col-span-2 space-y-4">
              {stores.map(store => {
                const storeItems = items.filter(i => i.store === store)
                return (
                  <div key={store} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    {/* Header da loja */}
                    <div
                      className="flex items-center gap-3 px-5 py-4 border-b"
                      style={{ borderColor: '#F5F5F5' }}
                    >
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm"
                        style={{ backgroundColor: '#1A1A1A' }}
                      >
                        {store[0]}
                      </div>
                      <span className="font-bold text-sm" style={{ color: '#1A1A1A' }}>{store}</span>
                      <span className="ml-auto text-xs px-2 py-1 rounded-full font-semibold" style={{ backgroundColor: '#F5F5F5', color: '#9E9E9E' }}>
                        {storeItems.length} {storeItems.length === 1 ? 'item' : 'itens'}
                      </span>
                    </div>

                    {/* Itens */}
                    <div className="divide-y" style={{ borderColor: '#F5F5F5' }}>
                      {storeItems.map(item => (
                        <div key={item.id} className="flex gap-4 p-5">
                          {/* Foto placeholder */}
                          <div
                            className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                              background: 'linear-gradient(135deg, #F05A28 0%, #FFD4C2 100%)',
                              fontSize: '36px',
                            }}
                          >
                            {item.emoji}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm leading-tight mb-1" style={{ color: '#1A1A1A' }}>
                              {item.name}
                            </p>
                            <p className="text-xs mb-2" style={{ color: '#9E9E9E' }}>
                              R$ {formatBRL(item.price)}/{item.unit}
                            </p>

                            <div className="flex items-center justify-between">
                              {/* Controles de quantidade */}
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQty(item.id, -1)}
                                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-lg transition-colors"
                                  style={{ borderColor: '#F05A28', color: '#F05A28' }}
                                >
                                  −
                                </button>
                                <span className="w-10 text-center font-black text-base" style={{ color: '#1A1A1A' }}>
                                  {item.qty}
                                </span>
                                <button
                                  onClick={() => updateQty(item.id, 1)}
                                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg text-white transition-colors"
                                  style={{ backgroundColor: '#F05A28' }}
                                >
                                  +
                                </button>
                              </div>

                              {/* Subtotal + remover */}
                              <div className="flex items-center gap-3">
                                <span className="font-black text-base" style={{ color: '#1A1A1A' }}>
                                  R$ {formatBRL(item.price * item.qty)}
                                </span>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                                  style={{ backgroundColor: '#FEE2E2', color: '#EF4444' }}
                                  aria-label="Remover item"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}

              {/* Cupom de desconto */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h3 className="font-black text-sm mb-3" style={{ color: '#1A1A1A' }}>Cupom de desconto</h3>
                {couponApplied ? (
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ backgroundColor: '#F0FFF4', border: '1px solid #BBF7D0' }}
                  >
                    <span style={{ color: '#22C55E' }}>✓</span>
                    <div>
                      <p className="font-bold text-sm" style={{ color: '#16A34A' }}>Cupom OBRA10 aplicado!</p>
                      <p className="text-xs" style={{ color: '#22C55E' }}>-10% de desconto no pedido</p>
                    </div>
                    <button
                      className="ml-auto text-xs font-semibold"
                      style={{ color: '#9E9E9E' }}
                      onClick={() => { setCouponApplied(false); setCoupon('') }}
                    >
                      Remover
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={coupon}
                      onChange={e => setCoupon(e.target.value.toUpperCase())}
                      placeholder="Digite o cupom (ex: OBRA10)"
                      className="flex-1 px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ borderColor: '#E5E7EB', color: '#1A1A1A' }}
                      onKeyDown={e => e.key === 'Enter' && applyCoupon()}
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-5 py-3 rounded-xl font-bold text-sm text-white transition-all"
                      style={{ backgroundColor: '#F05A28' }}
                    >
                      Aplicar
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Resumo do pedido */}
            <div className="space-y-4">
              {/* Calcular frete */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h3 className="font-black text-sm mb-3" style={{ color: '#1A1A1A' }}>Calcular frete</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cep}
                    onChange={e => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
                    placeholder="00000-000"
                    maxLength={9}
                    className="flex-1 px-4 py-3 rounded-xl border text-sm outline-none"
                    style={{ borderColor: '#E5E7EB', color: '#1A1A1A' }}
                  />
                  <button
                    onClick={calcularFrete}
                    className="px-4 py-3 rounded-xl font-bold text-sm border-2 transition-all"
                    style={{ borderColor: '#F05A28', color: '#F05A28' }}
                  >
                    OK
                  </button>
                </div>
                {freteCalculado !== null && (
                  <p className="text-xs mt-2 font-semibold" style={{ color: freteCalculado === 0 ? '#22C55E' : '#9E9E9E' }}>
                    {freteCalculado === 0 ? 'Frete grátis para este CEP!' : `Frete: R$ ${formatBRL(freteCalculado)}`}
                  </p>
                )}
                {frete === 0 && freteCalculado === null && (
                  <p className="text-xs mt-2 font-semibold" style={{ color: '#22C55E' }}>
                    Frete grátis acima de R$ 500!
                  </p>
                )}
              </div>

              {/* Resumo */}
              <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-20">
                <h3 className="font-black text-base mb-4" style={{ color: '#1A1A1A' }}>Resumo do pedido</h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#9E9E9E' }}>
                      Subtotal ({items.reduce((s, i) => s + i.qty, 0)} itens)
                    </span>
                    <span className="font-semibold" style={{ color: '#1A1A1A' }}>R$ {formatBRL(subtotal)}</span>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between text-sm">
                      <span style={{ color: '#22C55E' }}>Desconto (OBRA10)</span>
                      <span className="font-semibold" style={{ color: '#22C55E' }}>-R$ {formatBRL(desconto)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#9E9E9E' }}>Frete</span>
                    <span className="font-semibold" style={{ color: frete === 0 ? '#22C55E' : '#1A1A1A' }}>
                      {frete === null ? 'Calcule acima' : frete === 0 ? 'Grátis' : `R$ ${formatBRL(frete)}`}
                    </span>
                  </div>

                  <div
                    className="pt-3 mt-1 border-t flex justify-between"
                    style={{ borderColor: '#F5F5F5' }}
                  >
                    <span className="font-black text-base" style={{ color: '#1A1A1A' }}>Total</span>
                    <span className="font-black text-xl" style={{ color: '#F05A28' }}>
                      R$ {formatBRL(frete !== null ? total : subtotal - desconto)}
                    </span>
                  </div>

                  {frete === null && (
                    <p className="text-xs text-center" style={{ color: '#9E9E9E' }}>
                      * Frete não incluído
                    </p>
                  )}
                </div>

                <Link
                  href="/checkout"
                  className="block w-full mt-5 py-4 rounded-2xl text-white font-black text-lg text-center transition-all active:scale-95"
                  style={{ backgroundColor: '#F05A28', boxShadow: '0 4px 16px rgba(240,90,40,0.35)' }}
                >
                  Ir para o checkout
                </Link>

                <Link
                  href="/marketplace"
                  className="block w-full mt-3 py-3 rounded-2xl font-semibold text-sm text-center transition-all"
                  style={{ color: '#9E9E9E' }}
                >
                  Continuar comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

function NavBar({ itemCount }: { itemCount: number }) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 gap-3"
      style={{ backgroundColor: '#1A1A1A', backdropFilter: 'blur(12px)' }}
    >
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F05A28' }}>
          <span className="text-white font-black text-xs">OJ</span>
        </div>
        <span className="font-black text-white text-lg tracking-tight">ObraJá</span>
      </Link>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <span className="text-white font-semibold text-sm">Carrinho</span>
        {itemCount > 0 && (
          <span
            className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-black"
            style={{ backgroundColor: '#F05A28' }}
          >
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </div>
    </nav>
  )
}
