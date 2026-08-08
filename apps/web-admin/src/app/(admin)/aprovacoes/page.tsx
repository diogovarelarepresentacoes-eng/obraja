'use client'

import { useState } from 'react'
import Link from 'next/link'

type ApprovalStatus = 'pending' | 'approved' | 'rejected'
type EntityType = 'store' | 'industry' | 'contractor' | 'delivery'

interface Approval {
  id: string
  type: EntityType
  name: string
  cnpj?: string
  cpf?: string
  email: string
  phone: string
  city: string
  state: string
  submittedAt: string
  status: ApprovalStatus
  docsCount: number
}

const MOCK: Approval[] = [
  { id: '1', type: 'store', name: 'Materiais São Paulo Ltda', cnpj: '12.345.678/0001-90', email: 'contato@matsaopaulo.com.br', phone: '(11) 98765-4321', city: 'São Paulo', state: 'SP', submittedAt: '2026-08-02', status: 'pending', docsCount: 2 },
  { id: '2', type: 'industry', name: 'Cimento Rio Grande S.A.', cnpj: '98.765.432/0001-10', email: 'comercial@cimentorg.com.br', phone: '(51) 99887-6543', city: 'Porto Alegre', state: 'RS', submittedAt: '2026-08-02', status: 'pending', docsCount: 3 },
  { id: '3', type: 'contractor', name: 'Construtora BH Norte Ltda', cnpj: '55.444.333/0001-22', email: 'obras@bhnorte.com.br', phone: '(31) 97654-3210', city: 'Belo Horizonte', state: 'MG', submittedAt: '2026-08-01', status: 'pending', docsCount: 1 },
  { id: '4', type: 'delivery', name: 'Carlos Souza Oliveira', cpf: '123.456.789-09', email: 'carlos.entregador@gmail.com', phone: '(11) 97890-1234', city: 'São Paulo', state: 'SP', submittedAt: '2026-08-02', status: 'pending', docsCount: 5 },
  { id: '5', type: 'delivery', name: 'Ana Paula Ferreira', cpf: '987.654.321-00', email: 'anapaula.delivery@email.com', phone: '(21) 96543-2109', city: 'Rio de Janeiro', state: 'RJ', submittedAt: '2026-08-01', status: 'pending', docsCount: 5 },
  { id: '6', type: 'store', name: 'Tintas do Sul Distribuidora', cnpj: '11.222.333/0001-44', email: 'tintassul@email.com', phone: '(48) 96543-2109', city: 'Florianópolis', state: 'SC', submittedAt: '2026-08-01', status: 'pending', docsCount: 2 },
  { id: '7', type: 'industry', name: 'Cerâmica Nordeste Fábrica', cnpj: '77.888.999/0001-55', email: 'fab@ceramicanordeste.com', phone: '(81) 95432-1098', city: 'Recife', state: 'PE', submittedAt: '2026-07-31', status: 'pending', docsCount: 2 },
  { id: '8', type: 'store', name: 'Ferragens Belo Horizonte', cnpj: '33.444.555/0001-66', email: 'ferragembh@email.com', phone: '(31) 94321-0987', city: 'Belo Horizonte', state: 'MG', submittedAt: '2026-07-30', status: 'approved', docsCount: 2 },
  { id: '9', type: 'delivery', name: 'Roberto Lima Santos', cpf: '456.789.012-34', email: 'roberto.moto@email.com', phone: '(31) 93210-9876', city: 'Belo Horizonte', state: 'MG', submittedAt: '2026-07-29', status: 'rejected', docsCount: 5 },
]

const TABS = [
  { key: 'all', label: 'Todos' },
  { key: 'store', label: 'Lojas' },
  { key: 'industry', label: 'Indústrias' },
  { key: 'contractor', label: 'Construtoras' },
  { key: 'delivery', label: 'Entregadores' },
]

const STATUS_FILTER = [
  { key: 'all', label: 'Todos' },
  { key: 'pending', label: 'Pendente' },
  { key: 'approved', label: 'Aprovado' },
  { key: 'rejected', label: 'Rejeitado' },
]

