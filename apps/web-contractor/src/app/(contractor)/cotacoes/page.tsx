'use client'

import { useState } from 'react'

const tabs = [
  { label: 'Abertas', count: 4 },
  { label: 'Com Respostas', count: 2 },
  { label: 'Aceitas', count: 6 },
  { label: 'Encerradas', count: 12 },
]

const quotes = [
  {
    id: '#Q-041',
    title: '500 sacos Cimento + 200 cx Argamassa',
    status: 'Aberta',
    created: '30/07/2026',
    deadline: '05/08/2026',
    items: [
      { name: 'Cimento CP-II 50kg', qty: '500', unit: 'sacos' },
      { name: 'Argamassa AC-II 20kg', qty: '200', unit: 'caixas' },
      { name: 'Calafetar 300ml', qty: '50', unit: 'un' },
    ],
    responses: [
      { supplier: 'Materiais Belo', subtotal: 'R$ 23.450', delivery: '3 dias', payment: '30 dias', best: false },
      { supplier: 'DepósitoMax', subtotal: 'R$ 24.100', delivery: '2 dias', payment: 'À vista', best: false },
      { supplier: 'Indústria Ita', subtotal: 'R$ 21.900', delivery: '7 dias', payment: '60 dias', best: true },
    ],
  },
  {
    id: '#Q-040',
    title: 'Materiais hidráulicos — Kit banheiro',
    status: 'Aberta',
    created: '28/07/2026',
    deadline: '03/08/2026',
    items: [
      { name: 'Tubo PVC 50mm', qty: '30', unit: 'barras' },
      { name: 'Joelho 50mm', qty: '60', unit: 'un' },
      { name: 'Válvula de descarga', qty: '10', unit: 'un' },
    ],
    responses: [
      { supplier: 'Construfácil Sul', subtotal: 'R$ 8.700', delivery: '2 dias', payment: '30 dias', best: true },
      { supplier: 'Materiais RJ', subtotal: 'R$ 9.100', delivery: '4 dias', payment: 'À vista', best: false },
    ],
  },
  {
    id: '#Q-039',
    title: 'Tintas e impermeabilizantes',
    status: 'Aberta',
    created: '25/07/2026',
    deadline: '01/08/2026',
    items: [
      { name: 'Tinta Acrílica 18L', qty: '20', unit: 'latas' },
      { name: 'Impermeabilizante 20kg', qty: '10', unit: 'baldes' },
    ],
    responses: [],
  },
  {
    id: '#Q-038',
    title: 'Materiais elétricos — Fase 2',
    status: 'Aberta',
    created: '22/07/2026',
    deadline: '30/07/2026',
    items: [
      { name: 'Fio 2,5mm', qty: '50', unit: 'rolos' },
      { name: 'Disjuntor 20A', qty: '20', unit: 'un' },
      { name: 'Caixa de passagem 4x4', qty: '100', unit: 'un' },
    ],
    responses: [],
  },
]

type NewItem = { name: string; qty: string; unit: string }

