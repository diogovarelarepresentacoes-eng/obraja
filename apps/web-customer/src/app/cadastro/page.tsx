'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'

const USER_TYPES = [
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
    color: '#CC4010',
  },
  {
    id: 'industria',
    emoji: '🏭',
    title: 'Indústria / Fábrica',
    description: 'Distribua sua produção para lojas e construtoras',
    color: '#1A1A1A',
  },
  {
    id: 'entregador',
    emoji: '🚚',
    title: 'Entregador',
    description: 'Faça entregas e ganhe por cada serviço realizado',
    color: '#FFB800',
  },
  {
    id: 'consumidor',
    emoji: '🏠',
    title: 'Consumidor Final',
    description: 'Compre materiais direto na loja mais próxima',
    color: '#4CAF50',
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
        <h1 className="text-2xl font-black text-center mb-2" style={{ color: '#1A1A1A' }}>
          Criar conta grátis
        </h1>
        <p className="text-center text-sm mb-8" style={{ color: '#9E9E9E' }}>
          Escolha seu perfil para começar
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {USER_TYPES.map(({ id, emoji, title, description, color }) => (
            <button
              key={id}
              onClick={() => handleSelectType(id)}
              className="rounded-2xl p-5 text-left transition-all hover:scale-[1.02] hover:shadow-md"
              style={{ background: '#F5F5F5', border: `2px solid ${color}33` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
                style={{ background: `${color}15` }}
              >
                {emoji}
              </div>
              <p className="font-black text-sm mb-1" style={{ color: '#1A1A1A' }}>{title}</p>
              <p className="text-xs leading-snug" style={{ color: '#666' }}>{description}</p>
              <span className="text-xs font-black mt-3 block" style={{ color }}>
                Cadastrar →
              </span>
            </button>
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      <button
        onClick={() => setStep('type')}
        className="flex items-center gap-2 text-sm font-bold mb-6"
        style={{ color: '#9E9E9E' }}
      >
        ← Voltar
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
          style={{ background: `${selected?.color}15` }}
        >
          {selected?.emoji}
        </div>
        <div>
          <p className="font-black text-base" style={{ color: '#1A1A1A' }}>{selected?.title}</p>
          <p className="text-xs" style={{ color: '#9E9E9E' }}>Criar conta gratuita</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold mb-1.5" style={{ color: '#1A1A1A' }}>
            Nome completo
          </label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            placeholder="Seu nome"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
          />
        </div>

        <div>
          <label className="block text-xs font-bold mb-1.5" style={{ color: '#1A1A1A' }}>
            E-mail
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="seu@email.com"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
          />
        </div>

        <div>
          <label className="block text-xs font-bold mb-1.5" style={{ color: '#1A1A1A' }}>
            Telefone / WhatsApp
          </label>
          <input
            type="tel"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            required
            placeholder="(11) 99999-9999"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
          />
        </div>

        <div>
          <label className="block text-xs font-bold mb-1.5" style={{ color: '#1A1A1A' }}>
            {selectedType === 'consumidor' || selectedType === 'entregador' ? 'CPF' : 'CNPJ'}
          </label>
          <input
            type="text"
            name="documento"
            value={form.documento}
            onChange={handleChange}
            required
            placeholder={selectedType === 'consumidor' || selectedType === 'entregador' ? '000.000.000-00' : '00.000.000/0001-00'}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
          />
        </div>

        <div>
          <label className="block text-xs font-bold mb-1.5" style={{ color: '#1A1A1A' }}>
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
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-2xl text-sm font-black text-white transition-all hover:scale-[1.02] mt-2"
          style={{ background: 'linear-gradient(135deg, #F05A28, #CC4010)', boxShadow: '0 8px 24px rgba(240,90,40,0.35)' }}
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
    <div style={{ background: '#F5F5F5', minHeight: '100vh' }}>
      <header
        className="sticky top-0 z-50"
        style={{ background: '#1A1A1A', boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}
      >
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between" style={{ height: '64px' }}>
          <Link href="/">
            <span className="text-xl font-black tracking-tight">
              <span className="text-white">Obra</span>
              <span style={{ color: '#F05A28' }}>Já</span>
            </span>
          </Link>
          <Link
            href="/login"
            className="text-sm font-semibold px-4 py-2 rounded-xl"
            style={{ color: '#fff', border: '1px solid #3D3D3D' }}
          >
            Já tenho conta
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-10">
        <div
          className="rounded-3xl p-6 sm:p-8"
          style={{ background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
        >
          <Suspense>
            <CadastroForm />
          </Suspense>
        </div>

        <p className="text-center text-sm mt-6" style={{ color: '#9E9E9E' }}>
          Já tem uma conta?{' '}
          <Link href="/login" className="font-bold" style={{ color: '#F05A28' }}>
            Entrar
          </Link>
        </p>
      </main>
    </div>
  )
}