const TYPE_LABEL: Record<EntityType, string> = {
  store: 'Loja', industry: 'Indústria', contractor: 'Construtora', delivery: 'Entregador',
}
const TYPE_COLOR: Record<EntityType, string> = {
  store: 'bg-[#FFF3EE] text-[#F05A28]',
  industry: 'bg-blue-50 text-blue-700',
  contractor: 'bg-purple-50 text-purple-700',
  delivery: 'bg-green-50 text-green-700',
}
const STATUS_BADGE: Record<ApprovalStatus, string> = {
  pending: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  approved: 'bg-green-50 text-green-700 border border-green-200',
  rejected: 'bg-red-50 text-red-700 border border-red-200',
}
const STATUS_LABEL: Record<ApprovalStatus, string> = {
  pending: 'Pendente', approved: 'Aprovado', rejected: 'Rejeitado',
}

export default function AprovacoesPage() {
  const [typeTab, setTypeTab] = useState('all')
  const [statusFilter, setStatusFilter] = useState('pending')
  const [data, setData] = useState<Approval[]>(MOCK)

  const filtered = data.filter(a =>
    (typeTab === 'all' || a.type === typeTab) &&
    (statusFilter === 'all' || a.status === statusFilter)
  )
  const pendingCount = data.filter(a => a.status === 'pending').length
  const pendingDelivery = data.filter(a => a.type === 'delivery' && a.status === 'pending').length

  function approve(id: string) {
    setData(d => d.map(a => a.id === id ? { ...a, status: 'approved' as ApprovalStatus } : a))
  }
  function reject(id: string) {
    setData(d => d.map(a => a.id === id ? { ...a, status: 'rejected' as ApprovalStatus } : a))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#1A1A1A]">Aprovações de Cadastro</h1>
          <p className="text-[#9E9E9E] text-sm mt-1">
            {pendingCount} cadastros aguardando aprovação
            {pendingDelivery > 0 && <span className="ml-2 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">{pendingDelivery} entregadores</span>}
          </p>
        </div>
      </div>

      {/* Alerta documentos pendentes */}
      {pendingDelivery > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 flex items-center gap-3">
          <span className="text-xl">🛵</span>
          <div>
            <div className="font-bold text-green-800 text-sm">{pendingDelivery} entregador{pendingDelivery > 1 ? 'es' : ''} aguardando verificação de documentos</div>
            <div className="text-xs text-green-700">Revise CNH, CRLV e selfie antes de aprovar</div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
        {/* Filters */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5] gap-4 flex-wrap">
          <div className="flex gap-1 flex-wrap">
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setTypeTab(t.key)}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                  typeTab === t.key ? 'bg-[#1A1A1A] text-white' : 'text-[#9E9E9E] hover:text-[#1A1A1A]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {STATUS_FILTER.map(s => (
              <button
                key={s.key}
                onClick={() => setStatusFilter(s.key)}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                  statusFilter === s.key ? 'bg-[#F05A28] text-white' : 'text-[#9E9E9E] hover:text-[#1A1A1A]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F2F2F2]">
                {['Nome / Empresa', 'Tipo', 'CNPJ / CPF', 'Localização', 'Docs', 'Enviado em', 'Status', 'Ações'].map(h => (
                  <th key={h} className="text-left text-xs font-bold text-[#9E9E9E] uppercase tracking-wide px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F2F2]">
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-12 text-[#9E9E9E] text-sm">Nenhum resultado encontrado</td></tr>
              ) : filtered.map(a => (
                <tr key={a.id} className="hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-[#1A1A1A] text-sm">{a.name}</div>
                    <div className="text-xs text-[#9E9E9E]">{a.email}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${TYPE_COLOR[a.type]}`}>
                      {TYPE_LABEL[a.type]}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm font-mono text-[#1A1A1A]">
                    {a.cnpj ?? a.cpf ?? '—'}
                  </td>
                  <td className="px-5 py-4 text-sm text-[#9E9E9E]">{a.city}, {a.state}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#9E9E9E]">
                      📄 {a.docsCount}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#9E9E9E]">{new Date(a.submittedAt).toLocaleDateString('pt-BR')}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_BADGE[a.status]}`}>
                      {STATUS_LABEL[a.status]}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/aprovacoes/${a.id}`} className="text-xs font-bold text-[#F05A28] hover:underline">
                        Ver
                      </Link>
                      {a.status === 'pending' && (
                        <>
                          <button onClick={() => approve(a.id)} className="text-xs font-bold text-green-600 hover:underline">Aprovar</button>
                          <button onClick={() => reject(a.id)} className="text-xs font-bold text-red-500 hover:underline">Rejeitar</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
