'use client'

import { useState } from 'react'

type InvoiceStatus = 'pago' | 'pendente' | 'vencido' | 'em_aberto'

interface Invoice {
  id: string
  orderId: string
  supplier: string
  amount: number
  issuedAt: string
  dueDate: string
  paidAt?: string
  status: InvoiceStatus
  method: string
}

const INVOICES: Invoice[] = [
  { id: 'NF-001892', orderId: '#2891', supplier: 'Materiais Belo', amount: 15950.00, issuedAt: '2026-08-01', dueDate: '2026-08-31', status: 'pendente', method: 'invoice' },
  { id: 'NF-001875', orderId: '#2888', supplier: 'Materiais Belo', amount: 7500.00, issuedAt: '2026-07-27', dueDate: '2026-08-26', status: 'pendente', method: 'invoice' },
  { id: 'NF-001834', orderId: '#2887', supplier: 'Ind. Votorantim', amount: 61800.00, issuedAt: '2026-07-20', dueDate: '2026-08-19', status: 'pendente', method: 'invoice' },
  { id: 'NF-001820', orderId: '#2885', supplier: 'DepósitoMax', amount: 24000.00, issuedAt: '2026-07-15', dueDate: '2026-08-14', status: 'em_aberto', method: 'invoice' },
  { id: 'NF-001801', orderId: '#2883', supplier: 'Ind. Itambé', amount: 29800.00, issuedAt: '2026-07-08', dueDate: '2026-08-07', status: 'vencido', method: 'invoice' },
  { id: 'NF-001788', orderId: '#2882', supplier: 'Construfácil Sul', amount: 6200.00, issuedAt: '2026-07-04', dueDate: '2026-08-03', status: 'vencido', method: 'invoice' },
  { id: 'NF-001765', orderId: '#2880', supplier: 'DepósitoMax', amount: 59885.00, issuedAt: '2026-06-28', dueDate: '2026-07-28', status: 'pago', paidAt: '2026-07-25', method: 'invoice' },
  { id: 'NF-001744', orderId: '#2879', supplier: 'Materiais RJ', amount: 18400.00, issuedAt: '2026-06-20', dueDate: '2026-07-20', status: 'pago', paidAt: '2026-07-18', method: 'invoice' },
]

