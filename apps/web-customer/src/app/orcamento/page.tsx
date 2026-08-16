'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '../_components/BottomNav'

// ─── Types ─────────────────────────────────────────────────────────────────────

interface MaterialItem {
  id: string
  nome: string
  qtd: number
  unidade: string
}

interface Loja {
  id: string
  nome: string
  bairro: string
  distancia: string
  avaliacao: number
  produtos: number
  selecionada: boolean
}

type Prazo = 'urgente' | 'normal' | 'economico'
type Raio  = '5km' | '10km' | '20km' | '50km'

// ─── Mock data ──────────────────────────────────────────────────────────────────

const MINHA_OBRA_ITENS: MaterialItem[] = [
  { id: 'm1', nome: 'Cimento CP-II 50 kg',       qtd: 4,  unidade: 'sc' },
  { id: 'm2', nome: 'Rejunte branco 1 kg',        qtd: 6,  unidade: 'pc' },
  { id: 'm3', nome: 'Porcelanato 60x60 cm',       qtd: 15, unidade: 'm²' },
  { id: 'm4', nome: 'Argamassa ACII 20 kg',       qtd: 8,  unidade: 'sc' },
  { id: 'm5', nome: 'Tinta acrílica branca 18 L', qtd: 2,  unidade: 'gl' },
]

const LOJAS_MOCK: Loja[] = [
  { id: 'l1', nome: 'Materiais Fortaleza Ltda.', bairro: 'Maracanã',  distancia: '1,2 km', avaliacao: 4.8, produtos: 5, selecionada: true  },
  { id: 'l2', nome: 'ConstruMax Distribuição',   bairro: 'Messejana', distancia: '3,7 km', avaliacao: 4.6, produtos: 4, selecionada: true  },
  { id: 'l3', nome: 'Depósito Obra Total',        bairro: 'Parangaba', distancia: '5,1 km', avaliacao: 4.3, produtos: 3, selecionada: false },
]

const UNIDADES = ['kg', 'm²', 'un', 'sc', 'pc', 'gl', 'br', 'ct', 'cx', 'bt', 'mt', 'litro']

const PRAZO_OPTIONS: { value: Prazo; label: string; desc: string }[] = [
  { value: 'urgente',   label: 'Urgente',   desc: '1–2 dias' },
  { value: 'normal',    label: 'Normal',    desc: '3–5 dias' },
  { value: 'economico', label: 'Econômico', desc: '7+ dias'  },
]

const RAIO_OPTIONS: Raio[] = ['5km', '10km', '20km', '50km']

