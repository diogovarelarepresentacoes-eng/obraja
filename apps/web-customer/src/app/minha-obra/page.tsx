'use client'

import Link from 'next/link'
import { useState } from 'react'
import BottomNav from '../_components/BottomNav'

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Item {
  id: string
  nome: string
  categoria: string
  qtd: number
  unidade: string
  precoUnit: number
}

interface Lista {
  id: string
  nome: string
  itens: Item[]
}

// ─── Mock data ─────────────────────────────────────────────────────────────────

const INITIAL_LISTA: Lista = {
  id: 'lista-1',
  nome: 'Reforma do Banheiro',
  itens: [
    { id: 'i1', nome: 'Cimento CP-II 50 kg', categoria: 'Argamassas', qtd: 4, unidade: 'sc', precoUnit: 39.9 },
    { id: 'i2', nome: 'Rejunte branco 1 kg', categoria: 'Argamassas', qtd: 6, unidade: 'pc', precoUnit: 12.5 },
    { id: 'i3', nome: 'Porcelanato 60x60 cm', categoria: 'Revestimentos', qtd: 15, unidade: 'm²', precoUnit: 52.0 },
    { id: 'i4', nome: 'Argamassa ACII 20 kg', categoria: 'Argamassas', qtd: 8, unidade: 'sc', precoUnit: 24.9 },
    { id: 'i5', nome: 'Tinta acrílica branca 18 L', categoria: 'Tintas', qtd: 2, unidade: 'gl', precoUnit: 189.0 },
  ],
}

const UNIDADES = ['un', 'sc', 'pc', 'm²', 'gl', 'kg', 'br', 'ct', 'cx', 'bt', 'mt']

const CATEGORIAS_DISPONIVEIS = ['Argamassas', 'Revestimentos', 'Tintas', 'Elétrico', 'Hidráulico', 'Madeiras', 'Metais', 'Outros']

