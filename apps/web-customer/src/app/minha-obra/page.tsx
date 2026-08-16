'use client'

import Link from 'next/link'
import { useState } from 'react'
import BottomNav from '../_components/BottomNav'

// ─── Types ─────────────────────────────────────────────────────────────────────

type StatusItem = 'comprado' | 'pendente' | 'nao-iniciado'

interface Item {
  id: string
  nome: string
  qtd: number
  unidade: string
  status: StatusItem
}

interface Projeto {
  id: string
  nome: string
  dataCriacao: string
  itens: Item[]
}

// ─── Mock data ──────────────────────────────────────────────────────────────────

const PROJETOS: Projeto[] = [
  {
    id: 'p1',
    nome: 'Reforma do Banheiro',
    dataCriacao: '10/07/2025',
    itens: [
      { id: 'i1', nome: 'Cimento CP-II 50 kg',         qtd: 4,  unidade: 'sc',  status: 'comprado' },
      { id: 'i2', nome: 'Rejunte branco 1 kg',          qtd: 6,  unidade: 'pc',  status: 'comprado' },
      { id: 'i3', nome: 'Porcelanato 60x60 cm',         qtd: 15, unidade: 'm²',  status: 'pendente' },
      { id: 'i4', nome: 'Argamassa ACII 20 kg',         qtd: 8,  unidade: 'sc',  status: 'pendente' },
      { id: 'i5', nome: 'Tinta acrílica branca 18 L',   qtd: 2,  unidade: 'gl',  status: 'nao-iniciado' },
      { id: 'i6', nome: 'Tubo PVC 100mm 6m',            qtd: 3,  unidade: 'un',  status: 'nao-iniciado' },
      { id: 'i7', nome: 'Impermeabilizante 18 L',       qtd: 1,  unidade: 'gl',  status: 'nao-iniciado' },
    ],
  },
  {
    id: 'p2',
    nome: 'Muro do Fundo',
    dataCriacao: '02/08/2025',
    itens: [
      { id: 'i8',  nome: 'Tijolo 9 furos (cento)',      qtd: 3,  unidade: 'ct',  status: 'pendente' },
      { id: 'i9',  nome: 'Cimento CP-II 50 kg',         qtd: 6,  unidade: 'sc',  status: 'nao-iniciado' },
      { id: 'i10', nome: 'Areia média 20 kg',           qtd: 10, unidade: 'sc',  status: 'nao-iniciado' },
      { id: 'i11', nome: 'Vergalhão CA-50 8mm',         qtd: 4,  unidade: 'br',  status: 'nao-iniciado' },
      { id: 'i12', nome: 'Arame recozido 1 kg',         qtd: 2,  unidade: 'kg',  status: 'nao-iniciado' },
    ],
  },
]

const SUGESTOES = [
  'Cimento CP-II 50 kg',
  'Areia média 20 kg',
  'Tijolo 9 furos (cento)',
  'Vergalhão CA-50 8mm',
  'Porcelanato 60x60 cm',
  'Tinta acrílica 18 L',
  'Rejunte 1 kg',
  'Argamassa ACII 20 kg',
  'Fio elétrico 2,5mm 100m',
  'Tubo PVC 100mm 6m',
]

const UNIDADES = ['kg', 'm²', 'un', 'sc', 'pc', 'gl', 'br', 'ct', 'cx', 'bt', 'mt', 'litro']

// ─── Helpers ───────────────────────────────────────────────────────────────────

