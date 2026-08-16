'use client'

import { useState } from 'react'
import Link from 'next/link'

type Step = 1 | 2 | 3

type AddressForm = {
  cep: string
  rua: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
}

type PaymentTab = 'pix' | 'cartao' | 'boleto'

const MOCK_ORDER = {
  items: [
    { name: 'Cimento CP II-E 50kg Votoran', qty: 10, price: 37.90, emoji: '🏗️' },
    { name: 'Areia Média Lavada 20kg', qty: 5, price: 14.50, emoji: '🪨' },
    { name: 'Tijolo Cerâmico 8 Furos', qty: 200, price: 1.20, emoji: '🧱' },
  ],
  subtotal: 689.00,
  frete: 0,
  desconto: 0,
}

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const ESTADOS = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
  'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC',
  'SP','SE','TO',
]

const PARCELAS = Array.from({ length: 10 }, (_, i) => {
  const n = i + 1
  const valor = (MOCK_ORDER.subtotal / n).toFixed(2).replace('.', ',')
  const juros = n > 3 ? ' com juros' : ' sem juros'
  return { value: n, label: `${n}x de R$ ${valor}${juros}` }
})

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>(1)
  const [paymentTab, setPaymentTab] = useState<PaymentTab>('pix')
  const [boletoGerado, setBoletoGerado] = useState(false)
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false)

  const [address, setAddress] = useState<AddressForm>({
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: 'SP',
  })

  const [card, setCard] = useState({
    numero: '',
    nome: '',
    validade: '',
    cvv: '',
    parcelas: '1',
  })

  const total = MOCK_ORDER.subtotal - MOCK_ORDER.desconto + MOCK_ORDER.frete

  const updateAddress = (field: keyof AddressForm, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }))
  }

  const updateCard = (field: keyof typeof card, value: string) => {
    setCard(prev => ({ ...prev, [field]: value }))
  }

  const formatCardNumber = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  }

  const formatValidade = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d)/, '$1/$2')
  }

  const paymentLabel = () => {
    if (paymentTab === 'pix') return 'Pix'
    if (paymentTab === 'boleto') return 'Boleto bancário'
    const parcela = PARCELAS.find(p => p.value === Number(card.parcelas))
    return `Cartão — ${parcela?.label ?? ''}`
  }

  if (pedidoConfirmado) {
    return (
      <>
        <NavBar step={3} />
        <main className="min-h-screen pt-16 flex flex-col items-center justify-center px-4" style={{ backgroundColor: '#F5F5F5' }}>
          <div className="text-center space-y-4 max-w-sm">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto"
              style={{ backgroundColor: '#F0FFF4', border: '3px solid #22C55E' }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="text-2xl font-black" style={{ color: '#1A1A1A' }}>Pedido confirmado!</h2>
            <p className="text-sm" style={{ color: '#9E9E9E' }}>
              Seu pedido foi recebido com sucesso. Você receberá atualizações por e-mail.
            </p>
            <p className="font-black text-lg" style={{ color: '#F05A28' }}>
              #OJ-{Math.floor(Math.random() * 90000 + 10000)}
            </p>
            <Link
              href="/marketplace"
              className="inline-block w-full py-4 rounded-2xl text-white font-black text-lg mt-2"
              style={{ backgroundColor: '#F05A28', boxShadow: '0 4px 16px rgba(240,90,40,0.35)' }}
            >
              Continuar comprando
            </Link>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <NavBar step={step} />

      <main className="min-h-screen pt-16" style={{ backgroundColor: '#F5F5F5' }}>
        {/* Steps */}
        <div className="bg-white shadow-sm px-4 py-4">
          <div className="max-w-3xl mx-auto">
            <StepIndicator current={step} />
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Formulário principal */}
            <div className="lg:col-span-2">

              {/* STEP 1 — Endereço */}
              {step === 1 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                  <h2 className="text-xl font-black" style={{ color: '#1A1A1A' }}>Endereço de entrega</h2>

                  {/* CEP */}
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold mb-1" style={{ color: '#9E9E9E' }}>CEP *</label>
                      <input
                        type="text"
                        value={address.cep}
                        onChange={e => updateAddress('cep', e.target.value.replace(/\D/g, '').slice(0, 8))}
                        placeholder="00000-000"
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors"
                        style={{ borderColor: '#E5E7EB', color: '#1A1A1A' }}
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        className="px-5 py-3 rounded-xl font-bold text-sm border-2 transition-all"
                        style={{ borderColor: '#F05A28', color: '#F05A28' }}
                        onClick={() => {
                          if (address.cep.length === 8) {
                            updateAddress('rua', 'Rua das Acácias')
                            updateAddress('bairro', 'Jardim Paulista')
                            updateAddress('cidade', 'São Paulo')
                            updateAddress('estado', 'SP')
                          }
                        }}
                      >
                        Buscar
                      </button>
                    </div>
                  </div>

                  {/* Rua */}
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: '#9E9E9E' }}>Rua / Logradouro *</label>
                    <input
                      type="text"
                      value={address.rua}
                      onChange={e => updateAddress('rua', e.target.value)}
                      placeholder="Ex: Rua das Acácias"
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ borderColor: '#E5E7EB', color: '#1A1A1A' }}
                    />
                  </div>

                  {/* Número + Complemento */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: '#9E9E9E' }}>Número *</label>
                      <input
                        type="text"
                        value={address.numero}
                        onChange={e => updateAddress('numero', e.target.value)}
                        placeholder="123"
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                        style={{ borderColor: '#E5E7EB', color: '#1A1A1A' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: '#9E9E9E' }}>Complemento</label>
                      <input
                        type="text"
                        value={address.complemento}
                        onChange={e => updateAddress('complemento', e.target.value)}
                        placeholder="Apto, bloco..."
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                        style={{ borderColor: '#E5E7EB', color: '#1A1A1A' }}
                      />
                    </div>
                  </div>

                  {/* Bairro */}
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: '#9E9E9E' }}>Bairro *</label>
                    <input
                      type="text"
                      value={address.bairro}
                      onChange={e => updateAddress('bairro', e.target.value)}
                      placeholder="Ex: Jardim Paulista"
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ borderColor: '#E5E7EB', color: '#1A1A1A' }}
                    />
                  </div>

                  {/* Cidade + Estado */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: '#9E9E9E' }}>Cidade *</label>
                      <input
                        type="text"
                        value={address.cidade}
                        onChange={e => updateAddress('cidade', e.target.value)}
                        placeholder="São Paulo"
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                        style={{ borderColor: '#E5E7EB', color: '#1A1A1A' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: '#9E9E9E' }}>Estado *</label>
                      <select
                        value={address.estado}
                        onChange={e => updateAddress('estado', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                        style={{ borderColor: '#E5E7EB', color: '#1A1A1A' }}
                      >
                        {ESTADOS.map(uf => (
                          <option key={uf} value={uf}>{uf}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-4 rounded-2xl text-white font-black text-lg transition-all active:scale-95 mt-2"
                    style={{ backgroundColor: '#F05A28', boxShadow: '0 4px 16px rgba(240,90,40,0.35)' }}
                  >
                    Continuar para pagamento
                  </button>
                </div>
              )}

              {/* STEP 2 — Pagamento */}
              {step === 2 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#F5F5F5' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                      </svg>
                    </button>
                    <h2 className="text-xl font-black" style={{ color: '#1A1A1A' }}>Forma de pagamento</h2>
                  </div>

                  {/* Tabs de pagamento */}
                  <div
                    className="flex rounded-2xl p-1 gap-1"
                    style={{ backgroundColor: '#F5F5F5' }}
                  >
                    {(['pix', 'cartao', 'boleto'] as PaymentTab[]).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setPaymentTab(tab)}
                        className="flex-1 py-3 rounded-xl font-bold text-sm transition-all"
                        style={{
                          backgroundColor: paymentTab === tab ? 'white' : 'transparent',
                          color: paymentTab === tab ? '#F05A28' : '#9E9E9E',
                          boxShadow: paymentTab === tab ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                        }}
                      >
                        {tab === 'pix' ? 'Pix' : tab === 'cartao' ? 'Cartão' : 'Boleto'}
                      </button>
                    ))}
                  </div>

                  {/* PIX */}
                  {paymentTab === 'pix' && (
                    <div className="space-y-4">
                      <div className="flex flex-col items-center gap-4 py-4">
                        <div
                          className="w-48 h-48 rounded-2xl flex items-center justify-center"
                          style={{ backgroundColor: '#F5F5F5', border: '2px dashed #D1D5DB' }}
                        >
                          <div className="text-center">
                            <span style={{ fontSize: '60px', lineHeight: 1 }}>📱</span>
                            <p className="text-xs mt-2" style={{ color: '#9E9E9E' }}>QR Code Pix</p>
                          </div>
                        </div>

                        <div className="w-full text-center">
                          <p className="font-black text-2xl" style={{ color: '#1A1A1A' }}>
                            R$ {formatBRL(total)}
                          </p>
                          <p className="text-sm mt-1" style={{ color: '#9E9E9E' }}>
                            O pagamento é confirmado em instantes
                          </p>
                        </div>

                        <div
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl"
                          style={{ backgroundColor: '#F5F5F5' }}
                        >
                          <code className="flex-1 text-xs truncate" style={{ color: '#9E9E9E' }}>
                            00020126580014br.gov.bcb.pix0136...
                          </code>
                          <button
                            className="text-sm font-bold px-3 py-1 rounded-lg text-white"
                            style={{ backgroundColor: '#F05A28' }}
                          >
                            Copiar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CARTÃO */}
                  {paymentTab === 'cartao' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1" style={{ color: '#9E9E9E' }}>Número do cartão *</label>
                        <input
                          type="text"
                          value={card.numero}
                          onChange={e => updateCard('numero', formatCardNumber(e.target.value))}
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                          className="w-full px-4 py-3 rounded-xl border text-sm outline-none font-mono tracking-widest"
                          style={{ borderColor: '#E5E7EB', color: '#1A1A1A' }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1" style={{ color: '#9E9E9E' }}>Nome no cartão *</label>
                        <input
                          type="text"
                          value={card.nome}
                          onChange={e => updateCard('nome', e.target.value.toUpperCase())}
                          placeholder="NOME COMPLETO"
                          className="w-full px-4 py-3 rounded-xl border text-sm outline-none uppercase"
                          style={{ borderColor: '#E5E7EB', color: '#1A1A1A' }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold mb-1" style={{ color: '#9E9E9E' }}>Validade *</label>
                          <input
                            type="text"
                            value={card.validade}
                            onChange={e => updateCard('validade', formatValidade(e.target.value))}
                            placeholder="MM/AA"
                            maxLength={5}
                            className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                            style={{ borderColor: '#E5E7EB', color: '#1A1A1A' }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1" style={{ color: '#9E9E9E' }}>CVV *</label>
                          <input
                            type="text"
                            value={card.cvv}
                            onChange={e => updateCard('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                            placeholder="123"
                            maxLength={4}
                            className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                            style={{ borderColor: '#E5E7EB', color: '#1A1A1A' }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1" style={{ color: '#9E9E9E' }}>Parcelas *</label>
                        <select
                          value={card.parcelas}
                          onChange={e => updateCard('parcelas', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                          style={{ borderColor: '#E5E7EB', color: '#1A1A1A' }}
                        >
                          {PARCELAS.map(p => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* BOLETO */}
                  {paymentTab === 'boleto' && (
                    <div className="space-y-4 py-4">
                      <div
                        className="flex items-center gap-4 p-4 rounded-2xl"
                        style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}
                      >
                        <span style={{ fontSize: '32px' }}>📄</span>
                        <div>
                          <p className="font-bold text-sm" style={{ color: '#92400E' }}>Boleto bancário</p>
                          <p className="text-xs" style={{ color: '#B45309' }}>Vencimento em 3 dias úteis</p>
                          <p className="text-xs" style={{ color: '#B45309' }}>Compensação em até 2 dias após pagamento</p>
                        </div>
                      </div>

                      {boletoGerado ? (
                        <div className="space-y-3">
                          <div
                            className="p-4 rounded-xl"
                            style={{ backgroundColor: '#F5F5F5' }}
                          >
                            <p className="text-xs font-semibold mb-1" style={{ color: '#9E9E9E' }}>Código de barras</p>
                            <code className="text-xs break-all" style={{ color: '#1A1A1A' }}>
                              34191.09008 61207.727205 71453.360008 5 92340000068900
                            </code>
                          </div>
                          <button
                            className="w-full py-3 rounded-xl font-bold text-sm text-white"
                            style={{ backgroundColor: '#1A1A1A' }}
                          >
                            Copiar código de barras
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setBoletoGerado(true)}
                          className="w-full py-4 rounded-2xl font-black text-lg transition-all"
                          style={{ backgroundColor: '#1A1A1A', color: 'white' }}
                        >
                          Gerar boleto
                        </button>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => setStep(3)}
                    className="w-full py-4 rounded-2xl text-white font-black text-lg transition-all active:scale-95"
                    style={{ backgroundColor: '#F05A28', boxShadow: '0 4px 16px rgba(240,90,40,0.35)' }}
                  >
                    Revisar pedido
                  </button>
                </div>
              )}

              {/* STEP 3 — Confirmação */}
              {step === 3 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#F5F5F5' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                      </svg>
                    </button>
                    <h2 className="text-xl font-black" style={{ color: '#1A1A1A' }}>Confirmar pedido</h2>
                  </div>

                  {/* Resumo dos itens */}
                  <div>
                    <h3 className="font-black text-sm mb-3" style={{ color: '#9E9E9E' }}>ITENS DO PEDIDO</h3>
                    <div className="space-y-3">
                      {MOCK_ORDER.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                              background: 'linear-gradient(135deg, #F05A28 0%, #FFD4C2 100%)',
                              fontSize: '22px',
                            }}
                          >
                            {item.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate" style={{ color: '#1A1A1A' }}>{item.name}</p>
                            <p className="text-xs" style={{ color: '#9E9E9E' }}>Qtd: {item.qty}</p>
                          </div>
                          <span className="font-black text-sm" style={{ color: '#1A1A1A' }}>
                            R$ {formatBRL(item.price * item.qty)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t" style={{ borderColor: '#F5F5F5' }} />

                  {/* Endereço */}
                  <div>
                    <h3 className="font-black text-sm mb-2" style={{ color: '#9E9E9E' }}>ENDEREÇO DE ENTREGA</h3>
                    <div className="p-4 rounded-xl" style={{ backgroundColor: '#FAFAFA' }}>
                      {address.rua ? (
                        <p className="text-sm" style={{ color: '#1A1A1A' }}>
                          {address.rua}, {address.numero}
                          {address.complemento && `, ${address.complemento}`}
                          <br />
                          {address.bairro} — {address.cidade}/{address.estado}
                          <br />
                          CEP {address.cep}
                        </p>
                      ) : (
                        <p className="text-sm" style={{ color: '#9E9E9E' }}>Endereço não preenchido</p>
                      )}
                    </div>
                  </div>

                  {/* Pagamento */}
                  <div>
                    <h3 className="font-black text-sm mb-2" style={{ color: '#9E9E9E' }}>FORMA DE PAGAMENTO</h3>
                    <div className="p-4 rounded-xl flex items-center gap-3" style={{ backgroundColor: '#FAFAFA' }}>
                      <span style={{ fontSize: '24px' }}>
                        {paymentTab === 'pix' ? '📱' : paymentTab === 'cartao' ? '💳' : '📄'}
                      </span>
                      <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{paymentLabel()}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4" style={{ borderColor: '#F5F5F5' }}>
                    <div className="flex justify-between mb-1 text-sm">
                      <span style={{ color: '#9E9E9E' }}>Subtotal</span>
                      <span style={{ color: '#1A1A1A' }}>R$ {formatBRL(MOCK_ORDER.subtotal)}</span>
                    </div>
                    <div className="flex justify-between mb-3 text-sm">
                      <span style={{ color: '#9E9E9E' }}>Frete</span>
                      <span style={{ color: '#22C55E' }}>Grátis</span>
                    </div>
                    <div className="flex justify-between text-lg font-black">
                      <span style={{ color: '#1A1A1A' }}>Total</span>
                      <span style={{ color: '#F05A28' }}>R$ {formatBRL(total)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setPedidoConfirmado(true)}
                    className="w-full py-4 rounded-2xl text-white font-black text-lg transition-all active:scale-95"
                    style={{ backgroundColor: '#22C55E', boxShadow: '0 4px 16px rgba(34,197,94,0.35)' }}
                  >
                    Confirmar pedido
                  </button>

                  <p className="text-xs text-center" style={{ color: '#9E9E9E' }}>
                    Ao confirmar, você concorda com nossos Termos de Uso e Política de Privacidade.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar — Resumo do pedido */}
            <div>
              <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-20">
                <h3 className="font-black text-base mb-4" style={{ color: '#1A1A1A' }}>Resumo do pedido</h3>

                <div className="space-y-3 mb-4">
                  {MOCK_ORDER.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span style={{ fontSize: '20px' }}>{item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs truncate" style={{ color: '#1A1A1A' }}>{item.name}</p>
                        <p className="text-xs" style={{ color: '#9E9E9E' }}>x{item.qty}</p>
                      </div>
                      <span className="text-xs font-bold" style={{ color: '#1A1A1A' }}>
                        R$ {formatBRL(item.price * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className="border-t pt-4 space-y-2"
                  style={{ borderColor: '#F5F5F5' }}
                >
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#9E9E9E' }}>Subtotal</span>
                    <span style={{ color: '#1A1A1A' }}>R$ {formatBRL(MOCK_ORDER.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#9E9E9E' }}>Frete</span>
                    <span style={{ color: '#22C55E' }}>Grátis</span>
                  </div>
                  <div className="flex justify-between font-black">
                    <span style={{ color: '#1A1A1A' }}>Total</span>
                    <span style={{ color: '#F05A28' }}>R$ {formatBRL(total)}</span>
                  </div>
                </div>

                <div
                  className="mt-4 flex items-center gap-2 p-3 rounded-xl"
                  style={{ backgroundColor: '#F0FFF4', border: '1px solid #BBF7D0' }}
                >
                  <span style={{ color: '#22C55E', fontSize: '18px' }}>🔒</span>
                  <p className="text-xs font-semibold" style={{ color: '#16A34A' }}>
                    Compra 100% segura
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

function StepIndicator({ current }: { current: Step }) {
  const steps = [
    { n: 1 as Step, label: 'Endereço' },
    { n: 2 as Step, label: 'Pagamento' },
    { n: 3 as Step, label: 'Confirmação' },
  ]

  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm transition-all"
              style={{
                backgroundColor: current >= s.n ? '#F05A28' : '#F5F5F5',
                color: current >= s.n ? 'white' : '#9E9E9E',
                boxShadow: current === s.n ? '0 0 0 3px rgba(240,90,40,0.2)' : 'none',
              }}
            >
              {current > s.n ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : s.n}
            </div>
            <span
              className="text-xs font-semibold mt-1 whitespace-nowrap"
              style={{ color: current >= s.n ? '#F05A28' : '#9E9E9E' }}
            >
              {s.label}
            </span>
          </div>

          {i < steps.length - 1 && (
            <div
              className="w-16 sm:w-24 h-0.5 mb-5 mx-1"
              style={{ backgroundColor: current > s.n ? '#F05A28' : '#E5E7EB' }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function NavBar({ step }: { step: Step }) {
  const labels: Record<Step, string> = {
    1: 'Endereço',
    2: 'Pagamento',
    3: 'Confirmação',
  }
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 gap-3"
      style={{ backgroundColor: '#1A1A1A', backdropFilter: 'blur(12px)' }}
    >
      <Link href="/carrinho" className="flex items-center justify-center w-9 h-9 rounded-full" style={{ backgroundColor: '#2A2A2A' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
      </Link>

      <div className="flex-1 flex justify-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F05A28' }}>
            <span className="text-white font-black text-xs">OJ</span>
          </div>
          <span className="font-black text-white text-lg tracking-tight">ObraJá</span>
        </Link>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-white text-sm font-semibold">{labels[step]}</span>
      </div>
    </nav>
  )
}
