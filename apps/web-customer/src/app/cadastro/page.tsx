'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'

const USER_TYPES = [
  {
    id: 'consumidor',
    emoji: '🏠',
    title: 'Consumidor Final',
    description: 'Compre materiais direto na loja mais próxima',
    color: '#F05A28',
  },
  {
    id: 'construtora',
    emoji: '🏗️',
    title: 'Construtora',
    description: 'Compre materiais em grande escala com preços especiais B2B',
    color: '#F05A28',
  },
  {
    id: 'loja',
    emoji: '🏪',
    title: 'Loja / Revenda',
    description: 'Venda seus produtos para construtoras e consumidores',
    color: '#F05A28',
  },
  {
    id: 'entregador',
    emoji: '🚚',
    title: 'Entregador',
    description: 'Faça entregas e ganhe por cada serviço realizado',
    color: '#F05A28',
  },
]

const BENEFITS = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
    title: 'Compra segura',
    desc: 'Transações protegidas e garantia de entrega',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    ),
    title: 'Entrega rápida',
    desc: 'Delivery próprio e rastreamento em tempo real',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    ),
    title: 'Melhores preços',
    desc: 'Preços direto de fábrica e condições especiais B2B',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
    ),
    title: '500+ lojas parceiras',
    desc: 'Ampla rede em todo o Brasil',
  },
]