const SUGESTOES_MATERIAIS = [
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

// ─── Sub-components ────────────────────────────────────────────────────────────

function Logo() {
  return (
    <span className="text-xl font-black tracking-tight leading-none">
      <span className="text-white">Obra</span>
      <span style={{ color: '#F05A28' }}>Já</span>
    </span>
  )
}

function BRLFormat(valor: number) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function MinhaObraPage() {
  const [lista, setLista] = useState<Lista | null>(INITIAL_LISTA)
  const [colapsadas, setColapsadas] = useState<Set<string>>(new Set())

  // form de novo item
  const [busca, setBusca] = useState('')
  const [sugestoesFiltradas, setSugestoesFiltradas] = useState<string[]>([])
  const [novoNome, setNovoNome] = useState('')
  const [novaQtd, setNovaQtd] = useState(1)
  const [novaUnidade, setNovaUnidade] = useState('un')
  const [novaCategoria, setNovaCategoria] = useState('Outros')
  const [novoPrecoBruto, setNovoPrecoBruto] = useState('')

  // nova lista
  const [criarLista, setCriarLista] = useState(false)
  const [nomeLista, setNomeLista] = useState('')

  function handleBuscaChange(val: string) {
    setBusca(val)
    setNovoNome(val)
    if (val.length > 0) {
      setSugestoesFiltradas(
        SUGESTOES_MATERIAIS.filter((s) => s.toLowerCase().includes(val.toLowerCase())).slice(0, 5),
      )
    } else {
      setSugestoesFiltradas([])
    }
  }

  function handleSugestao(s: string) {
    setBusca(s)
    setNovoNome(s)
    setSugestoesFiltradas([])
  }

  function handleAddItem(e: React.FormEvent) {
    e.preventDefault()
    if (!novoNome.trim() || !lista) return
    const novo: Item = {
      id: `i${Date.now()}`,
      nome: novoNome.trim(),
      categoria: novaCategoria,
      qtd: novaQtd,
      unidade: novaUnidade,
      precoUnit: parseFloat(novoPrecoBruto) || 0,
    }
    setLista({ ...lista, itens: [...lista.itens, novo] })
    setBusca('')
    setNovoNome('')
    setNovaQtd(1)
    setNovaUnidade('un')
    setNovaCategoria('Outros')
    setNovoPrecoBruto('')
    setSugestoesFiltradas([])
  }

  function handleRemoverItem(id: string) {
    if (!lista) return
    setLista({ ...lista, itens: lista.itens.filter((it) => it.id !== id) })
  }

  function handleCriarLista(e: React.FormEvent) {
    e.preventDefault()
    if (!nomeLista.trim()) return
    setLista({ id: `lista-${Date.now()}`, nome: nomeLista.trim(), itens: [] })
    setNomeLista('')
    setCriarLista(false)
  }

  function toggleCategoria(cat: string) {
    setColapsadas((prev) => {
      const next = new Set(prev)
      next.has(cat) ? next.delete(cat) : next.add(cat)
      return next
    })
  }

  const totalEstimado = lista
    ? lista.itens.reduce((acc, it) => acc + it.precoUnit * it.qtd, 0)
    : 0

  // agrupar por categoria
  const grupos: Record<string, Item[]> = {}
  if (lista) {
    for (const item of lista.itens) {
      const cat = item.categoria || 'Outros'
      if (!grupos[cat]) grupos[cat] = []
      grupos[cat].push(item)
    }
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
          <Link href="/">
            <Logo />
          </Link>
          <span className="text-sm font-black text-white ml-2">Minha Obra</span>
          {lista && totalEstimado > 0 && (
            <span
              className="ml-auto text-xs font-black px-3 py-1 rounded-full"
              style={{ background: '#F05A28', color: '#fff' }}
            >
              ~{BRLFormat(totalEstimado)}
            </span>
          )}
        </div>
      </header>

      <main
        className="container-app pb-28"
        style={{ paddingTop: 'calc(var(--header-height, 56px) + 1.25rem)' }}
      >

        {/* ── Sem lista: estado vazio ── */}
        {!lista && (
          <>
            {!criarLista ? (
              <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                <div className="text-6xl mb-4">🏗️</div>
                <h2 className="text-lg font-black mb-2" style={{ color: '#1A1A1A' }}>
                  Nenhuma lista de obra
                </h2>
                <p className="text-sm mb-6" style={{ color: '#9E9E9E' }}>
                  Crie sua primeira lista de materiais e solicite orçamentos de várias lojas de uma vez.
                </p>
                <button
                  onClick={() => setCriarLista(true)}
                  className="px-6 py-3 rounded-2xl text-sm font-black text-white"
                  style={{ background: '#F05A28' }}
                >
                  + Criar primeira lista
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleCriarLista}
                className="rounded-2xl p-5"
                style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
              >
                <h2 className="text-sm font-black mb-3" style={{ color: '#1A1A1A' }}>
                  Nome da lista
                </h2>
                <input
                  type="text"
                  value={nomeLista}
                  onChange={(e) => setNomeLista(e.target.value)}
                  placeholder="Ex: Reforma do Banheiro"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none mb-3"
                  style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCriarLista(false)}
                    className="flex-1 py-3 rounded-xl text-sm font-bold"
                    style={{ background: '#F5F5F5', color: '#9E9E9E' }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl text-sm font-black text-white"
                    style={{ background: '#F05A28' }}
                  >
                    Criar lista
                  </button>
                </div>
              </form>
            )}
          </>
        )}

        {/* ── Lista existente ── */}
        {lista && (
          <>
            {/* header da lista */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: '#9E9E9E' }}>
                  Lista de materiais
                </p>
                <h1 className="text-xl font-black" style={{ color: '#1A1A1A' }}>{lista.nome}</h1>
              </div>
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: '#FFF3EE', color: '#F05A28' }}
              >
                {lista.itens.length} {lista.itens.length === 1 ? 'item' : 'itens'}
              </span>
            </div>

            {/* estado vazio da lista */}
            {lista.itens.length === 0 && (
              <div
                className="rounded-2xl p-8 flex flex-col items-center text-center mb-4"
                style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
              >
                <div className="text-4xl mb-3">📋</div>
                <p className="text-sm font-semibold mb-1" style={{ color: '#1A1A1A' }}>
                  Lista vazia
                </p>
                <p className="text-xs" style={{ color: '#9E9E9E' }}>
                  Adicione materiais usando o formulário abaixo
                </p>
              </div>
            )}

            {/* itens por categoria */}
            {Object.entries(grupos).map(([cat, itens]) => (
              <div
                key={cat}
                className="rounded-2xl mb-3 overflow-hidden"
                style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
              >
                <button
                  className="w-full flex items-center justify-between px-5 py-3.5"
                  onClick={() => toggleCategoria(cat)}
                >
                  <span className="text-sm font-black" style={{ color: '#1A1A1A' }}>{cat}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: '#F5F5F5', color: '#9E9E9E' }}>
                      {itens.length}
                    </span>
                    <svg
                      width="16" height="16" fill="none" stroke="#9E9E9E" strokeWidth="2.5" viewBox="0 0 24 24"
                      style={{ transform: colapsadas.has(cat) ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>

                {!colapsadas.has(cat) && (
                  <div style={{ borderTop: '1px solid #F5F5F5' }}>
                    {itens.map((item, idx) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 px-5 py-3"
                        style={{ borderBottom: idx < itens.length - 1 ? '1px solid #F5F5F5' : undefined }}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate" style={{ color: '#1A1A1A' }}>
                            {item.nome}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: '#9E9E9E' }}>
                            {item.qtd} {item.unidade}
                            {item.precoUnit > 0 && (
                              <span> · {BRLFormat(item.precoUnit * item.qtd)}</span>
                            )}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoverItem(item.id)}
                          className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg transition-colors hover:bg-red-50"
                          aria-label={`Remover ${item.nome}`}
                          style={{ color: '#9E9E9E' }}
                        >
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* ── Formulário adicionar item ── */}
            <div
              className="rounded-2xl p-5 mb-4"
              style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
            >
              <h2 className="text-sm font-black mb-3" style={{ color: '#1A1A1A' }}>
                + Adicionar material
              </h2>
              <form onSubmit={handleAddItem} className="space-y-3">
                {/* busca */}
                <div className="relative">
                  <input
                    type="text"
                    value={busca}
                    onChange={(e) => handleBuscaChange(e.target.value)}
                    placeholder="Nome do material..."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
                  />
                  {sugestoesFiltradas.length > 0 && (
                    <div
                      className="absolute left-0 right-0 top-full mt-1 rounded-xl overflow-hidden z-20"
                      style={{ background: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', border: '1px solid #E5E5E5' }}
                    >
                      {sugestoesFiltradas.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleSugestao(s)}
                          className="w-full text-left px-4 py-2.5 text-sm hover:bg-orange-50 transition-colors"
                          style={{ color: '#1A1A1A' }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* quantidade + unidade */}
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-xs font-semibold block mb-1" style={{ color: '#9E9E9E' }}>Qtd</label>
                    <input
                      type="number"
                      value={novaQtd}
                      onChange={(e) => setNovaQtd(Math.max(1, parseInt(e.target.value) || 1))}
                      min={1}
                      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold block mb-1" style={{ color: '#9E9E9E' }}>Unidade</label>
                    <select
                      value={novaUnidade}
                      onChange={(e) => setNovaUnidade(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
                    >
                      {UNIDADES.map((u) => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>

                {/* categoria + preço */}
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-xs font-semibold block mb-1" style={{ color: '#9E9E9E' }}>Categoria</label>
                    <select
                      value={novaCategoria}
                      onChange={(e) => setNovaCategoria(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
                    >
                      {CATEGORIAS_DISPONIVEIS.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold block mb-1" style={{ color: '#9E9E9E' }}>Preço unit. (R$)</label>
                    <input
                      type="number"
                      value={novoPrecoBruto}
                      onChange={(e) => setNovoPrecoBruto(e.target.value)}
                      placeholder="0,00"
                      min={0}
                      step="0.01"
                      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-90"
                  style={{ background: '#1A1A1A' }}
                >
                  Adicionar à lista
                </button>
              </form>
            </div>

            {/* ── CTA Solicitar orçamento ── */}
            {lista.itens.length > 0 && (
              <div
                className="rounded-2xl p-5 mb-4"
                style={{
                  background: 'linear-gradient(135deg, #F05A28 0%, #CC4010 100%)',
                  boxShadow: '0 8px 24px rgba(240,90,40,0.30)',
                }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-1">
                    <p className="text-white text-xs font-bold uppercase tracking-wider opacity-80 mb-1">
                      Tudo certo?
                    </p>
                    <p className="text-white font-black text-base leading-snug">
                      Solicite orçamentos de várias lojas ao mesmo tempo!
                    </p>
                    {totalEstimado > 0 && (
                      <p className="text-white/70 text-xs mt-1">
                        Total estimado: <strong className="text-white">{BRLFormat(totalEstimado)}</strong>
                      </p>
                    )}
                  </div>
                  <span className="text-4xl flex-shrink-0">🏪</span>
                </div>
                <Link
                  href="/orcamento"
                  className="flex items-center justify-center w-full py-3 rounded-xl text-sm font-black transition-opacity hover:opacity-90"
                  style={{ background: '#fff', color: '#F05A28' }}
                >
                  Solicitar orçamentos →
                </Link>
              </div>
            )}

            {/* ── Criar nova lista ── */}
            <button
              onClick={() => {
                if (confirm('Criar uma nova lista vai substituir a lista atual. Deseja continuar?')) {
                  setLista(null)
                  setCriarLista(true)
                }
              }}
              className="w-full py-3 rounded-2xl text-sm font-bold transition-colors"
              style={{ background: '#F5F5F5', color: '#9E9E9E', border: '1.5px dashed #D4D4D4' }}
            >
              + Criar nova lista
            </button>
          </>
        )}
      </main>

      <BottomNav active="obra" />
    </div>
  )
}
