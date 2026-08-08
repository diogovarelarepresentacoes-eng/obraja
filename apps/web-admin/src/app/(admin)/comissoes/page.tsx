'use client'

import { useState } from 'react'

interface CommissionRule {
  id: string
  from: string
  to: string
  min: number
  max: number
  current: number
  description: string
}

const INITIAL_RULES: CommissionRule[] = [
  { id: '1', from: 'Indústria', to: 'Loja', min: 3, max: 5, current: 4, description: 'Venda B2B de produtos fabricados para lojas de materiais' },
  { id: '2', from: 'Indústria', to: 'Construtora', min: 3, max: 5, current: 4, description: 'Venda direta de indústria para construtoras' },
  { id: '3', from: 'Loja', to: 'Construtora', min: 5, max: 8, current: 6, description: 'Venda de materiais para construtoras com faturamento' },
  { id: '4', from: 'Loja', to: 'Consumidor', min: 8, max: 12, current: 10, description: 'Venda direta ao consumidor final B2C' },
  { id: '5', from: 'Delivery Terceiro', to: 'Plataforma', min: 15, max: 20, current: 17, description: 'Comissão sobre frete cobrado por entregadores terceiros' },
]

export default function ComissoesPage() {
  const [rules, setRules] = useState<CommissionRule[]>(INITIAL_RULES)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState(0)
  const [saved, setSaved] = useState(false)

  function startEdit(rule: CommissionRule) {
    setEditingId(rule.id)
    setEditValue(rule.current)
    setSaved(false)
  }

  function saveEdit(id: string) {
    setRules(r => r.map(rule => rule.id === id ? { ...rule, current: editValue } : rule))
    setEditingId(null)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const totalRevenue = 1240000
  const avgCommission = rules.reduce((s, r) => s + r.current, 0) / rules.length
  const estimatedFee = totalRevenue * (avgCommission / 100)

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-[#1A1A1A]">Comissões</h1>
        <p className="text-[#9E9E9E] text-sm mt-1">Configure as taxas de comissão por tipo de transação</p>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#E5E5E5]">
          <div className="text-xs text-[#9E9E9E] font-medium uppercase tracking-wide mb-1">GMV do Mês</div>
          <div className="text-2xl font-black text-[#1A1A1A]">R$ 1,24M</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-[#E5E5E5]">
          <div className="text-xs text-[#9E9E9E] font-medium uppercase tracking-wide mb-1">Comissão Média</div>
          <div className="text-2xl font-black text-[#F05A28]">{avgCommission.toFixed(1)}%</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-[#E5E5E5]">
          <div className="text-xs text-[#9E9E9E] font-medium uppercase tracking-wide mb-1">Receita Estimada</div>
          <div className="text-2xl font-black text-[#22C55E]">
            {estimatedFee.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
        </div>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-green-700 text-sm font-medium flex items-center gap-2">
          ✓ Comissão atualizada com sucesso
        </div>
      )}

      {/* Commission Rules */}
      <div className="space-y-3">
        <h2 className="font-black text-[#1A1A1A]">Tabela de Comissões</h2>
        {rules.map(rule => (
          <div key={rule.id} className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#1A1A1A] bg-[#F8F8F8] border border-[#E5E5E5] px-2.5 py-1 rounded-lg">{rule.from}</span>
                    <svg width="16" height="16" fill="none" stroke="#9E9E9E" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    <span className="text-sm font-bold text-[#1A1A1A] bg-[#F8F8F8] border border-[#E5E5E5] px-2.5 py-1 rounded-lg">{rule.to}</span>
                  </div>
                  <span className="text-xs text-[#9E9E9E]">faixa: {rule.min}% – {rule.max}%</span>
                </div>
                <p className="text-sm text-[#9E9E9E]">{rule.description}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {editingId === rule.id ? (
                  <>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setEditValue(v => Math.max(rule.min, v - 0.5))} className="w-7 h-7 rounded-lg border border-[#E5E5E5] flex items-center justify-center text-[#1A1A1A] hover:border-[#F05A28] transition-colors font-bold">−</button>
                      <div className="flex items-center gap-1 w-16 text-center">
                        <input
                          type="number"
                          value={editValue}
                          onChange={e => setEditValue(Math.max(rule.min, Math.min(rule.max, Number(e.target.value))))}
                          step={0.5}
                          className="w-12 text-center text-lg font-black text-[#1A1A1A] border-0 focus:outline-none"
                        />
                        <span className="text-[#9E9E9E] font-bold">%</span>
                      </div>
                      <button onClick={() => setEditValue(v => Math.min(rule.max, v + 0.5))} className="w-7 h-7 rounded-lg border border-[#E5E5E5] flex items-center justify-center text-[#1A1A1A] hover:border-[#F05A28] transition-colors font-bold">+</button>
                    </div>
                    <button onClick={() => saveEdit(rule.id)} className="px-4 py-1.5 rounded-xl bg-[#F05A28] text-white text-xs font-bold hover:bg-[#CC4010] transition-all">Salvar</button>
                    <button onClick={() => setEditingId(null)} className="px-3 py-1.5 rounded-xl border border-[#E5E5E5] text-xs font-medium text-[#9E9E9E] hover:border-[#1A1A1A] transition-all">Cancelar</button>
                  </>
                ) : (
                  <>
                    <div className="text-center">
                      <div className="text-2xl font-black text-[#F05A28]">{rule.current}%</div>
                      <div className="text-xs text-[#9E9E9E]">taxa atual</div>
                    </div>
                    <button onClick={() => startEdit(rule)} className="px-4 py-1.5 rounded-xl border-2 border-[#E5E5E5] text-xs font-bold text-[#9E9E9E] hover:border-[#F05A28] hover:text-[#F05A28] transition-all">Editar</button>
                  </>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-[#9E9E9E] mb-1">
                <span>{rule.min}%</span>
                <span>{rule.max}%</span>
              </div>
              <div className="h-2 bg-[#F2F2F2] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F05A28] rounded-full transition-all"
                  style={{ width: `${((editingId === rule.id ? editValue : rule.current) - rule.min) / (rule.max - rule.min) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#FFF3EE] border border-[#F05A28]/20 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <span className="text-xl">ℹ️</span>
          <div className="text-sm text-[#666]">
            <span className="font-bold text-[#1A1A1A]">Como funciona o split: </span>
            A comissão é deduzida automaticamente do valor de cada transação. O vendedor recebe o valor líquido (total − comissão).
            Transações com faturamento B2B têm split processado após a liquidação do boleto/invoice.
          </div>
        </div>
      </div>
    </div>
  )
}
