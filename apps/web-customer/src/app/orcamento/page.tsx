'use client'

import Link from 'next/link'
import { useState } from 'react'
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
  avaliacao: number
  tempoMedio: string
  selecionada: boolean
}

type PrazoKey = 'urgente' | 'rapido' | 'normal' | 'sempressa'

const PRAZO_OPTIONS: { value: PrazoKey; label: string; desc: string }[] = [
  { value: 'urgente',   label: 'Urgente',      desc: '1–3 dias úteis' },
  { value: 'rapido',    label: 'Rápido',        desc: '3–7 dias úteis' },
  { value: 'normal',    label: 'Normal',        desc: '7–15 dias úteis' },
  { value: 'sempressa', label: 'Sem pressa',    desc: 'Acima de 15 dias' },
]

// ─── Mock data ─────────────────────────────────────────────────────────────────

const INITIAL_MATERIAIS: MaterialItem[] = [
  { id: 'm1', nome: 'Cimento CP-II 50 kg',       qtd: 4,  unidade: 'sc' },
  { id: 'm2', nome: 'Rejunte branco 1 kg',        qtd: 6,  unidade: 'pc' },
  { id: 'm3', nome: 'Porcelanato 60x60 cm',       qtd: 15, unidade: 'm²' },
  { id: 'm4', nome: 'Argamassa ACII 20 kg',       qtd: 8,  unidade: 'sc' },
  { id: 'm5', nome: 'Tinta acrílica branca 18 L', qtd: 2,  unidade: 'gl' },
]

const INITIAL_LOJAS: Loja[] = [
  { id: 'l1', nome: 'Materiais Fortaleza Ltda.',  bairro: 'Maracanã',    avaliacao: 4.8, tempoMedio: '2–4 dias',  selecionada: true  },
  { id: 'l2', nome: 'ConstruMax Distribuição',    bairro: 'Messejana',   avaliacao: 4.6, tempoMedio: '3–5 dias',  selecionada: true  },
  { id: 'l3', nome: 'Depósito Obra Total',        bairro: 'Parangaba',   avaliacao: 4.3, tempoMedio: '1–3 dias',  selecionada: false },
]

const UNIDADES = ['un', 'sc', 'pc', 'm²', 'gl', 'kg', 'br', 'ct', 'cx', 'bt', 'mt']

// ─── Helpers ───────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <span className="text-xl font-black tracking-tight leading-none">
      <span className="text-white">Obra</span>
      <span style={{ color: '#F05A28' }}>Já</span>
    </span>
  )
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

// ─── Progress Steps ────────────────────────────────────────────────────────────

