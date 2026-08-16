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
    { name: 'Cimento CP II-E 50kg Votoran', qty: 10, price: 37.90 },
    { name: 'Areia Média Lavada 20kg', qty: 5, price: 14.50 },
    { name: 'Tijolo Cerâmico 8 Furos', qty: 200, price: 1.20 },
  ],
  subtotal: 689.00,
  frete: 0,
  desconto: 0,
}

const ESTADOS = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
  'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC',
  'SP','SE','TO',
]

const PARCELAS = Array.from({ length: 10 }, (_, i) => {
  const n = i + 1
  const valor = (MOCK_ORDER.subtotal / n).toFixed(2).replace('.', ',')
  const juros = n > 3 ? ' c/ juros' : ' s/ juros'
  return { value: n, label: `${n}x de R$ ${valor}${juros}` }
})

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const ORDER_NUMBER = `OJ-${Math.floor(10000 + Math.random() * 90000)}`

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>(1)
  const [paymentTab, setPaymentTab] = useState<PaymentTab>('pix')
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false)

  const [address, setAddress] = useState<AddressForm>({
    cep: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: 'SP',
  })

  const [card, setCard] = useState({
    numero: '', nome: '', validade: '', cvv: '', parcelas: '1',
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

  const formatCep = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 8)
    return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d
  }

  const buscarCep = () => {
    const digits = address.cep.replace(/\D/g, '')
    if (digits.length === 8) {
      updateAddress('rua', 'Rua das Acácias')
      updateAddress('bairro', 'Jardim Paulista')
      updateAddress('cidade', 'São Paulo')
      updateAddress('estado', 'SP')
    }
  }

  const paymentLabel = () => {
    if (paymentTab === 'pix') return 'Pix'
    if (paymentTab === 'boleto') return 'Boleto bancário'
    const p = PARCELAS.find(p => p.value === Number(card.parcelas))
    return `Cartão — ${p?.label ?? ''}`
  }

  if (pedidoConfirmado) {
    return (
      <div
        className="flex flex-col items-center justify-center px-4 text-center"
        style={{ minHeight: '100vh', background: '#FFFFFF' }}
      >
        <div
          className="flex items-center justify-center rounded-full mb-6"
          style={{ width: '80px', height: '80px', background: '#F0FDF4', border: '2px solid #16A34A' }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#1A1A1A' }}>
          Pedido confirmado!
        </h1>
        <p className="text-sm mb-1" style={{ color: '#9E9E9E' }}>
          Seu pedido foi recebido com sucesso.
        </p>
        <p className="text-sm mb-6" style={{ color: '#9E9E9E' }}>
          Você receberá atualizações por e-mail.
        </p>
        <p className="text-lg font-bold mb-8" style={{ color: '#F05A28' }}>
          #{ORDER_NUMBER}
        </p>
        <div className="flex flex-col gap-3 w-full" style={{ maxWidth: '320px' }}>
          <Link
            href="/pedidos/12345"
            className="block w-full py-3 rounded-xl text-white text-sm font-semibold text-center transition-colors"
            style={{ background: '#F05A28' }}
          >
            Acompanhar pedido
          </Link>
          <Link
            href="/marketplace"
            className="block w-full py-3 rounded-xl text-sm font-semibold text-center transition-colors"
            style={{ color: '#1A1A1A', border: '1px solid #E5E5E5' }}
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#F5F5F5', minHeight: '100vh' }}>
      <NavBar step={step} />

      {/* Progress bar */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E5E5', paddingTop: '56px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '20px 16px' }}>
          <StepIndicator current={step} />
        </div>
      </div>

      <main style={{ maxWidth: '1024px', margin: '0 auto', padding: '24px 16px' }}>
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Formulário principal */}
          <div style={{ flex: '1 1 0', minWidth: 0 }}>

            {/* STEP 1 — Endereço */}
            {step === 1 && (
              <div
                className="rounded-xl p-6"
                style={{ background: '#FFFFFF', border: '1px solid #E5E5E5' }}
              >
                <h2 className="text-base font-bold mb-5" style={{ color: '#1A1A1A' }}>Endereço de entrega</h2>

                <div className="space-y-4">
                  {/* CEP */}
                  <div className="flex gap-3">
                    <div style={{ flex: '1' }}>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: '#1A1A1A' }}>CEP *</label>
                      <input
                        type="text"
                        value={address.cep}
                        onChange={e => updateAddress('cep', formatCep(e.target.value))}
                        placeholder="00000-000"
                        maxLength={9}
                        className="w-full text-sm outline-none rounded-lg px-3 py-2.5 transition-colors"
                        style={{ border: '1px solid #E5E5E5', color: '#1A1A1A' }}
                        onFocus={e => (e.target.style.borderColor = '#F05A28')}
                        onBlur={e => (e.target.style.borderColor = '#E5E5E5')}
                      />
                    </div>
                    <div style={{ paddingTop: '22px' }}>
                      <button
                        onClick={buscarCep}
                        className="px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex-shrink-0"
                        style={{ border: '1px solid #F05A28', color: '#F05A28', background: '#FFFFFF' }}
                      >
                        Buscar
                      </button>
                    </div>
                  </div>

                  {/* Rua */}
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#1A1A1A' }}>Rua / Logradouro *</label>
                    <input
                      type="text"
                      value={address.rua}
                      onChange={e => updateAddress('rua', e.target.value)}
                      placeholder="Ex: Rua das Acácias"
                      className="w-full text-sm outline-none rounded-lg px-3 py-2.5 transition-colors"
                      style={{ border: '1px solid #E5E5E5', color: '#1A1A1A' }}
                      onFocus={e => (e.target.style.borderColor = '#F05A28')}
                      onBlur={e => (e.target.style.borderColor = '#E5E5E5')}
                    />
                  </div>

                  {/* Número + Complemento */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: '#1A1A1A' }}>Número *</label>
                      <input
                        type="text"
                        value={address.numero}
                        onChange={e => updateAddress('numero', e.target.value)}
                        placeholder="123"
                        className="w-full text-sm outline-none rounded-lg px-3 py-2.5 transition-colors"
                        style={{ border: '1px solid #E5E5E5', color: '#1A1A1A' }}
                        onFocus={e => (e.target.style.borderColor = '#F05A28')}
                        onBlur={e => (e.target.style.borderColor = '#E5E5E5')}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: '#1A1A1A' }}>Complemento</label>
                      <input
                        type="text"
                        value={address.complemento}
                        onChange={e => updateAddress('complemento', e.target.value)}
                        placeholder="Apto, bloco..."
                        className="w-full text-sm outline-none rounded-lg px-3 py-2.5 transition-colors"
                        style={{ border: '1px solid #E5E5E5', color: '#1A1A1A' }}
                        onFocus={e => (e.target.style.borderColor = '#F05A28')}
                        onBlur={e => (e.target.style.borderColor = '#E5E5E5')}
                      />
                    </div>
                  </div>

                  {/* Bairro */}
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#1A1A1A' }}>Bairro *</label>
                    <input
                      type="text"
                      value={address.bairro}
                      onChange={e => updateAddress('bairro', e.target.value)}
                      placeholder="Ex: Jardim Paulista"
                      className="w-full text-sm outline-none rounded-lg px-3 py-2.5 transition-colors"
                      style={{ border: '1px solid #E5E5E5', color: '#1A1A1A' }}
                      onFocus={e => (e.target.style.borderColor = '#F05A28')}
                      onBlur={e => (e.target.style.borderColor = '#E5E5E5')}
                    />
                  </div>

                  {/* Cidade + Estado */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: '#1A1A1A' }}>Cidade *</label>
                      <input
                        type="text"
                        value={address.cidade}
                        onChange={e => updateAddress('cidade', e.target.value)}
                        placeholder="São Paulo"
                        className="w-full text-sm outline-none rounded-lg px-3 py-2.5 transition-colors"
                        style={{ border: '1px solid #E5E5E5', color: '#1A1A1A' }}
                        onFocus={e => (e.target.style.borderColor = '#F05A28')}
                        onBlur={e => (e.target.style.borderColor = '#E5E5E5')}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: '#1A1A1A' }}>Estado *</label>
                      <select
                        value={address.estado}
                        onChange={e => updateAddress('estado', e.target.value)}
                        className="w-full text-sm outline-none rounded-lg px-3 py-2.5 transition-colors"
                        style={{ border: '1px solid #E5E5E5', color: '#1A1A1A', background: '#FFFFFF' }}
                      >
                        {ESTADOS.map(uf => (
                          <option key={uf} value={uf}>{uf}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-3 rounded-xl text-white text-sm font-semibold transition-colors"
                    style={{ background: '#F05A28', marginTop: '8px' }}
                  >
                    Continuar para pagamento
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 — Pagamento */}
            {step === 2 && (
              <div
                className="rounded-xl p-6"
                style={{ background: '#FFFFFF', border: '1px solid #E5E5E5' }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center justify-center rounded-lg transition-colors"
                    style={{ width: '34px', height: '34px', background: '#F5F5F5', border: '1px solid #E5E5E5' }}
                    aria-label="Voltar"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                  </button>
                  <h2 className="text-base font-bold" style={{ color: '#1A1A1A' }}>Forma de pagamento</h2>
                </div>

                {/* Tabs */}
                <div
                  className="flex rounded-lg p-1 gap-1 mb-5"
                  style={{ background: '#F5F5F5' }}
                >
                  {(['pix', 'cartao', 'boleto'] as PaymentTab[]).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setPaymentTab(tab)}
                      className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all"
                      style={{
                        background: paymentTab === tab ? '#FFFFFF' : 'transparent',
                        color: paymentTab === tab ? '#F05A28' : '#9E9E9E',
                        border: paymentTab === tab ? '1px solid #E5E5E5' : '1px solid transparent',
                      }}
                    >
                      {tab === 'pix' ? 'Pix' : tab === 'cartao' ? 'Cartão' : 'Boleto'}
                    </button>
                  ))}
                </div>

                {/* PIX */}
                {paymentTab === 'pix' && (
                  <div className="space-y-4">
                    <div className="flex flex-col items-center gap-4 py-2">
                      <div
                        className="flex items-center justify-center rounded-xl"
                        style={{ width: '180px', height: '180px', background: '#F5F5F5', border: '2px dashed #E5E5E5' }}
                      >
                        <div className="text-center">
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
                            <rect x="3" y="3" width="7" height="7" rx="1" />
                            <rect x="14" y="3" width="7" height="7" rx="1" />
                            <rect x="3" y="14" width="7" height="7" rx="1" />
                            <path d="M14 14h1M18 14h3M14 18v3M18 18h3M18 21v1" />
                          </svg>
                          <p className="text-xs" style={{ color: '#9E9E9E' }}>QR Code Pix</p>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-xl font-bold" style={{ color: '#1A1A1A' }}>
                          R$ {formatBRL(total)}
                        </p>
                        <p className="text-xs mt-1" style={{ color: '#9E9E9E' }}>
                          Válido por 30 minutos
                        </p>
                      </div>

                      <div
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-lg"
                        style={{ background: '#F5F5F5', border: '1px solid #E5E5E5' }}
                      >
                        <code className="flex-1 text-xs truncate" style={{ color: '#9E9E9E' }}>
                          00020126580014br.gov.bcb.pix0136...
                        </code>
                        <button
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white flex-shrink-0"
                          style={{ background: '#F05A28' }}
                        >
                          Copiar código Pix
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* CARTÃO */}
                {paymentTab === 'cartao' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: '#1A1A1A' }}>Número do cartão *</label>
                      <input
                        type="text"
                        value={card.numero}
                        onChange={e => updateCard('numero', formatCardNumber(e.target.value))}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        className="w-full text-sm outline-none rounded-lg px-3 py-2.5 font-mono tracking-widest transition-colors"
                        style={{ border: '1px solid #E5E5E5', color: '#1A1A1A' }}
                        onFocus={e => (e.target.style.borderColor = '#F05A28')}
                        onBlur={e => (e.target.style.borderColor = '#E5E5E5')}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: '#1A1A1A' }}>Nome no cartão *</label>
                      <input
                        type="text"
                        value={card.nome}
                        onChange={e => updateCard('nome', e.target.value.toUpperCase())}
                        placeholder="NOME COMPLETO"
                        className="w-full text-sm outline-none rounded-lg px-3 py-2.5 uppercase transition-colors"
                        style={{ border: '1px solid #E5E5E5', color: '#1A1A1A' }}
                        onFocus={e => (e.target.style.borderColor = '#F05A28')}
                        onBlur={e => (e.target.style.borderColor = '#E5E5E5')}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: '#1A1A1A' }}>Validade *</label>
                        <input
                          type="text"
                          value={card.validade}
                          onChange={e => updateCard('validade', formatValidade(e.target.value))}
                          placeholder="MM/AA"
                          maxLength={5}
                          className="w-full text-sm outline-none rounded-lg px-3 py-2.5 transition-colors"
                          style={{ border: '1px solid #E5E5E5', color: '#1A1A1A' }}
                          onFocus={e => (e.target.style.borderColor = '#F05A28')}
                          onBlur={e => (e.target.style.borderColor = '#E5E5E5')}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: '#1A1A1A' }}>CVV *</label>
                        <input
                          type="text"
                          value={card.cvv}
                          onChange={e => updateCard('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="123"
                          maxLength={4}
                          className="w-full text-sm outline-none rounded-lg px-3 py-2.5 transition-colors"
                          style={{ border: '1px solid #E5E5E5', color: '#1A1A1A' }}
                          onFocus={e => (e.target.style.borderColor = '#F05A28')}
                          onBlur={e => (e.target.style.borderColor = '#E5E5E5')}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: '#1A1A1A' }}>Parcelas *</label>
                      <select
                        value={card.parcelas}
                        onChange={e => updateCard('parcelas', e.target.value)}
                        className="w-full text-sm outline-none rounded-lg px-3 py-2.5 transition-colors"
                        style={{ border: '1px solid #E5E5E5', color: '#1A1A1A', background: '#FFFFFF' }}
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
                  <div className="space-y-4 py-2">
                    <div
                      className="flex items-start gap-4 p-4 rounded-lg"
                      style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: '#92400E' }}>Boleto bancário</p>
                        <p className="text-xs mt-0.5" style={{ color: '#B45309' }}>
                          O boleto será gerado após confirmação do pedido.
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: '#B45309' }}>
                          Vencimento em 3 dias úteis · Compensação em até 2 dias.
                        </p>
                      </div>
                    </div>

                    <div className="text-center py-2">
                      <p className="text-xs" style={{ color: '#9E9E9E' }}>
                        O código de barras será exibido após a confirmação.
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setStep(3)}
                  className="w-full py-3 rounded-xl text-white text-sm font-semibold transition-colors mt-5"
                  style={{ background: '#F05A28' }}
                >
                  Confirmar pagamento
                </button>
              </div>
            )}

            {/* STEP 3 — Revisão */}
            {step === 3 && (
              <div
                className="rounded-xl p-6"
                style={{ background: '#FFFFFF', border: '1px solid #E5E5E5' }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center justify-center rounded-lg transition-colors"
                    style={{ width: '34px', height: '34px', background: '#F5F5F5', border: '1px solid #E5E5E5' }}
                    aria-label="Voltar"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                  </button>
                  <h2 className="text-base font-bold" style={{ color: '#1A1A1A' }}>Revisar pedido</h2>
                </div>

                {/* Endereço */}
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9E9E9E' }}>Endereço de entrega</p>
                  <div className="p-3 rounded-lg" style={{ background: '#F5F5F5' }}>
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
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9E9E9E' }}>Forma de pagamento</p>
                  <div className="p-3 rounded-lg flex items-center gap-2" style={{ background: '#F5F5F5' }}>
                    <span className="text-sm font-medium" style={{ color: '#1A1A1A' }}>{paymentLabel()}</span>
                  </div>
                </div>

                {/* Itens */}
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9E9E9E' }}>Itens do pedido</p>
                  <div className="space-y-2">
                    {MOCK_ORDER.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 py-2" style={{ borderBottom: i < MOCK_ORDER.items.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                        <div className="flex-shrink-0 rounded-lg" style={{ width: '36px', height: '36px', background: '#F5F5F5' }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate" style={{ color: '#1A1A1A' }}>{item.name}</p>
                          <p className="text-xs" style={{ color: '#9E9E9E' }}>Qtd: {item.qty}</p>
                        </div>
                        <span className="text-sm font-semibold flex-shrink-0" style={{ color: '#1A1A1A' }}>
                          R$ {formatBRL(item.price * item.qty)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totais */}
                <div className="pt-3 mb-5" style={{ borderTop: '1px solid #E5E5E5' }}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span style={{ color: '#9E9E9E' }}>Subtotal</span>
                    <span style={{ color: '#1A1A1A' }}>R$ {formatBRL(MOCK_ORDER.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span style={{ color: '#9E9E9E' }}>Frete</span>
                    <span style={{ color: '#16A34A' }}>Grátis</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold" style={{ color: '#1A1A1A' }}>Total</span>
                    <span className="text-lg font-bold" style={{ color: '#F05A28' }}>R$ {formatBRL(total)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setPedidoConfirmado(true)}
                  className="w-full py-3 rounded-xl text-white text-sm font-semibold transition-colors"
                  style={{ background: '#F05A28' }}
                >
                  Confirmar pedido
                </button>

                <p className="text-xs text-center mt-3" style={{ color: '#9E9E9E' }}>
                  Ao confirmar, você concorda com nossos{' '}
                  <Link href="/termos" className="underline" style={{ color: '#9E9E9E' }}>Termos de Uso</Link>
                  {' '}e{' '}
                  <Link href="/privacidade" className="underline" style={{ color: '#9E9E9E' }}>Política de Privacidade</Link>.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar sticky */}
          <div style={{ width: '100%', maxWidth: '300px', flexShrink: 0 }}>
            <div
              className="rounded-xl p-4 lg:sticky"
              style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', top: '140px' }}
            >
              <h3 className="text-sm font-semibold mb-3" style={{ color: '#1A1A1A' }}>Resumo do pedido</h3>

              <div className="space-y-2 mb-3">
                {MOCK_ORDER.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex-shrink-0 rounded" style={{ width: '28px', height: '28px', background: '#F5F5F5' }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs truncate" style={{ color: '#1A1A1A' }}>{item.name}</p>
                      <p className="text-xs" style={{ color: '#9E9E9E' }}>x{item.qty}</p>
                    </div>
                    <span className="text-xs font-medium flex-shrink-0" style={{ color: '#1A1A1A' }}>
                      R$ {formatBRL(item.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 space-y-1.5" style={{ borderTop: '1px solid #E5E5E5' }}>
                <div className="flex justify-between text-xs">
                  <span style={{ color: '#9E9E9E' }}>Subtotal</span>
                  <span style={{ color: '#1A1A1A' }}>R$ {formatBRL(MOCK_ORDER.subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span style={{ color: '#9E9E9E' }}>Frete</span>
                  <span style={{ color: '#16A34A' }}>Grátis</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>Total</span>
                  <span className="text-sm font-bold" style={{ color: '#F05A28' }}>R$ {formatBRL(total)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

function StepIndicator({ current }: { current: Step }) {
  const steps: { n: Step; label: string }[] = [
    { n: 1, label: 'Endereço' },
    { n: 2, label: 'Pagamento' },
    { n: 3, label: 'Revisão' },
  ]

  return (
    <div className="flex items-center justify-center">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center">
          <div className="flex flex-col items-center" style={{ minWidth: '60px' }}>
            <div
              className="flex items-center justify-center rounded-full text-sm font-semibold"
              style={{
                width: '32px',
                height: '32px',
                background: current >= s.n ? '#F05A28' : '#F5F5F5',
                color: current >= s.n ? '#FFFFFF' : '#9E9E9E',
                border: current === s.n ? '2px solid #CC4010' : current > s.n ? '2px solid #F05A28' : '2px solid #E5E5E5',
              }}
            >
              {current > s.n ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : s.n}
            </div>
            <span
              className="text-xs mt-1 font-medium"
              style={{ color: current >= s.n ? '#F05A28' : '#9E9E9E', whiteSpace: 'nowrap' }}
            >
              {s.label}
            </span>
          </div>

          {i < steps.length - 1 && (
            <div
              style={{
                width: '64px',
                height: '2px',
                background: current > s.n ? '#F05A28' : '#E5E5E5',
                marginBottom: '20px',
                marginLeft: '4px',
                marginRight: '4px',
              }}
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
    3: 'Revisão',
  }
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center px-4"
      style={{ background: '#1A1A1A', height: '56px' }}
    >
      <Link
        href="/carrinho"
        className="flex items-center justify-center rounded-lg"
        style={{ width: '34px', height: '34px', background: '#2A2A2A' }}
        aria-label="Voltar ao carrinho"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
      </Link>

      <div className="flex-1 flex justify-center">
        <Link href="/" className="flex items-center gap-2">
          <div
            className="flex items-center justify-center rounded-lg"
            style={{ width: '30px', height: '30px', background: '#F05A28' }}
          >
            <span className="text-white font-bold text-xs">OJ</span>
          </div>
          <span className="font-bold text-white text-base">ObraJá</span>
        </Link>
      </div>

      <span className="text-sm font-medium" style={{ color: '#9E9E9E' }}>
        {labels[step]}
      </span>
    </nav>
  )
}