function CadastroForm() {
  const searchParams = useSearchParams()
  const tipoParam = searchParams.get('tipo')
  const [selectedType, setSelectedType] = useState<string | null>(tipoParam)
  const [step, setStep] = useState<'type' | 'form'>(tipoParam ? 'form' : 'type')

  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    documento: '',
  })

  const selected = USER_TYPES.find((t) => t.id === selectedType)

  function handleSelectType(id: string) {
    setSelectedType(id)
    setStep('form')
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: integrate with API
    alert(`Cadastro enviado para tipo: ${selectedType}`)
  }

  if (step === 'type') {
    return (
      <>
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-2" style={{ color: '#1A1A1A' }}>
            Criar conta grátis
          </h1>
          <p className="text-sm" style={{ color: '#9E9E9E' }}>
            Escolha seu perfil para começar
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {USER_TYPES.map(({ id, emoji, title, description }) => (
            <button
              key={id}
              onClick={() => handleSelectType(id)}
              className="rounded-2xl p-5 text-left transition-all hover:scale-[1.02] group"
              style={{
                background: '#F5F5F5',
                border: '1.5px solid #E8E8E8',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#F05A28'
                e.currentTarget.style.background = '#FFF7F4'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E8E8E8'
                e.currentTarget.style.background = '#F5F5F5'
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
                style={{ background: 'rgba(240,90,40,0.1)' }}
              >
                {emoji}
              </div>
              <p className="font-black text-sm mb-1" style={{ color: '#1A1A1A' }}>{title}</p>
              <p className="text-xs leading-snug" style={{ color: '#9E9E9E' }}>{description}</p>
              <span className="text-xs font-black mt-3 block" style={{ color: '#F05A28' }}>
                Selecionar →
              </span>
            </button>
          ))}
        </div>

        <p className="text-center text-sm mt-8" style={{ color: '#9E9E9E' }}>
          Já tem uma conta?{' '}
          <Link href="/login" className="font-bold" style={{ color: '#F05A28' }}>
            Entrar
          </Link>
        </p>
      </>
    )
  }

  return (
    <>
      <button
        onClick={() => setStep('type')}
        className="flex items-center gap-2 text-sm font-bold mb-6 transition-colors"
        style={{ color: '#9E9E9E' }}
        onMouseEnter={(e) => { e.currentTarget.style.color = '#1A1A1A' }}
        onMouseLeave={(e) => { e.currentTarget.style.color = '#9E9E9E' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        Voltar
      </button>

      <div
        className="flex items-center gap-3 mb-6 p-4 rounded-2xl"
        style={{ background: '#F5F5F5', border: '1.5px solid #E8E8E8' }}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
          style={{ background: 'rgba(240,90,40,0.1)' }}
        >
          {selected?.emoji}
        </div>
        <div>
          <p className="font-black text-sm" style={{ color: '#1A1A1A' }}>{selected?.title}</p>
          <p className="text-xs" style={{ color: '#9E9E9E' }}>Criar conta gratuita</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold mb-2" style={{ color: '#1A1A1A' }}>
            Nome completo
          </label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            placeholder="Seu nome"
            className="w-full px-4 py-3.5 rounded-2xl text-sm outline-none transition-all"
            style={{ background: '#F5F5F5', border: '1.5px solid #E8E8E8', color: '#1A1A1A' }}
          />
        </div>

        <div>
          <label className="block text-xs font-bold mb-2" style={{ color: '#1A1A1A' }}>
            E-mail
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="seu@email.com"
            className="w-full px-4 py-3.5 rounded-2xl text-sm outline-none transition-all"
            style={{ background: '#F5F5F5', border: '1.5px solid #E8E8E8', color: '#1A1A1A' }}
          />
        </div>

        <div>
          <label className="block text-xs font-bold mb-2" style={{ color: '#1A1A1A' }}>
            Telefone / WhatsApp
          </label>
          <input
            type="tel"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            required
            placeholder="(11) 99999-9999"
            className="w-full px-4 py-3.5 rounded-2xl text-sm outline-none transition-all"
            style={{ background: '#F5F5F5', border: '1.5px solid #E8E8E8', color: '#1A1A1A' }}
          />
        </div>

        <div>
          <label className="block text-xs font-bold mb-2" style={{ color: '#1A1A1A' }}>
            {selectedType === 'consumidor' || selectedType === 'entregador' ? 'CPF' : 'CNPJ'}
          </label>
          <input
            type="text"
            name="documento"
            value={form.documento}
            onChange={handleChange}
            required
            placeholder={selectedType === 'consumidor' || selectedType === 'entregador' ? '000.000.000-00' : '00.000.000/0001-00'}
            className="w-full px-4 py-3.5 rounded-2xl text-sm outline-none transition-all"
            style={{ background: '#F5F5F5', border: '1.5px solid #E8E8E8', color: '#1A1A1A' }}
          />
        </div>

        <div>
          <label className="block text-xs font-bold mb-2" style={{ color: '#1A1A1A' }}>
            Senha
          </label>
          <input
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            required
            placeholder="Mínimo 8 caracteres"
            minLength={8}
            className="w-full px-4 py-3.5 rounded-2xl text-sm outline-none transition-all"
            style={{ background: '#F5F5F5', border: '1.5px solid #E8E8E8', color: '#1A1A1A' }}
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-2xl text-sm font-black text-white transition-all mt-2"
          style={{
            background: 'linear-gradient(135deg, #F05A28, #CC4010)',
            boxShadow: '0 8px 28px rgba(240,90,40,0.4)',
            cursor: 'pointer',
          }}
        >
          Criar conta gratuita →
        </button>

        <p className="text-center text-xs" style={{ color: '#9E9E9E' }}>
          Ao cadastrar, você concorda com os{' '}
          <Link href="/termos" className="underline" style={{ color: '#F05A28' }}>Termos de Uso</Link>
          {' '}e{' '}
          <Link href="/privacidade" className="underline" style={{ color: '#F05A28' }}>Política de Privacidade</Link>
        </p>
      </form>
    </>
  )
}

export default function CadastroPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — brand (hidden on mobile) */}
      <div
        className="hidden lg:flex lg:w-5/12 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: '#1A1A1A' }}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Orange glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '420px',
            height: '420px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(240,90,40,0.22) 0%, transparent 70%)',
            filter: 'blur(120px)',
          }}
        />

        {/* Top logo */}
        <div className="relative z-10">
          <Link href="/" aria-label="Página inicial ObraJá">
            <span className="text-2xl font-black tracking-tight">
              <span className="text-white">Obra</span>
              <span style={{ color: '#F05A28' }}>Já</span>
            </span>
          </Link>
        </div>

        {/* Center content */}
        <div className="relative z-10 space-y-8">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#F05A28' }}>
              Por que se cadastrar?
            </p>
            <h2 className="text-3xl font-black leading-tight text-white">
              Faça parte do maior marketplace de construção civil do Brasil.
            </h2>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            {BENEFITS.map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(240,90,40,0.15)', color: '#F05A28' }}
                >
                  {icon}
                </div>
                <div>
                  <p className="font-black text-sm text-white">{title}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#9E9E9E' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <p className="text-sm" style={{ color: '#9E9E9E' }}>
            Cadastro 100% gratuito. Sem taxa de adesão.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Mobile-only top nav */}
        <nav className="flex items-center justify-between px-6 py-4 lg:hidden">
          <Link href="/">
            <span className="text-xl font-black tracking-tight">
              <span style={{ color: '#1A1A1A' }}>Obra</span>
              <span style={{ color: '#F05A28' }}>Já</span>
            </span>
          </Link>
          <Link
            href="/login"
            className="text-sm font-semibold px-4 py-2 rounded-xl"
            style={{ color: '#1A1A1A', border: '1.5px solid #E8E8E8' }}
          >
            Já tenho conta
          </Link>
        </nav>

        {/* Desktop-only top nav */}
        <nav className="hidden lg:flex items-center justify-end px-10 py-6">
          <span className="text-sm mr-3" style={{ color: '#9E9E9E' }}>
            Já tem uma conta?
          </span>
          <Link
            href="/login"
            className="text-sm font-bold px-5 py-2.5 rounded-xl"
            style={{ color: '#1A1A1A', border: '1.5px solid #E8E8E8' }}
          >
            Entrar
          </Link>
        </nav>

        {/* Form area */}
        <div className="flex-1 flex flex-col justify-center px-6 py-8 lg:px-12 xl:px-16 max-w-xl mx-auto w-full">
          <Suspense>
            <CadastroForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