function ProgressSteps({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { num: 1, label: 'Materiais' },
    { num: 2, label: 'Detalhes' },
    { num: 3, label: 'Enviado' },
  ]
  return (
    <div className="flex items-center gap-0 mb-6">
      {steps.map((s, i) => {
        const done = step > s.num
        const active = step === s.num
        return (
          <div key={s.num} className="flex items-center flex-1 last:flex-initial">
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all"
                style={{
                  background: done ? '#22C55E' : active ? '#F05A28' : '#E5E5E5',
                  color: done || active ? '#fff' : '#9E9E9E',
                }}
              >
                {done ? '✓' : s.num}
              </div>
              <span
                className="text-[10px] font-semibold whitespace-nowrap"
                style={{ color: active ? '#F05A28' : done ? '#22C55E' : '#9E9E9E' }}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="flex-1 h-0.5 mx-2 mb-4"
                style={{ background: done ? '#22C55E' : '#E5E5E5' }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Step 1: Materiais ─────────────────────────────────────────────────────────

function StepMateriais({
  materiais,
  setMateriais,
  onNext,
}: {
  materiais: MaterialItem[]
  setMateriais: (m: MaterialItem[]) => void
  onNext: () => void
}) {
  const [addingNovo, setAddingNovo] = useState(false)
  const [novoNome, setNovoNome] = useState('')
  const [novaQtd, setNovaQtd] = useState(1)
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
    setAddingNovo(false)
  }

  function handleRemove(id: string) {
    setMateriais(materiais.filter((m) => m.id !== id))
  }

  return (
    <div>
      <h2 className="text-base font-black mb-1" style={{ color: '#1A1A1A' }}>
        Materiais para orçamento
      </h2>
      <p className="text-xs mb-4" style={{ color: '#9E9E9E' }}>
        Revise os materiais importados da sua lista de obra
      </p>

      <div
        className="rounded-2xl overflow-hidden mb-4"
        style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        {/* cabeçalho */}
        <div
          className="flex gap-3 px-5 py-3 text-[11px] font-bold uppercase tracking-wider"
          style={{ background: '#F5F5F5', color: '#9E9E9E', borderBottom: '1px solid #E5E5E5' }}
        >
          <span className="flex-1">Material</span>
          <span className="w-12 text-center">Qtd</span>
          <span className="w-10 text-center">Un.</span>
          <span className="w-6" />
        </div>

        {materiais.length === 0 && (
          <div className="px-5 py-8 text-center text-sm" style={{ color: '#9E9E9E' }}>
            Nenhum material. Adicione abaixo.
          </div>
        )}

        {materiais.map((m, idx) => (
          <div
            key={m.id}
            className="flex items-center gap-3 px-5 py-3.5"
            style={{ borderBottom: idx < materiais.length - 1 ? '1px solid #F5F5F5' : undefined }}
          >
            <p className="flex-1 text-sm font-semibold truncate" style={{ color: '#1A1A1A' }}>
              {m.nome}
            </p>
            <span className="w-12 text-center text-sm font-bold" style={{ color: '#1A1A1A' }}>
              {m.qtd}
            </span>
            <span className="w-10 text-center text-xs" style={{ color: '#9E9E9E' }}>
              {m.unidade}
            </span>
            <button
              onClick={() => handleRemove(m.id)}
              className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors"
              style={{ color: '#9E9E9E' }}
              aria-label={`Remover ${m.nome}`}
            >
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* form adicionar */}
      {addingNovo ? (
        <form
          onSubmit={handleAdd}
          className="rounded-2xl p-4 mb-4"
          style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <input
            type="text"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            placeholder="Nome do material..."
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none mb-2"
            style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
            autoFocus
          />
          <div className="flex gap-2 mb-3">
            <input
              type="number"
              value={novaQtd}
              onChange={(e) => setNovaQtd(Math.max(1, parseInt(e.target.value) || 1))}
              min={1}
              placeholder="Qtd"
              className="flex-1 px-3 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
            />
            <select
              value={novaUnidade}
              onChange={(e) => setNovaUnidade(e.target.value)}
              className="flex-1 px-3 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
            >
              {UNIDADES.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAddingNovo(false)}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold"
              style={{ background: '#F5F5F5', color: '#9E9E9E' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl text-sm font-black text-white"
              style={{ background: '#1A1A1A' }}
            >
              Adicionar
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAddingNovo(true)}
          className="w-full py-3 rounded-2xl text-sm font-bold mb-4 transition-colors"
          style={{ background: '#F5F5F5', color: '#9E9E9E', border: '1.5px dashed #D4D4D4' }}
        >
          + Adicionar material
        </button>
      )}

      <button
        onClick={onNext}
        disabled={materiais.length === 0}
        className="w-full py-3.5 rounded-2xl text-sm font-black text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        style={{ background: '#F05A28' }}
      >
        Próximo: Detalhes da obra →
      </button>
    </div>
  )
}

// ─── Step 2: Detalhes ──────────────────────────────────────────────────────────

function StepDetalhes({
  materiais,
  lojas,
  setLojas,
  onNext,
  onBack,
}: {
  materiais: MaterialItem[]
  lojas: Loja[]
  setLojas: (l: Loja[]) => void
  onNext: (cep: string, prazo: PrazoKey, obs: string) => void
  onBack: () => void
}) {
  const [cep, setCep] = useState('')
  const [prazo, setPrazo] = useState<PrazoKey>('normal')
  const [obs, setObs] = useState('')

  const lojasSelected = lojas.filter((l) => l.selecionada)

  function toggleLoja(id: string) {
    setLojas(lojas.map((l) => (l.id === id ? { ...l, selecionada: !l.selecionada } : l)))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!cep.trim() || lojasSelected.length === 0) return
    onNext(cep, prazo, obs)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-base font-black mb-1" style={{ color: '#1A1A1A' }}>
        Detalhes da obra
      </h2>
      <p className="text-xs mb-4" style={{ color: '#9E9E9E' }}>
        {materiais.length} {materiais.length === 1 ? 'material' : 'materiais'} no orçamento
      </p>

      {/* CEP */}
      <div className="mb-4">
        <label className="text-xs font-bold block mb-1.5" style={{ color: '#1A1A1A' }}>
          CEP da obra *
        </label>
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
          placeholder="00000-000"
          required
          maxLength={9}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
        />
      </div>

      {/* Prazo */}
      <div className="mb-4">
        <label className="text-xs font-bold block mb-1.5" style={{ color: '#1A1A1A' }}>
          Prazo desejado *
        </label>
        <div className="grid grid-cols-2 gap-2">
          {PRAZO_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setPrazo(opt.value)}
              className="py-3 px-3 rounded-xl text-left transition-all"
              style={{
                background: prazo === opt.value ? '#FFF3EE' : '#F5F5F5',
                border: prazo === opt.value ? '2px solid #F05A28' : '2px solid transparent',
              }}
            >
              <p className="text-xs font-black" style={{ color: prazo === opt.value ? '#F05A28' : '#1A1A1A' }}>
                {opt.label}
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: '#9E9E9E' }}>{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Observações */}
      <div className="mb-5">
        <label className="text-xs font-bold block mb-1.5" style={{ color: '#1A1A1A' }}>
          Observações (opcional)
        </label>
        <textarea
          value={obs}
          onChange={(e) => setObs(e.target.value)}
          placeholder="Ex: entrega no andar, horário preferido, acesso restrito..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
          style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
        />
      </div>

      {/* Lojas */}
      <div className="mb-5">
        <h3 className="text-xs font-bold mb-2" style={{ color: '#1A1A1A' }}>
          Selecione as lojas que receberão o orçamento
        </h3>
        <div className="space-y-2">
          {lojas.map((loja) => (
            <button
              key={loja.id}
              type="button"
              onClick={() => toggleLoja(loja.id)}
              className="w-full flex items-center gap-3 p-4 rounded-2xl text-left transition-all"
              style={{
                background: loja.selecionada ? '#FFF3EE' : '#fff',
                border: loja.selecionada ? '2px solid #F05A28' : '2px solid #E5E5E5',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              {/* checkbox */}
              <div
                className="w-5 h-5 flex-shrink-0 rounded flex items-center justify-center"
                style={{
                  background: loja.selecionada ? '#F05A28' : '#E5E5E5',
                  border: loja.selecionada ? '2px solid #F05A28' : '2px solid #D4D4D4',
                }}
              >
                {loja.selecionada && (
                  <svg width="10" height="10" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              {/* loja info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate" style={{ color: '#1A1A1A' }}>
                  {loja.nome}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#9E9E9E' }}>
                  {loja.bairro} · {loja.tempoMedio}
                </p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <StarIcon />
                <span className="text-xs font-bold" style={{ color: '#1A1A1A' }}>{loja.avaliacao}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Botões */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3.5 rounded-2xl text-sm font-bold"
          style={{ background: '#F5F5F5', color: '#9E9E9E' }}
        >
          ← Voltar
        </button>
        <button
          type="submit"
          disabled={lojasSelected.length === 0 || !cep.trim()}
          className="flex-[2] py-3.5 rounded-2xl text-sm font-black text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          style={{ background: '#F05A28' }}
        >
          Enviar para {lojasSelected.length} {lojasSelected.length === 1 ? 'loja' : 'lojas'} →
        </button>
      </div>
    </form>
  )
}

// ─── Step 3: Confirmação ───────────────────────────────────────────────────────

function StepConfirmacao({ qtdLojas }: { qtdLojas: number }) {
  return (
    <div className="flex flex-col items-center text-center py-8">
      {/* ícone */}
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
        style={{ background: '#F0FDF4', border: '3px solid #22C55E' }}
      >
        <svg width="44" height="44" fill="none" stroke="#22C55E" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <span
        className="inline-block text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-4"
        style={{ background: '#F0FDF4', color: '#22C55E' }}
      >
        Orçamento enviado!
      </span>

      <h2 className="text-2xl font-black mb-2" style={{ color: '#1A1A1A' }}>
        Orçamento enviado para {qtdLojas} {qtdLojas === 1 ? 'loja' : 'lojas'}!
      </h2>
      <p className="text-sm mb-2" style={{ color: '#9E9E9E' }}>
        Você receberá as respostas em até <strong style={{ color: '#1A1A1A' }}>24 horas</strong>.
      </p>
      <p className="text-xs mb-8" style={{ color: '#9E9E9E' }}>
        Acompanhe os orçamentos recebidos na seção de pedidos.
      </p>

      {/* detalhes */}
      <div
        className="w-full rounded-2xl p-4 mb-6 text-left"
        style={{ background: '#F5F5F5', border: '1px solid #E5E5E5' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">📋</span>
          <p className="text-sm font-bold" style={{ color: '#1A1A1A' }}>O que acontece agora?</p>
        </div>
        <ul className="space-y-2 ml-1">
          {[
            'As lojas recebem sua solicitação',
            'Cada loja monta e envia seu orçamento',
            'Você compara e escolhe a melhor oferta',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs" style={{ color: '#9E9E9E' }}>
              <span
                className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-black mt-0.5"
                style={{ background: '#F05A28', color: '#fff' }}
              >
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 w-full">
        <Link
          href="/minha-obra"
          className="flex items-center justify-center w-full py-3.5 rounded-2xl text-sm font-black text-white transition-opacity hover:opacity-90"
          style={{ background: '#F05A28' }}
        >
          Ver minha obra
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center w-full py-3.5 rounded-2xl text-sm font-bold transition-colors hover:bg-gray-100"
          style={{ background: '#F5F5F5', color: '#1A1A1A' }}
        >
          Continuar comprando
        </Link>
      </div>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function OrcamentoPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [materiais, setMateriais] = useState<MaterialItem[]>(INITIAL_MATERIAIS)
  const [lojas, setLojas] = useState<Loja[]>(INITIAL_LOJAS)
  const [qtdLojasSelecionadas, setQtdLojasSelecionadas] = useState(0)

  function handleStep1Next() {
    setStep(2)
  }

  function handleStep2Next(_cep: string, _prazo: PrazoKey, _obs: string) {
    const qtd = lojas.filter((l) => l.selecionada).length
    setQtdLojasSelecionadas(qtd)
    setStep(3)
  }

  return (
    <div style={{ background: '#F5F5F5', minHeight: '100vh' }}>

      {/* ── Nav ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: '#1A1A1A', boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}
      >
        <div
          className="container-app flex items-center gap-3"
          style={{ height: 'var(--header-height, 56px)' }}
        >
          {step > 1 && step < 3 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
              className="flex items-center justify-center w-9 h-9 rounded-xl transition-colors"
              style={{ background: '#2D2D2D' }}
              aria-label="Voltar"
            >
              <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <Link href="/minha-obra">
              <Logo />
            </Link>
          )}
          <span className="text-sm font-black text-white ml-1">Solicitar Orçamento</span>
        </div>
      </header>

      <main
        className="container-app pb-28"
        style={{ paddingTop: 'calc(var(--header-height, 56px) + 1.25rem)' }}
      >
        <ProgressSteps step={step} />

        {step === 1 && (
          <StepMateriais
            materiais={materiais}
            setMateriais={setMateriais}
            onNext={handleStep1Next}
          />
        )}

        {step === 2 && (
          <StepDetalhes
            materiais={materiais}
            lojas={lojas}
            setLojas={setLojas}
            onNext={handleStep2Next}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <StepConfirmacao qtdLojas={qtdLojasSelecionadas} />
        )}
      </main>

      {step < 3 && <BottomNav active="obra" />}
    </div>
  )
}