const STATUS_MAP: Record<InvoiceStatus, { label: string; color: string; bg: string; border: string }> = {
  pago: { label: 'Pago', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
  pendente: { label: 'Pendente', color: '#b45309', bg: '#fffbeb', border: '#fde68a' },
  vencido: { label: 'Vencido', color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
  em_aberto: { label: 'Em Aberto', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
}

const PRIMARY = '#F1591D'

export default function FinanceiroPage() {
  const [statusFilter, setStatusFilter] = useState<'all' | InvoiceStatus>('all')

  const filtered = INVOICES.filter(inv => statusFilter === 'all' || inv.status === statusFilter)

  const totalPendente = INVOICES.filter(i => i.status === 'pendente' || i.status === 'em_aberto').reduce((s, i) => s + i.amount, 0)
  const totalVencido = INVOICES.filter(i => i.status === 'vencido').reduce((s, i) => s + i.amount, 0)
  const totalMes = INVOICES.filter(i => i.issuedAt.startsWith('2026-08')).reduce((s, i) => s + i.amount, 0)
  const limiteCredito = 200000

  const currency = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <main className="flex-1 px-8 py-8" style={{ marginTop: 64 }}>
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {[
          { label: 'Gasto em Agosto', value: currency(totalMes), sub: 'mês atual', color: PRIMARY },
          { label: 'A Pagar', value: currency(totalPendente), sub: `${INVOICES.filter(i => i.status === 'pendente' || i.status === 'em_aberto').length} faturas`, color: '#b45309' },
          { label: 'Em Atraso', value: currency(totalVencido), sub: `${INVOICES.filter(i => i.status === 'vencido').length} faturas vencidas`, color: '#dc2626' },
          { label: 'Limite de Crédito', value: currency(limiteCredito), sub: 'Faturamento 30/60/90 dias', color: '#16a34a' },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-2xl p-5 border" style={{ borderColor: '#F2F2F2' }}>
            <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#9E9E9E' }}>{c.label}</div>
            <div className="text-2xl font-black" style={{ color: c.color }}>{c.value}</div>
            <div className="text-xs mt-1" style={{ color: '#9E9E9E' }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Overdue alert */}
      {totalVencido > 0 && (
        <div className="mb-6 rounded-2xl px-5 py-4 border flex items-start gap-3" style={{ background: '#fef2f2', borderColor: '#fecaca' }}>
          <span className="text-xl mt-0.5">⚠️</span>
          <div>
            <div className="font-bold text-sm" style={{ color: '#dc2626' }}>Faturas vencidas detectadas</div>
            <div className="text-sm" style={{ color: '#666' }}>
              Você possui {currency(totalVencido)} em faturas vencidas. Entre em contato com os fornecedores para regularizar.
            </div>
          </div>
        </div>
      )}

      {/* Filter + Table */}
      <div className="bg-white rounded-2xl border" style={{ borderColor: '#F2F2F2' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#F2F2F2' }}>
          <div className="font-bold text-lg" style={{ color: '#1A1A1A' }}>Faturas e Notas Fiscais</div>
          <div className="flex gap-1">
            {([['all', 'Todas'], ['pendente', 'Pendentes'], ['vencido', 'Vencidas'], ['pago', 'Pagas']] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                style={statusFilter === key ? { background: '#1A1A1A', color: '#fff' } : { color: '#9E9E9E' }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #F2F2F2' }}>
                {['Nota Fiscal', 'Pedido', 'Fornecedor', 'Valor', 'Emissão', 'Vencimento', 'Status', 'Ações'].map(h => (
                  <th key={h} className="text-left text-xs font-bold uppercase tracking-wide px-6 py-3" style={{ color: '#9E9E9E' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv, i) => {
                const st = STATUS_MAP[inv.status]
                return (
                  <tr key={inv.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F8F8F8' : 'none' }}
                    className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono font-bold" style={{ color: '#1A1A1A' }}>{inv.id}</td>
                    <td className="px-6 py-4 text-sm font-medium" style={{ color: '#1A1A1A' }}>{inv.orderId}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#666' }}>{inv.supplier}</td>
                    <td className="px-6 py-4 text-sm font-bold" style={{ color: '#1A1A1A' }}>{currency(inv.amount)}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#9E9E9E' }}>{new Date(inv.issuedAt).toLocaleDateString('pt-BR')}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: inv.status === 'vencido' ? '#dc2626' : '#9E9E9E', fontWeight: inv.status === 'vencido' ? 700 : 400 }}>
                      {new Date(inv.dueDate).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                        style={{ color: st.color, background: st.bg, borderColor: st.border }}>
                        {st.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button className="text-xs font-bold hover:underline" style={{ color: PRIMARY }}>Baixar NF</button>
                        {(inv.status === 'pendente' || inv.status === 'vencido') && (
                          <button className="text-xs font-bold hover:underline" style={{ color: '#16a34a' }}>Pagar</button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t flex items-center justify-between" style={{ borderColor: '#F2F2F2' }}>
          <span className="text-sm" style={{ color: '#9E9E9E' }}>{filtered.length} fatura{filtered.length !== 1 ? 's' : ''}</span>
          <span className="text-sm font-bold" style={{ color: '#1A1A1A' }}>
            Total filtrado: {currency(filtered.reduce((s, i) => s + i.amount, 0))}
          </span>
        </div>
      </div>

      {/* Credit info */}
      <div className="mt-6 rounded-2xl px-5 py-4 border flex items-start gap-3" style={{ background: '#fff7ed', borderColor: '#fed7aa' }}>
        <span className="text-xl mt-0.5">💡</span>
        <div className="text-sm" style={{ color: '#666' }}>
          <span className="font-bold" style={{ color: '#1A1A1A' }}>Faturamento habilitado: </span>
          Sua conta tem crédito aprovado de até {currency(limiteCredito)} com prazo de 30/60/90 dias.
          Para aumentar seu limite, entre em contato com o suporte ObraJá.
        </div>
      </div>
    </main>
  )
}
