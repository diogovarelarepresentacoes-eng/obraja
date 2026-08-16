'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'

const USER_TYPES = [
  {
    id: 'consumidor',
    icon: (
      <svg width="22" height="22" fill="none" stroke="#F05A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'Consumidor Final',
    description: 'Compre materiais direto na loja mais próxima',
  },
  {
    id: 'construtora',
    icon: (
      <svg width="22" height="22" fill="none" stroke="#F05A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="15" rx="1" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="17" />
        <line x1="9.5" y1="14.5" x2="14.5" y2="14.5" />
      </svg>
    ),
    title: 'Construtora',
    description: 'Compre em grande escala com preços especiais B2B',
  },
  {
    id: 'loja',
    icon: (
      <svg width="22" height="22" fill="none" stroke="#F05A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
    title: 'Loja de Materiais',
    description: 'Venda seus produtos para construtoras e consumidores',
  },
  {
    id: 'entregador',
    icon: (
      <svg width="22" height="22" fill="none" stroke="#F05A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: 'Entregador',
    description: 'Faça entregas e ganhe por cada serviço realizado',
  },
]

const BENEFITS = [
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Compra segura',
    desc: 'Transações protegidas e garantia de entrega',
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Entrega rápida',
    desc: 'Delivery próprio e rastreamento em tempo real',
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: 'Melhores preços',
    desc: 'Preços direto de fábrica e condições especiais B2B',
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
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
    confirmarSenha: '',
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
    alert('Conta criada!')
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg text-sm bg-white border border-[#E5E5E5] text-[#1A1A1A] placeholder-[#9E9E9E] outline-none focus:border-[#F05A28] focus:ring-2 focus:ring-[#F05A28]/10 transition-colors'
  const labelClass = 'block text-sm font-semibold text-[#1A1A1A] mb-1.5'

  if (step === 'type') {
    return (
      <>
        <div className="mb-8">
          <h1 className="text-2xl font-black text-[#1A1A1A] mb-2">Criar conta grátis</h1>
          <p className="text-sm text-[#9E9E9E]">Escolha seu perfil para começar</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {USER_TYPES.map(({ id, icon, title, description }) => (
            <button
              key={id}
              onClick={() => handleSelectType(id)}
              className="rounded-lg p-5 text-left border border-[#E5E5E5] bg-white hover:border-[#F05A28] hover:bg-[#FFF8F5] transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-[#FFF3EE] flex items-center justify-center mb-3">
                {icon}
              </div>
              <p className="font-bold text-sm text-[#1A1A1A] mb-1">{title}</p>
              <p className="text-xs leading-snug text-[#9E9E9E]">{description}</p>
              <span className="text-xs font-bold mt-3 block text-[#F05A28]">Selecionar →</span>
            </button>
          ))}
        </div>

        <p className="text-center text-sm mt-8 text-[#9E9E9E]">
          Já tem uma conta?{' '}
          <Link href="/login" className="font-bold text-[#F05A28] hover:text-[#CC4010] transition-colors">
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
        className="flex items-center gap-2 text-sm font-semibold mb-6 text-[#9E9E9E] hover:text-[#1A1A1A] transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Voltar
      </button>

      <div className="flex items-center gap-3 mb-6 p-4 rounded-lg border border-[#E5E5E5] bg-[#F5F5F5]">
        <div className="w-9 h-9 rounded-lg bg-[#FFF3EE] flex items-center justify-center shrink-0">
          {selected?.icon}
        </div>
        <div>
          <p className="font-bold text-sm text-[#1A1A1A]">{selected?.title}</p>
          <p className="text-xs text-[#9E9E9E]">Criar conta gratuita</p>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#1A1A1A] mb-1">Seus dados</h1>
        <p className="text-sm text-[#9E9E9E]">Preencha as informações para criar sua conta</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Nome completo</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            placeholder="Seu nome"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>E-mail</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="seu@email.com"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Telefone / WhatsApp</label>
          <input
            type="tel"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            required
            placeholder="(11) 99999-9999"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            {selectedType === 'consumidor' || selectedType === 'entregador' ? 'CPF' : 'CNPJ'}
          </label>
          <input
            type="text"
            name="documento"
            value={form.documento}
            onChange={handleChange}
            required
            placeholder={selectedType === 'consumidor' || selectedType === 'entregador' ? '000.000.000-00' : '00.000.000/0001-00'}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Senha</label>
          <input
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            required
            placeholder="Mínimo 8 caracteres"
            minLength={8}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Confirmar senha</label>
          <input
            type="password"
            name="confirmarSenha"
            value={form.confirmarSenha}
            onChange={handleChange}
            required
            placeholder="Repita a senha"
            minLength={8}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg text-sm font-bold text-white bg-[#F05A28] hover:bg-[#CC4010] transition-colors mt-2"
        >
          Criar conta
        </button>

        <p className="text-center text-xs text-[#9E9E9E]">
          Ao cadastrar, você concorda com os{' '}
          <Link href="/termos" className="underline text-[#F05A28]">Termos de Uso</Link>
          {' '}e{' '}
          <Link href="/privacidade" className="underline text-[#F05A28]">Política de Privacidade</Link>
        </p>
      </form>
    </>
  )
}

export default function CadastroPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — brand */}
      <div className="hidden lg:flex lg:w-5/12 flex-col justify-between p-12 bg-[#1A1A1A]">
        <Link href="/" aria-label="Página inicial ObraJá">
          <span className="text-2xl font-black tracking-tight">
            <span className="text-white">Obra</span>
            <span className="text-[#F05A28]">Já</span>
          </span>
        </Link>

        <div className="space-y-8">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-4 text-[#F05A28]">
              Por que se cadastrar?
            </p>
            <h2 className="text-3xl font-black leading-snug text-white">
              Faça parte do maior marketplace de construção civil do Brasil.
            </h2>
          </div>

          <div className="space-y-4">
            {BENEFITS.map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-white/5 text-[#F05A28]">
                  {icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{title}</p>
                  <p className="text-xs text-[#9E9E9E] mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-[#9E9E9E]">Cadastro 100% gratuito. Sem taxa de adesão.</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Mobile nav */}
        <nav className="flex items-center justify-between px-6 py-4 lg:hidden border-b border-[#E5E5E5]">
          <Link href="/">
            <span className="text-xl font-black tracking-tight">
              <span className="text-[#1A1A1A]">Obra</span>
              <span className="text-[#F05A28]">Já</span>
            </span>
          </Link>
          <Link
            href="/login"
            className="text-sm font-semibold px-4 py-2 rounded-lg border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
          >
            Já tenho conta
          </Link>
        </nav>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center justify-end px-10 py-5 border-b border-[#E5E5E5]">
          <span className="text-sm text-[#9E9E9E] mr-3">Já tem uma conta?</span>
          <Link
            href="/login"
            className="text-sm font-bold px-5 py-2 rounded-lg border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
          >
            Entrar
          </Link>
        </nav>

        {/* Form area */}
        <div className="flex-1 flex flex-col justify-center px-6 py-10 lg:px-12 xl:px-16 max-w-xl mx-auto w-full">
          <Suspense>
            <CadastroForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