function brl(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const STATUS_CONFIG: Record<StatusItem, { label: string; color: string; bg: string }> = {
  'comprado':     { label: 'Comprado',     color: '#16A34A', bg: '#F0FDF4' },
  'pendente':     { label: 'Pendente',     color: '#F05A28', bg: '#FFF3EE' },
  'nao-iniciado': { label: 'Não iniciado', color: '#9E9E9E', bg: '#F5F5F5' },
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function MinhaObraPage() {
  const [projetos, setProjetos]       = useState<Projeto[]>(PROJETOS)
  const [projetoId, setProjetoId]     = useState<string>(PROJETOS[0].id)
  const [mostraForm, setMostraForm]   = useState(false)
  const [buscaItem, setBuscaItem]     = useState('')
  const [sugestoes, setSugestoes]     = useState<string[]>([])
  const [novoNome, setNovoNome]       = useState('')
  const [novaQtd, setNovaQtd]         = useState(1)
  const [novaUnidade, setNovaUnidade] = useState('un')

  const projeto = projetos.find((p) => p.id === projetoId) ?? projetos[0]
  const comprados   = projeto.itens.filter((i) => i.status === 'comprado').length
  const total       = projeto.itens.length
  const progresso   = total > 0 ? Math.round((comprados / total) * 100) : 0

  function handleBusca(val: string) {
    setBuscaItem(val)
    setNovoNome(val)
    setSugestoes(
      val.length > 0
        ? SUGESTOES.filter((s) => s.toLowerCase().includes(val.toLowerCase())).slice(0, 5)
        : [],
    )
  }

  function handleSugestao(s: string) {
    setBuscaItem(s)
    setNovoNome(s)
    setSugestoes([])
  }

  function handleAddItem(e: React.FormEvent) {
    e.preventDefault()
    if (!novoNome.trim()) return
    const novoItem: Item = {
      id: `i${Date.now()}`,
      nome: novoNome.trim(),
      qtd: novaQtd,
      unidade: novaUnidade,
      status: 'nao-iniciado',
    }
    setProjetos(projetos.map((p) =>
      p.id === projetoId ? { ...p, itens: [...p.itens, novoItem] } : p,
    ))
    setBuscaItem('')
    setNovoNome('')
    setNovaQtd(1)
    setNovaUnidade('un')
    setSugestoes([])
    setMostraForm(false)
  }

  function handleToggleStatus(itemId: string) {
    setProjetos(projetos.map((p) => {
      if (p.id !== projetoId) return p
      return {
        ...p,
        itens: p.itens.map((it) => {
          if (it.id !== itemId) return it
          const next: StatusItem = it.status === 'comprado' ? 'pendente' : 'comprado'
          return { ...it, status: next }
        }),
      }
    }))
  }

  return (
    <div style={{ background: '#F5F5F5', minHeight: '100vh' }}>

      {/* ── Header ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: '#1A1A1A', height: 56 }}
      >
        <div className="container-app flex items-center gap-3 h-full">
          <Link
            href="/"
            className="flex items-center justify-center w-9 h-9 rounded-xl"
            style={{ background: '#2D2D2D' }}
            aria-label="Voltar"
          >
            <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <span className="text-sm font-black text-white">Minha Obra</span>
          <Link
            href="#nova-obra"
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ border: '1.5px solid #F05A28', color: '#F05A28' }}
          >
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
            Nova obra
          </Link>
        </div>
      </header>

      <main className="container-app pb-28" style={{ paddingTop: 76 }}>

        {/* ── Seletor de projeto ── */}
        <div className="mb-4">
          <label className="text-[11px] font-bold uppercase tracking-wider block mb-1.5" style={{ color: '#9E9E9E' }}>
            Projeto
          </label>
          <select
            value={projetoId}
            onChange={(e) => setProjetoId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm font-semibold outline-none appearance-none"
            style={{
              background: '#fff',
              border: '1.5px solid #E5E5E5',
              color: '#1A1A1A',
            }}
          >
            {projetos.map((p) => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </select>
        </div>

        {/* ── Cabeçalho do projeto ── */}
        <div
          className="rounded-xl p-5 mb-4 flex items-start justify-between gap-3"
          style={{ background: '#fff', border: '1px solid #E5E5E5' }}
        >
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-black leading-tight mb-0.5" style={{ color: '#1A1A1A' }}>
              {projeto.nome}
            </h1>
            <p className="text-xs" style={{ color: '#9E9E9E' }}>
              Criado em {projeto.dataCriacao}
            </p>
          </div>
          <Link
            href="/orcamento"
            className="flex-shrink-0 px-4 py-2 rounded-lg text-xs font-black text-white"
            style={{ background: '#F05A28' }}
          >
            Pedir orçamento
          </Link>
        </div>

        {/* ── Progresso ── */}
        <div
          className="rounded-xl px-5 py-4 mb-4"
          style={{ background: '#fff', border: '1px solid #E5E5E5' }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>
              {comprados} de {total} itens comprados
            </p>
            <span className="text-sm font-black" style={{ color: '#F05A28' }}>{progresso}%</span>
          </div>
          <div className="w-full rounded-full overflow-hidden" style={{ height: 8, background: '#F5F5F5' }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progresso}%`, background: '#F05A28' }}
            />
          </div>
        </div>

        {/* ── Tabela de materiais ── */}
        <div
          className="rounded-xl overflow-hidden mb-4"
          style={{ background: '#fff', border: '1px solid #E5E5E5' }}
        >
          {/* cabeçalho da tabela */}
          <div
            className="grid px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider"
            style={{
              gridTemplateColumns: '1fr 72px 60px 100px 80px',
              background: '#F5F5F5',
              borderBottom: '1px solid #E5E5E5',
              color: '#9E9E9E',
            }}
          >
            <span>Produto</span>
            <span className="text-center">Qtd</span>
            <span className="text-center">Un.</span>
            <span className="text-center">Status</span>
            <span className="text-center">Ação</span>
          </div>

          {/* linhas */}
          {projeto.itens.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <p className="text-sm" style={{ color: '#9E9E9E' }}>Nenhum item neste projeto.</p>
            </div>
          ) : (
            projeto.itens.map((item, idx) => {
              const st = STATUS_CONFIG[item.status]
              const rowBg = idx % 2 === 0 ? '#fff' : '#F9F9F9'
              return (
                <div
                  key={item.id}
                  className="grid items-center px-4 py-3"
                  style={{
                    gridTemplateColumns: '1fr 72px 60px 100px 80px',
                    background: rowBg,
                    borderBottom: idx < projeto.itens.length - 1 ? '1px solid #F0F0F0' : undefined,
                  }}
                >
                  <p className="text-sm font-medium truncate pr-2" style={{ color: '#1A1A1A' }}>
                    {item.nome}
                  </p>
                  <p className="text-sm text-center font-semibold" style={{ color: '#1A1A1A' }}>
                    {item.qtd}
                  </p>
                  <p className="text-xs text-center" style={{ color: '#9E9E9E' }}>
                    {item.unidade}
                  </p>
                  <div className="flex justify-center">
                    <span
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ color: st.color, background: st.bg }}
                    >
                      {st.label}
                    </span>
                  </div>
                  <div className="flex justify-center">
                    {item.status === 'comprado' ? (
                      <button
                        onClick={() => handleToggleStatus(item.id)}
                        className="flex items-center gap-1 text-xs font-semibold"
                        style={{ color: '#16A34A' }}
                        aria-label="Marcar como pendente"
                      >
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Comprado
                      </button>
                    ) : (
                      <button
                        onClick={() => handleToggleStatus(item.id)}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                        style={{ color: '#F05A28', border: '1px solid #F05A28' }}
                      >
                        Comprar
                      </button>
                    )}
                  </div>
                </div>
              )
            })
          )}

          {/* rodapé total estimado */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ background: '#F9F9F9', borderTop: '1px solid #E5E5E5' }}
          >
            <p className="text-xs font-semibold" style={{ color: '#9E9E9E' }}>
              Total estimado (preço médio de mercado)
            </p>
            <p className="text-sm font-black" style={{ color: '#1A1A1A' }}>
              {brl(1_580)}
            </p>
          </div>
        </div>

        {/* ── Adicionar item ── */}
        {!mostraForm ? (
          <button
            onClick={() => setMostraForm(true)}
            className="w-full py-3 rounded-xl text-sm font-bold mb-4"
            style={{
              border: '1.5px dashed #D4D4D4',
              background: '#fff',
              color: '#9E9E9E',
            }}
          >
            + Adicionar item
          </button>
        ) : (
          <div
            className="rounded-xl p-5 mb-4"
            style={{ background: '#fff', border: '1px solid #E5E5E5' }}
          >
            <h2 className="text-sm font-black mb-4" style={{ color: '#1A1A1A' }}>
              Adicionar material
            </h2>
            <form onSubmit={handleAddItem} className="space-y-3">
              {/* busca com autocomplete */}
              <div className="relative">
                <label className="text-xs font-semibold block mb-1" style={{ color: '#9E9E9E' }}>
                  Produto
                </label>
                <input
                  type="text"
                  value={buscaItem}
                  onChange={(e) => handleBusca(e.target.value)}
                  placeholder="Buscar material..."
                  autoFocus
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                  style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
                />
                {sugestoes.length > 0 && (
                  <div
                    className="absolute left-0 right-0 top-full mt-1 rounded-xl z-20 overflow-hidden"
                    style={{ background: '#fff', border: '1px solid #E5E5E5', boxShadow: '0 4px 12px rgba(0,0,0,0.10)' }}
                  >
                    {sugestoes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleSugestao(s)}
                        className="w-full text-left px-4 py-2.5 text-sm transition-colors"
                        style={{ color: '#1A1A1A', borderBottom: '1px solid #F5F5F5' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#FFF3EE')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* quantidade + unidade */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold block mb-1" style={{ color: '#9E9E9E' }}>Quantidade</label>
                  <input
                    type="number"
                    value={novaQtd}
                    onChange={(e) => setNovaQtd(Math.max(1, parseInt(e.target.value) || 1))}
                    min={1}
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                    style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1" style={{ color: '#9E9E9E' }}>Unidade</label>
                  <select
                    value={novaUnidade}
                    onChange={(e) => setNovaUnidade(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                    style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
                  >
                    {UNIDADES.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>

              {/* botões */}
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => { setMostraForm(false); setBuscaItem(''); setNovoNome(''); setSugestoes([]) }}
                  className="flex-1 py-3 rounded-lg text-sm font-semibold"
                  style={{ background: '#F5F5F5', color: '#9E9E9E' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-lg text-sm font-black text-white"
                  style={{ background: '#F05A28' }}
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── CTA orçamento ── */}
        {projeto.itens.length > 0 && (
          <Link
            href="/orcamento"
            className="flex items-center justify-between w-full px-5 py-4 rounded-xl text-sm font-black text-white"
            style={{ background: '#1A1A1A' }}
          >
            <span>Solicitar orçamento para esta obra</span>
            <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        )}
      </main>

      <BottomNav active="obra" />
    </div>
  )
}