// ─── ProgressBar ───────────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: 1 | 2 | 3 }) {
  const steps = ['Materiais', 'Localização', 'Resultado']
  return (
    <div className="flex items-center gap-0 mb-6">
      {steps.map((label, i) => {
        const num   = i + 1
        const done  = step > num
        const active = step === num
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
                style={{
                  background: done ? '#16A34A' : active ? '#F05A28' : '#E5E5E5',
                  color: done || active ? '#fff' : '#9E9E9E',
                }}
              >
                {done ? (
                  <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : num}
              </div>
              <span
                className="text-[10px] font-semibold whitespace-nowrap"
                style={{ color: active ? '#F05A28' : done ? '#16A34A' : '#9E9E9E' }}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="flex-1 h-0.5 mx-2 mb-4"
                style={{ background: done ? '#16A34A' : '#E5E5E5' }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Etapa 1 — Materiais ───────────────────────────────────────────────────────

function StepMateriais({
  materiais,
  setMateriais,
  onNext,
}: {
  materiais: MaterialItem[]
  setMateriais: (m: MaterialItem[]) => void
  onNext: () => void
}) {
  const [novoNome, setNovoNome]     = useState('')
  const [novaQtd, setNovaQtd]       = useState(1)
  const [novaUnidade, setNovaUnidade] = useState('un')

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!novoNome.trim()) return
    setMateriais([
      ...materiais,
      { id: `m${Date.now()}`, nome: novoNome.trim(), qtd: novaQtd, unidade: novaUnidade },
    ])
    setNovoNome('')
    setNovaQtd(1)
    setNovaUnidade('un')
  }

  function handleRemove(id: string) {
    setMateriais(materiais.filter((m) => m.id !== id))
  }

  function importarObra() {
    const novos = MINHA_OBRA_ITENS.filter(
      (o) => !materiais.some((m) => m.nome === o.nome),
    ).map((o) => ({ ...o, id: `imp${o.id}` }))
    setMateriais([...materiais, ...novos])
  }

  return (
    <div>
      <h2 className="text-base font-black mb-1" style={{ color: '#1A1A1A' }}>
        Quais materiais você precisa?
      </h2>
      <p className="text-xs mb-4" style={{ color: '#9E9E9E' }}>
        Liste todos os itens para receber cotações de múltiplas lojas.
      </p>

      {/* botão importar */}
      <button
        type="button"
        onClick={importarObra}
        className="flex items-center gap-2 mb-4 px-4 py-2.5 rounded-lg text-sm font-semibold"
        style={{ border: '1.5px solid #F05A28', color: '#F05A28', background: '#FFF3EE' }}
      >
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
        Importar da Minha Obra
      </button>

      {/* tabela */}
      <div
        className="rounded-xl overflow-hidden mb-4"
        style={{ background: '#fff', border: '1px solid #E5E5E5' }}
      >
        {/* header */}
        <div
          className="grid px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider"
          style={{
            gridTemplateColumns: '1fr 64px 56px 36px',
            background: '#F5F5F5',
            borderBottom: '1px solid #E5E5E5',
            color: '#9E9E9E',
          }}
        >
          <span>Produto</span>
          <span className="text-center">Qtd</span>
          <span className="text-center">Un.</span>
          <span />
        </div>

        {materiais.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-sm" style={{ color: '#9E9E9E' }}>Nenhum material adicionado ainda.</p>
          </div>
        ) : (
          materiais.map((m, idx) => (
            <div
              key={m.id}
              className="grid items-center px-4 py-3"
              style={{
                gridTemplateColumns: '1fr 64px 56px 36px',
                background: idx % 2 === 0 ? '#fff' : '#F9F9F9',
                borderBottom: idx < materiais.length - 1 ? '1px solid #F0F0F0' : undefined,
              }}
            >
              <p className="text-sm font-medium truncate pr-2" style={{ color: '#1A1A1A' }}>{m.nome}</p>
              <p className="text-sm text-center font-semibold" style={{ color: '#1A1A1A' }}>{m.qtd}</p>
              <p className="text-xs text-center" style={{ color: '#9E9E9E' }}>{m.unidade}</p>
              <button
                onClick={() => handleRemove(m.id)}
                className="flex items-center justify-center w-7 h-7 rounded-lg mx-auto"
                aria-label={`Remover ${m.nome}`}
                style={{ color: '#9E9E9E' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#FEE2E2')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ))
        )}

        {/* linha adicionar inline */}
        <form
          onSubmit={handleAdd}
          className="grid items-end gap-2 px-4 py-3"
          style={{
            gridTemplateColumns: '1fr 64px 56px 36px',
            borderTop: '1px solid #E5E5E5',
            background: '#FAFAFA',
          }}
        >
          <input
            type="text"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            placeholder="Nome do material..."
            className="px-3 py-2 rounded-lg text-sm outline-none"
            style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
          />
          <input
            type="number"
            value={novaQtd}
            onChange={(e) => setNovaQtd(Math.max(1, parseInt(e.target.value) || 1))}
            min={1}
            className="px-2 py-2 rounded-lg text-sm text-center outline-none"
            style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
          />
          <select
            value={novaUnidade}
            onChange={(e) => setNovaUnidade(e.target.value)}
            className="px-1 py-2 rounded-lg text-sm outline-none"
            style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
          >
            {UNIDADES.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
          <button
            type="submit"
            className="w-7 h-8 flex items-center justify-center rounded-lg mx-auto"
            style={{ background: '#F05A28', color: '#fff' }}
            aria-label="Adicionar item"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </button>
        </form>
      </div>

      <button
        onClick={onNext}
        disabled={materiais.length === 0}
        className="w-full py-3.5 rounded-xl text-sm font-black text-white disabled:opacity-40"
        style={{ background: '#F05A28' }}
      >
        Próximo: Localização
      </button>
    </div>
  )
}

// ─── Etapa 2 — Localização ─────────────────────────────────────────────────────

function StepLocalizacao({
  materiais,
  lojas,
  setLojas,
  onNext,
  onBack,
}: {
  materiais: MaterialItem[]
  lojas: Loja[]
  setLojas: (l: Loja[]) => void
  onNext: (qtd: number) => void
  onBack: () => void
}) {
  const [cep, setCep]     = useState('')
  const [raio, setRaio]   = useState<Raio>('10km')
  const [prazo, setPrazo] = useState<Prazo>('normal')

  const lojasSelected = lojas.filter((l) => l.selecionada)

  function toggleLoja(id: string) {
    setLojas(lojas.map((l) => (l.id === id ? { ...l, selecionada: !l.selecionada } : l)))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!cep.trim() || lojasSelected.length === 0) return
    onNext(lojasSelected.length)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-base font-black mb-1" style={{ color: '#1A1A1A' }}>
        De onde vamos buscar os preços?
      </h2>
      <p className="text-xs mb-5" style={{ color: '#9E9E9E' }}>
        {materiais.length} {materiais.length === 1 ? 'material' : 'materiais'} na lista
      </p>

      {/* CEP */}
      <div
        className="rounded-xl p-4 mb-4"
        style={{ background: '#fff', border: '1px solid #E5E5E5' }}
      >
        <label className="text-xs font-bold block mb-2" style={{ color: '#1A1A1A' }}>
          CEP da obra
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
            placeholder="00000-000"
            required
            className="flex-1 px-4 py-3 rounded-lg text-sm outline-none"
            style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
          />
          <button
            type="button"
            className="px-4 py-3 rounded-lg text-sm font-black text-white flex-shrink-0"
            style={{ background: '#1A1A1A' }}
          >
            Localizar
          </button>
        </div>
      </div>

      {/* Raio */}
      <div
        className="rounded-xl p-4 mb-4"
        style={{ background: '#fff', border: '1px solid #E5E5E5' }}
      >
        <label className="text-xs font-bold block mb-3" style={{ color: '#1A1A1A' }}>
          Raio de busca
        </label>
        <div className="flex gap-2">
          {RAIO_OPTIONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRaio(r)}
              className="flex-1 py-2 rounded-lg text-xs font-bold"
              style={{
                background: raio === r ? '#F05A28' : '#F5F5F5',
                color: raio === r ? '#fff' : '#1A1A1A',
                border: raio === r ? '1.5px solid #F05A28' : '1.5px solid #E5E5E5',
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Lojas */}
      <div
        className="rounded-xl overflow-hidden mb-4"
        style={{ background: '#fff', border: '1px solid #E5E5E5' }}
      >
        <div
          className="px-4 py-3"
          style={{ borderBottom: '1px solid #E5E5E5', background: '#F5F5F5' }}
        >
          <p className="text-xs font-bold" style={{ color: '#1A1A1A' }}>
            Lojas próximas — {lojasSelected.length} selecionadas
          </p>
        </div>
        {lojas.map((loja, idx) => (
          <button
            key={loja.id}
            type="button"
            onClick={() => toggleLoja(loja.id)}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
            style={{
              background: idx % 2 === 0 ? '#fff' : '#F9F9F9',
              borderBottom: idx < lojas.length - 1 ? '1px solid #F0F0F0' : undefined,
            }}
          >
            {/* checkbox */}
            <div
              className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
              style={{
                background: loja.selecionada ? '#F05A28' : '#fff',
                border: `1.5px solid ${loja.selecionada ? '#F05A28' : '#D4D4D4'}`,
              }}
            >
              {loja.selecionada && (
                <svg width="10" height="10" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>

            {/* info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: '#1A1A1A' }}>
                {loja.nome}
              </p>
              <p className="text-xs mt-0.5" style={{ color: '#9E9E9E' }}>
                {loja.bairro} · {loja.distancia} · {loja.produtos} produtos disponíveis
              </p>
            </div>

            {/* rating */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-xs font-bold" style={{ color: '#1A1A1A' }}>{loja.avaliacao}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Prazo */}
      <div
        className="rounded-xl p-4 mb-5"
        style={{ background: '#fff', border: '1px solid #E5E5E5' }}
      >
        <label className="text-xs font-bold block mb-3" style={{ color: '#1A1A1A' }}>
          Prazo de entrega desejado
        </label>
        <div className="flex gap-2">
          {PRAZO_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setPrazo(opt.value)}
              className="flex-1 py-2.5 px-2 rounded-lg text-left"
              style={{
                background: prazo === opt.value ? '#FFF3EE' : '#F5F5F5',
                border: `1.5px solid ${prazo === opt.value ? '#F05A28' : '#E5E5E5'}`,
              }}
            >
              <p
                className="text-xs font-black"
                style={{ color: prazo === opt.value ? '#F05A28' : '#1A1A1A' }}
              >
                {opt.label}
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: '#9E9E9E' }}>{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* botões */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold"
          style={{ background: '#F5F5F5', color: '#9E9E9E' }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Voltar
        </button>
        <button
          type="submit"
          disabled={lojasSelected.length === 0 || !cep.trim()}
          className="flex-1 py-3.5 rounded-xl text-sm font-black text-white disabled:opacity-40"
          style={{ background: '#F05A28' }}
        >
          Solicitar orçamento para {lojasSelected.length} {lojasSelected.length === 1 ? 'loja' : 'lojas'}
        </button>
      </div>
    </form>
  )
}

// ─── Etapa 3 — Resultado ───────────────────────────────────────────────────────

function StepResultado({ qtdLojas }: { qtdLojas: number }) {
  const passos = [
    { label: 'Lojas analisam sua lista', icon: '🏪' },
    { label: 'Você recebe propostas por notificação', icon: '🔔' },
    { label: 'Compara e escolhe a melhor', icon: '✅' },
  ]

  return (
    <div className="flex flex-col items-center">

      {/* ícone sucesso */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
        style={{ background: '#F0FDF4', border: '2px solid #16A34A' }}
      >
        <svg width="36" height="36" fill="none" stroke="#16A34A" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h2 className="text-xl font-black mb-2 text-center" style={{ color: '#1A1A1A' }}>
        Orçamento solicitado!
      </h2>
      <p className="text-sm text-center mb-1" style={{ color: '#9E9E9E' }}>
        Enviamos sua lista para{' '}
        <span className="font-bold" style={{ color: '#1A1A1A' }}>
          {qtdLojas} {qtdLojas === 1 ? 'loja' : 'lojas'}
        </span>.
      </p>
      <p className="text-sm text-center mb-6" style={{ color: '#9E9E9E' }}>
        Você receberá as propostas em até{' '}
        <span className="font-bold" style={{ color: '#1A1A1A' }}>24h</span>.
      </p>

      {/* card próximos passos */}
      <div
        className="w-full rounded-xl p-5 mb-6"
        style={{ background: '#fff', border: '1px solid #E5E5E5' }}
      >
        <p className="text-sm font-black mb-4" style={{ color: '#1A1A1A' }}>
          O que acontece agora?
        </p>
        <div className="space-y-4">
          {passos.map((passo, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-base"
                style={{ background: '#FFF3EE' }}
              >
                {passo.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-black px-1.5 py-0.5 rounded"
                    style={{ background: '#F05A28', color: '#fff' }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm font-medium" style={{ color: '#1A1A1A' }}>
                    {passo.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="w-full flex flex-col gap-3">
        <Link
          href="/minha-obra"
          className="flex items-center justify-center w-full py-3.5 rounded-xl text-sm font-black text-white"
          style={{ background: '#F05A28' }}
        >
          Ver minhas obras
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center w-full py-3.5 rounded-xl text-sm font-semibold"
          style={{ background: '#F5F5F5', color: '#1A1A1A' }}
        >
          Explorar produtos
        </Link>
      </div>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function OrcamentoPage() {
  const [step, setStep]           = useState<1 | 2 | 3>(1)
  const [materiais, setMateriais] = useState<MaterialItem[]>(MINHA_OBRA_ITENS)
  const [lojas, setLojas]         = useState<Loja[]>(LOJAS_MOCK)
  const [qtdLojas, setQtdLojas]   = useState(0)

  function goToStep2() { setStep(2) }

  function goToStep3(qtd: number) {
    setQtdLojas(qtd)
    setStep(3)
  }

  return (
    <div style={{ background: '#F5F5F5', minHeight: '100vh' }}>

      {/* ── Header ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: '#1A1A1A', height: 56 }}
      >
        <div className="container-app flex items-center gap-3 h-full">
          {step < 3 ? (
            <button
              onClick={() => step === 1 ? undefined : setStep((s) => (s - 1) as 1 | 2 | 3)}
              className="flex items-center justify-center w-9 h-9 rounded-xl"
              style={{ background: '#2D2D2D' }}
              aria-label="Voltar"
            >
              {step === 1 ? (
                <Link href="/minha-obra" aria-label="Ir para Minha Obra">
                  <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ) : (
                <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ) : (
            <div className="w-9 h-9" />
          )}
          <span className="text-sm font-black text-white">
            {step === 3 ? 'Orçamento enviado' : 'Solicitar orçamento'}
          </span>
        </div>
      </header>

      <main className="container-app pb-28" style={{ paddingTop: 76 }}>
        <ProgressBar step={step} />

        {step === 1 && (
          <StepMateriais
            materiais={materiais}
            setMateriais={setMateriais}
            onNext={goToStep2}
          />
        )}

        {step === 2 && (
          <StepLocalizacao
            materiais={materiais}
            lojas={lojas}
            setLojas={setLojas}
            onNext={goToStep3}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && <StepResultado qtdLojas={qtdLojas} />}
      </main>

      {step < 3 && <BottomNav active="obra" />}
    </div>
  )
}