export default function CotacoesPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [newItems, setNewItems] = useState<NewItem[]>([{ name: '', qty: '', unit: '' }])

  function addItem() {
    setNewItems((prev) => [...prev, { name: '', qty: '', unit: '' }])
  }

  function removeItem(idx: number) {
    setNewItems((prev) => prev.filter((_, i) => i !== idx))
  }

  function updateItem(idx: number, field: keyof NewItem, value: string) {
    setNewItems((prev) => prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item)))
  }

  return (
    <main className="flex-1 px-8 py-8" style={{ marginTop: 64 }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div />
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
          style={{ background: '#F1591D', color: '#fff' }}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nova Cotação
        </button>
      </div>

      {/* New Quote Form */}
      {showForm && (
        <div
          className="rounded-xl mb-6 overflow-hidden"
          style={{ background: '#fff', border: '2px solid #F1591D' }}
        >
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{ background: '#fff7f4', borderBottom: '1px solid #fde8e0' }}
          >
            <h3 className="font-bold text-base" style={{ color: '#1A1A1A' }}>
              Nova Solicitação de Cotação
            </h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-sm"
              style={{ color: '#9E9E9E' }}
            >
              ✕ Fechar
            </button>
          </div>
          <div className="p-6 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9E9E9E' }}>
                  DESCRIÇÃO DA COTAÇÃO
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Materiais para fundação — Bloco B"
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
                  style={{ background: '#F8F8F8', border: '1px solid #E5E5E5', color: '#1A1A1A' }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9E9E9E' }}>
                  PRAZO PARA RESPOSTAS
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={{ background: '#F8F8F8', border: '1px solid #E5E5E5', color: '#1A1A1A' }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold" style={{ color: '#9E9E9E' }}>
                  ITENS SOLICITADOS
                </label>
                <button
                  onClick={addItem}
                  className="text-xs font-semibold flex items-center gap-1"
                  style={{ color: '#F1591D' }}
                >
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Adicionar item
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {newItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Nome do produto"
                      value={item.name}
                      onChange={(e) => updateItem(idx, 'name', e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                      style={{ background: '#F8F8F8', border: '1px solid #E5E5E5', color: '#1A1A1A' }}
                    />
                    <input
                      type="text"
                      placeholder="Qtd"
                      value={item.qty}
                      onChange={(e) => updateItem(idx, 'qty', e.target.value)}
                      className="w-20 px-3 py-2 rounded-lg text-sm outline-none"
                      style={{ background: '#F8F8F8', border: '1px solid #E5E5E5', color: '#1A1A1A' }}
                    />
                    <input
                      type="text"
                      placeholder="Unidade"
                      value={item.unit}
                      onChange={(e) => updateItem(idx, 'unit', e.target.value)}
                      className="w-28 px-3 py-2 rounded-lg text-sm outline-none"
                      style={{ background: '#F8F8F8', border: '1px solid #E5E5E5', color: '#1A1A1A' }}
                    />
                    {newItems.length > 1 && (
                      <button
                        onClick={() => removeItem(idx)}
                        className="text-xs w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-red-50"
                        style={{ color: '#ef4444' }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ background: '#F1591D', color: '#fff' }}
              >
                Enviar para Fornecedores
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors hover:bg-gray-100"
                style={{ background: '#F2F2F2', color: '#1A1A1A' }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div
        className="flex items-center rounded-lg mb-6 overflow-hidden"
        style={{ background: '#F2F2F2', padding: 4, gap: 2, display: 'inline-flex' }}
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(i)}
            className="px-4 py-2 rounded-md text-sm font-semibold transition-colors flex items-center gap-1.5"
            style={
              activeTab === i
                ? { background: '#fff', color: '#1A1A1A', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }
                : { background: 'transparent', color: '#9E9E9E' }
            }
          >
            {tab.label}
            <span
              className="text-xs rounded-full px-1.5 py-0.5"
              style={
                activeTab === i
                  ? { background: '#F1591D', color: '#fff' }
                  : { background: '#E5E5E5', color: '#9E9E9E' }
              }
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Quote Cards */}
      <div className="flex flex-col gap-5">
        {quotes.map((quote) => (
          <div
            key={quote.id}
            className="rounded-xl overflow-hidden"
            style={{ background: '#fff', border: '1px solid #F2F2F2' }}
          >
            {/* Quote header */}
            <div
              className="px-6 py-4 flex items-start justify-between"
              style={{ background: '#F8F8F8', borderBottom: '1px solid #F2F2F2' }}
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-base" style={{ color: '#1A1A1A' }}>
                    {quote.id}
                  </span>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                    style={{ background: '#fff7ed', color: '#f97316' }}
                  >
                    {quote.status}
                  </span>
                  <span className="text-xs" style={{ color: '#9E9E9E' }}>
                    Criado em {quote.created}
                  </span>
                  <span className="text-xs" style={{ color: '#9E9E9E' }}>
                    • Prazo:{' '}
                    <span className="font-semibold" style={{ color: '#1A1A1A' }}>
                      {quote.deadline}
                    </span>
                  </span>
                </div>
                <p className="font-semibold" style={{ color: '#1A1A1A' }}>
                  {quote.title}
                </p>
              </div>
              <div className="text-sm font-semibold shrink-0 ml-4" style={{ color: '#9E9E9E' }}>
                {quote.responses.length} resposta{quote.responses.length !== 1 ? 's' : ''}
              </div>
            </div>

            <div className="px-6 py-5">
              {/* Items */}
              <div className="mb-5">
                <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#9E9E9E' }}>
                  Itens solicitados
                </div>
                <ul className="flex flex-col gap-1">
                  {quote.items.map((item) => (
                    <li key={item.name} className="flex items-center gap-2 text-sm" style={{ color: '#1A1A1A' }}>
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: '#F1591D' }}
                      />
                      {item.name} — <span className="font-semibold">{item.qty} {item.unit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Responses Table */}
              {quote.responses.length > 0 ? (
                <>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#9E9E9E' }}>
                    {quote.responses.length} Respostas recebidas
                  </div>
                  <div className="rounded-xl overflow-hidden mb-4" style={{ border: '1px solid #F2F2F2' }}>
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ background: '#F8F8F8', borderBottom: '1px solid #F2F2F2' }}>
                          <th className="text-left px-5 py-3 font-semibold text-xs uppercase tracking-wide" style={{ color: '#9E9E9E' }}>Fornecedor</th>
                          <th className="text-right px-5 py-3 font-semibold text-xs uppercase tracking-wide" style={{ color: '#9E9E9E' }}>Subtotal</th>
                          <th className="text-right px-5 py-3 font-semibold text-xs uppercase tracking-wide" style={{ color: '#9E9E9E' }}>Entrega</th>
                          <th className="text-right px-5 py-3 font-semibold text-xs uppercase tracking-wide" style={{ color: '#9E9E9E' }}>Pagamento</th>
                          <th className="text-center px-5 py-3 font-semibold text-xs uppercase tracking-wide" style={{ color: '#9E9E9E' }}>Ação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quote.responses.map((r) => (
                          <tr
                            key={r.supplier}
                            className="border-t transition-colors"
                            style={{
                              borderColor: '#F2F2F2',
                              background: r.best ? '#f0fdf4' : '#fff',
                            }}
                          >
                            <td className="px-5 py-3 font-semibold flex items-center gap-2" style={{ color: '#1A1A1A' }}>
                              {r.supplier}
                              {r.best && (
                                <span
                                  className="px-2 py-0.5 rounded-full text-xs font-semibold"
                                  style={{ background: '#dcfce7', color: '#16a34a' }}
                                >
                                  Menor preço
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-3 text-right font-bold" style={{ color: r.best ? '#16a34a' : '#1A1A1A' }}>
                              {r.subtotal}
                            </td>
                            <td className="px-5 py-3 text-right" style={{ color: '#9E9E9E' }}>
                              {r.delivery}
                            </td>
                            <td className="px-5 py-3 text-right" style={{ color: '#9E9E9E' }}>
                              {r.payment}
                            </td>
                            <td className="px-5 py-3 text-center">
                              <button
                                className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-90"
                                style={{ background: '#F1591D', color: '#fff' }}
                              >
                                Aceitar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      className="px-5 py-2 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
                      style={{ background: '#F1591D', color: '#fff' }}
                    >
                      Aceitar Melhor Preço
                    </button>
                    <button
                      className="px-5 py-2 rounded-lg font-semibold text-sm border transition-colors hover:bg-gray-50"
                      style={{ color: '#1A1A1A', borderColor: '#E5E5E5' }}
                    >
                      Encerrar Cotação
                    </button>
                  </div>
                </>
              ) : (
                <div
                  className="rounded-xl px-5 py-6 flex flex-col items-center gap-2"
                  style={{ background: '#F8F8F8', border: '1px dashed #E5E5E5' }}
                >
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#9E9E9E" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm font-medium" style={{ color: '#9E9E9E' }}>
                    Aguardando respostas dos fornecedores...
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
