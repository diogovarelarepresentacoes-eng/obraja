'use client'

import { useState } from 'react'
import Link from 'next/link'

type CartItem = {
  id: string
  name: string
  variant: string
  store: string
  price: number
  unit: string
  qty: number
}

const MOCK_ITEMS: CartItem[] = [
  {
    id: '1',
    name: 'Cimento CP II-E 50kg Votoran',
    variant: 'Saco 50kg',
    store: 'Material Forte',
    price: 37.90,
    unit: 'saco',
    qty: 10,
  },
  {
    id: '2',
    name: 'Areia Média Lavada',
    variant: 'Saco 20kg',
    store: 'Material Forte',
    price: 14.50,
    unit: 'saco',
    qty: 5,
  },
  {
    id: '3',
    name: 'Tijolo Cerâmico 8 Furos',
    variant: 'Unidade',
    store: 'ConstruBem',
    price: 1.20,
    unit: 'unid.',
    qty: 200,
  },
]

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function CarrinhoPage() {
  const [items, setItems] = useState<CartItem[]>(MOCK_ITEMS)
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError, setCouponError] = useState(false)
  const [cep, setCep] = useState('')
  const [freteCalculado, setFreteCalculado] = useState<number | null>(null)

  const totalQty = items.reduce((s, i) => s + i.qty, 0)

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
      setCouponError(false)
    } else {
      setCouponError(true)
    }
  }

  const formatCep = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 8)
    return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits
  }

  const calcularFrete = () => {
    const digits = cep.replace(/\D/g, '')
    if (digits.length === 8) {
      setFreteCalculado(subtotal >= 500 ? 0 : 35.90)
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const desconto = couponApplied ? subtotal * 0.1 : 0
  const frete = freteCalculado !== null ? freteCalculado : (subtotal >= 500 ? 0 : null)
  const total = subtotal - desconto + (frete ?? 0)

  const stores = Array.from(new Set(items.map(i => i.store)))

  if (items.length === 0) {
    return (
      <div style={{ background: '#F5F5F5', minHeight: '100vh' }}>
        <NavBar itemCount={0} />
        <main className="flex flex-col items-center justify-center px-4" style={{ paddingTop: '88px', minHeight: '100vh' }}>
          <div className="text-center" style={{ maxWidth: '360px' }}>
            <div
              className="mx-auto mb-6 flex items-center justify-center rounded-full"
              style={{ width: '80px', height: '80px', background: '#EEEEEE' }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.97-1.67L23 6H6" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: '#1A1A1A' }}>Seu carrinho está vazio</h2>
            <p className="text-sm mb-6" style={{ color: '#9E9E9E' }}>
              Adicione produtos da nossa plataforma para continuar.
            </p>
            <Link
              href="/marketplace"
              className="inline-block px-6 py-3 rounded-xl text-white font-semibold text-sm transition-colors"
              style={{ backgroundColor: '#F05A28' }}
            >
              Continuar comprando
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div style={{ background: '#F5F5F5', minHeight: '100vh' }}>
      <NavBar itemCount={totalQty} />

      <main style={{ paddingTop: '72px' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '24px 16px' }}>
          <h1 className="text-xl font-bold mb-6" style={{ color: '#1A1A1A' }}>
            Meu carrinho ({totalQty} {totalQty === 1 ? 'item' : 'itens'})
          </h1>

          <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* Coluna esquerda — itens */}
            <div style={{ flex: '1 1 0', minWidth: 0 }}>
              <div className="space-y-4">

                {stores.map(store => {
                  const storeItems = items.filter(i => i.store === store)
                  return (
                    <div
                      key={store}
                      className="rounded-xl overflow-hidden"
                      style={{ background: '#FFFFFF', border: '1px solid #E5E5E5' }}
                    >
                      {/* Cabeçalho da loja */}
                      <div
                        className="flex items-center gap-3 px-4 py-3"
                        style={{ borderBottom: '1px solid #E5E5E5' }}
                      >
                        <div
                          className="flex items-center justify-center rounded-lg text-white text-xs font-bold flex-shrink-0"
                          style={{ width: '32px', height: '32px', background: '#1A1A1A' }}
                        >
                          {store[0]}
                        </div>
                        <span className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{store}</span>
                        <span className="ml-auto text-xs" style={{ color: '#9E9E9E' }}>
                          {storeItems.length} {storeItems.length === 1 ? 'item' : 'itens'}
                        </span>
                      </div>

                      {/* Itens da loja */}
                      {storeItems.map((item, idx) => (
                        <div
                          key={item.id}
                          className="flex gap-4 p-4"
                          style={idx < storeItems.length - 1 ? { borderBottom: '1px solid #E5E5E5' } : {}}
                        >
                          {/* Imagem placeholder */}
                          <div
                            className="flex-shrink-0 rounded-lg"
                            style={{ width: '72px', height: '72px', background: '#F5F5F5' }}
                          />

                          {/* Info + controles */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold leading-snug mb-0.5" style={{ color: '#1A1A1A' }}>
                              {item.name}
                            </p>
                            <p className="text-xs mb-1" style={{ color: '#9E9E9E' }}>
                              {item.variant} · {item.store}
                            </p>
                            <p className="text-xs font-medium mb-3" style={{ color: '#9E9E9E' }}>
                              R$ {formatBRL(item.price)}/{item.unit}
                            </p>

                            <div className="flex items-center justify-between flex-wrap gap-2">
                              {/* Controle de quantidade */}
                              <div
                                className="flex items-center gap-0 rounded-lg overflow-hidden"
                                style={{ border: '1px solid #E5E5E5' }}
                              >
                                <button
                                  onClick={() => updateQty(item.id, -1)}
                                  className="flex items-center justify-center text-base font-medium transition-colors"
                                  style={{ width: '36px', height: '36px', color: '#1A1A1A', background: '#F5F5F5' }}
                                  aria-label="Diminuir quantidade"
                                >
                                  −
                                </button>
                                <span
                                  className="text-sm font-semibold text-center"
                                  style={{ minWidth: '40px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A1A1A', background: '#FFFFFF' }}
                                >
                                  {item.qty}
                                </span>
                                <button
                                  onClick={() => updateQty(item.id, 1)}
                                  className="flex items-center justify-center text-base font-medium transition-colors"
                                  style={{ width: '36px', height: '36px', color: '#FFFFFF', background: '#F05A28' }}
                                  aria-label="Aumentar quantidade"
                                >
                                  +
                                </button>
                              </div>

                              <div className="flex items-center gap-3">
                                <span className="text-sm font-bold" style={{ color: '#1A1A1A' }}>
                                  R$ {formatBRL(item.price * item.qty)}
                                </span>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="flex items-center justify-center rounded-lg transition-colors"
                                  style={{ width: '32px', height: '32px', background: '#FEF2F2', color: '#DC2626' }}
                                  aria-label="Remover item"
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                })}

                {/* Cupom de desconto */}
                <div
                  className="rounded-xl p-4"
                  style={{ background: '#FFFFFF', border: '1px solid #E5E5E5' }}
                >
                  <h3 className="text-sm font-semibold mb-3" style={{ color: '#1A1A1A' }}>Cupom de desconto</h3>

                  {couponApplied ? (
                    <div
                      className="flex items-center gap-3 px-4 py-3 rounded-lg"
                      style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-sm font-semibold" style={{ color: '#16A34A' }}>Cupom OBRA10 aplicado</p>
                        <p className="text-xs" style={{ color: '#16A34A' }}>10% de desconto no subtotal</p>
                      </div>
                      <button
                        onClick={() => { setCouponApplied(false); setCoupon('') }}
                        className="text-xs font-medium"
                        style={{ color: '#9E9E9E' }}
                      >
                        Remover
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={coupon}
                          onChange={e => { setCoupon(e.target.value.toUpperCase()); setCouponError(false) }}
                          placeholder="Digite o cupom (ex: OBRA10)"
                          className="flex-1 text-sm outline-none rounded-lg px-3 py-2.5"
                          style={{
                            border: `1px solid ${couponError ? '#DC2626' : '#E5E5E5'}`,
                            color: '#1A1A1A',
                          }}
                          onKeyDown={e => e.key === 'Enter' && applyCoupon()}
                        />
                        <button
                          onClick={applyCoupon}
                          className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white flex-shrink-0 transition-colors"
                          style={{ background: '#F05A28' }}
                        >
                          Aplicar
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-xs mt-1.5" style={{ color: '#DC2626' }}>Cupom inválido ou expirado.</p>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Coluna direita — resumo sticky */}
            <div style={{ width: '100%', maxWidth: '340px', flexShrink: 0 }}>
              <div
                className="rounded-xl lg:sticky"
                style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', top: '80px' }}
              >
                {/* Calcular frete */}
                <div className="p-4" style={{ borderBottom: '1px solid #E5E5E5' }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: '#1A1A1A' }}>Calcular frete</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={cep}
                      onChange={e => setCep(formatCep(e.target.value))}
                      placeholder="00000-000"
                      maxLength={9}
                      className="flex-1 text-sm outline-none rounded-lg px-3 py-2.5"
                      style={{ border: '1px solid #E5E5E5', color: '#1A1A1A' }}
                    />
                    <button
                      onClick={calcularFrete}
                      className="px-4 py-2.5 rounded-lg text-sm font-semibold flex-shrink-0 transition-colors"
                      style={{ border: '1px solid #F05A28', color: '#F05A28', background: '#FFFFFF' }}
                    >
                      Calcular
                    </button>
                  </div>
                  {freteCalculado !== null && (
                    <p className="text-xs mt-2 font-medium" style={{ color: freteCalculado === 0 ? '#16A34A' : '#1A1A1A' }}>
                      {freteCalculado === 0
                        ? 'Frete grátis para este CEP!'
                        : `Frete: R$ ${formatBRL(freteCalculado)}`}
                    </p>
                  )}
                  {frete === 0 && freteCalculado === null && (
                    <p className="text-xs mt-2 font-medium" style={{ color: '#16A34A' }}>
                      Pedido acima de R$ 500 — frete grátis!
                    </p>
                  )}
                </div>

                {/* Resumo financeiro */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold mb-4" style={{ color: '#1A1A1A' }}>Resumo do pedido</h3>

                  <div className="space-y-2.5 mb-4">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: '#9E9E9E' }}>Subtotal ({totalQty} itens)</span>
                      <span style={{ color: '#1A1A1A' }}>R$ {formatBRL(subtotal)}</span>
                    </div>

                    {couponApplied && (
                      <div className="flex justify-between text-sm">
                        <span style={{ color: '#16A34A' }}>Desconto (OBRA10)</span>
                        <span style={{ color: '#16A34A' }}>-R$ {formatBRL(desconto)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span style={{ color: '#9E9E9E' }}>Frete</span>
                      <span style={{ color: frete === 0 ? '#16A34A' : '#1A1A1A' }}>
                        {frete === null ? 'Calcule acima' : frete === 0 ? 'Grátis' : `R$ ${formatBRL(frete)}`}
                      </span>
                    </div>
                  </div>

                  <div
                    className="flex justify-between items-center pt-3 mb-4"
                    style={{ borderTop: '1px solid #E5E5E5' }}
                  >
                    <span className="text-base font-bold" style={{ color: '#1A1A1A' }}>Total</span>
                    <span className="text-xl font-bold" style={{ color: '#F05A28' }}>
                      R$ {formatBRL(frete !== null ? total : subtotal - desconto)}
                    </span>
                  </div>

                  {frete === null && (
                    <p className="text-xs mb-3 text-center" style={{ color: '#9E9E9E' }}>
                      * Frete ainda não incluído
                    </p>
                  )}

                  <Link
                    href="/checkout"
                    className="block w-full py-3 rounded-xl text-white text-sm font-semibold text-center transition-colors mb-2"
                    style={{ background: '#F05A28' }}
                  >
                    Finalizar compra
                  </Link>
                  <Link
                    href="/marketplace"
                    className="block w-full py-2.5 text-sm text-center font-medium transition-colors"
                    style={{ color: '#9E9E9E' }}
                  >
                    Continuar comprando
                  </Link>

                  {/* Ícones de pagamento */}
                  <div
                    className="flex items-center justify-center gap-3 mt-4 pt-4"
                    style={{ borderTop: '1px solid #E5E5E5' }}
                  >
                    <PayBadge label="Pix" />
                    <PayBadge label="Cartão" />
                    <PayBadge label="Boleto" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

function PayBadge({ label }: { label: string }) {
  return (
    <span
      className="text-xs font-medium px-2 py-1 rounded"
      style={{ background: '#F5F5F5', color: '#9E9E9E', border: '1px solid #E5E5E5' }}
    >
      {label}
    </span>
  )
}

function NavBar({ itemCount }: { itemCount: number }) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center px-4 gap-3"
      style={{ background: '#1A1A1A', height: '56px' }}
    >
      <Link href="/" className="flex items-center gap-2">
        <div
          className="flex items-center justify-center rounded-lg"
          style={{ width: '30px', height: '30px', background: '#F05A28' }}
        >
          <span className="text-white font-bold text-xs">OJ</span>
        </div>
        <span className="font-bold text-white text-base">ObraJá</span>
      </Link>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <span className="text-white text-sm font-medium">Carrinho</span>
        {itemCount > 0 && (
          <span
            className="text-white text-xs font-bold flex items-center justify-center rounded-full"
            style={{ width: '22px', height: '22px', background: '#F05A28' }}
          >
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </div>
    </nav>
  )
}
