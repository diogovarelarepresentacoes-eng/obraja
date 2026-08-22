'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type EntityType = 'store' | 'industry' | 'contractor' | 'delivery'

interface MockDoc {
  label: string
  filename: string
  status: 'ok' | 'pending' | 'rejected'
}

interface MockApproval {
  id: string
  type: EntityType
  name: string
  cnpj?: string
  cpf?: string
  razaoSocial?: string
  email: string
  phone: string
  street?: string
  complement?: string
  neighborhood?: string
  city: string
  state: string
  zipCode: string
  submittedAt: string
  status: 'pending' | 'approved' | 'rejected'
  docs: MockDoc[]
  // CNPJ entities
  categories?: string[]
  deliveryRadius?: number
  ownDelivery?: boolean
  paymentMethods?: string[]
  // delivery
  dataNascimento?: string
  tipoVeiculo?: string
  placa?: string
  marca?: string
  modelo?: string
  ano?: string
  cor?: string
}

const MOCK_DATA: Record<string, MockApproval> = {
  '1': {
    id: '1', type: 'store', name: 'Materiais São Paulo Ltda', cnpj: '12.345.678/0001-90',
    razaoSocial: 'Materiais São Paulo Ltda', email: 'contato@matsaopaulo.com.br',
    phone: '(11) 98765-4321', street: 'Rua das Madeiras, 450', complement: 'Galpão 3',
    neighborhood: 'Vila Industrial', city: 'São Paulo', state: 'SP', zipCode: '01234-567',
    submittedAt: '2026-08-02T10:32:00', status: 'pending',
    categories: ['Cimento e Argamassa', 'Tintas e Revestimentos', 'Ferramentas'],
    deliveryRadius: 15, ownDelivery: true, paymentMethods: ['pix', 'credit_card', 'boleto'],
    docs: [
      { label: 'Contrato Social', filename: 'contrato_social_matsaopaulo.pdf', status: 'ok' },
      { label: 'Aditivo 1', filename: 'aditivo_2024.pdf', status: 'ok' },
    ],
  },
  '4': {
    id: '4', type: 'delivery', name: 'Carlos Souza Oliveira', cpf: '123.456.789-09',
    email: 'carlos.entregador@gmail.com', phone: '(11) 97890-1234',
    street: 'Rua das Flores, 321', neighborhood: 'Jardim América',
    city: 'São Paulo', state: 'SP', zipCode: '04567-890',
    submittedAt: '2026-08-02T14:20:00', status: 'pending',
    dataNascimento: '1992-05-14', tipoVeiculo: 'moto', placa: 'ABC1D23',
    marca: 'Honda', modelo: 'Pop 110i', ano: '2022', cor: 'Vermelho',
    docs: [
      { label: 'CRLV — Documento do Veículo', filename: 'crlv_abc1d23.jpg', status: 'ok' },
      { label: 'CNH — Frente', filename: 'cnh_frente_carlos.jpg', status: 'ok' },
      { label: 'CNH — Verso', filename: 'cnh_verso_carlos.jpg', status: 'ok' },
      { label: 'Selfie com Documento', filename: 'selfie_carlos.jpg', status: 'pending' },
      { label: 'Comprovante de Residência', filename: 'comprovante_res_carlos.pdf', status: 'ok' },
    ],
  },
}

const FALLBACK: MockApproval = {
  id: '?', type: 'store', name: 'Cadastro não encontrado', email: '', phone: '',
  city: '—', state: '—', zipCode: '—', submittedAt: new Date().toISOString(), status: 'pending',
  docs: [],
}

const TYPE_LABEL: Record<EntityType, string> = {
  store: 'Loja', industry: 'Indústria', contractor: 'Construtora', delivery: 'Entregador',
}
const TYPE_COLOR: Record<EntityType, string> = {
  store: 'bg-[#FFF3EE] text-[#F05A28]',
  industry: 'bg-blue-50 text-blue-700',
  contractor: 'bg-purple-50 text-purple-700',
  delivery: 'bg-green-50 text-green-700',
}
const VEHICLE_LABEL: Record<string, string> = {
  moto: 'Motocicleta', carro: 'Carro', van: 'Van / Utilitário', caminhao_leve: 'Caminhão leve',
}
const DOC_STATUS_STYLE: Record<string, string> = {
  ok: 'bg-green-50 border-green-200 text-green-700',
  pending: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  rejected: 'bg-red-50 border-red-200 text-red-500',
}
const DOC_STATUS_LABEL: Record<string, string> = {
  ok: 'Recebido', pending: 'Em análise', rejected: 'Rejeitado',
}

export default function AprovacaoDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const raw = MOCK_DATA[params.id] ?? FALLBACK
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>(raw.status)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [loading, setLoading] = useState(false)
  const d = raw

  async function handleApprove() {
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setStatus('approved')
    setLoading(false)
  }

  async function handleReject() {
    if (!rejectReason.trim()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setStatus('rejected')
    setShowRejectModal(false)
    setLoading(false)
  }

  const isDelivery = d.type === 'delivery'

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/aprovacoes" className="text-[#9E9E9E] hover:text-[#1A1A1A] transition-colors text-sm font-medium">
          ← Aprovações
        </Link>
        <span className="text-[#E5E5E5]">/</span>
        <span className="text-sm font-semibold text-[#1A1A1A] truncate">{d.name}</span>
      </div>

      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1A1A1A]">{d.name}</h1>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${TYPE_COLOR[d.type]}`}>{TYPE_LABEL[d.type]}</span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
              status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
              : status === 'approved' ? 'bg-green-50 text-green-700 border-green-200'
              : 'bg-red-50 text-red-700 border-red-200'
            }`}>
              {status === 'pending' ? 'Aguardando aprovação' : status === 'approved' ? 'Aprovado' : 'Rejeitado'}
            </span>
            <span className="text-xs text-[#9E9E9E]">Enviado em {new Date(d.submittedAt).toLocaleString('pt-BR')}</span>
          </div>
        </div>
        {status === 'pending' && (
          <div className="flex gap-3">
            <button onClick={() => setShowRejectModal(true)}
              className="px-5 py-2.5 rounded-xl border-2 border-red-200 text-red-600 text-sm font-bold hover:bg-red-50 transition-all">
              Rejeitar
            </button>
            <button onClick={handleApprove} disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-green-500 text-white text-sm font-bold hover:bg-green-600 transition-all disabled:opacity-60">
              {loading ? 'Aprovando...' : '✓ Aprovar Cadastro'}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Dados principais */}
        <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
          <h3 className="font-black text-[#1A1A1A] mb-4">{isDelivery ? 'Dados Pessoais' : 'Dados da Empresa'}</h3>
          <dl className="space-y-3">
            {isDelivery ? (
              <>
                <InfoItem label="Nome completo" value={d.name} />
                <InfoItem label="CPF" value={d.cpf ?? '—'} mono />
                <InfoItem label="E-mail" value={d.email} />
                <InfoItem label="Telefone" value={d.phone} />
                <InfoItem label="Data de nascimento" value={d.dataNascimento ? new Date(d.dataNascimento + 'T00:00:00').toLocaleDateString('pt-BR') : '—'} />
              </>
            ) : (
              <>
                <InfoItem label="Nome Fantasia / Razão Social" value={`${d.name}${d.razaoSocial ? ' / ' + d.razaoSocial : ''}`} />
                <InfoItem label="CNPJ" value={d.cnpj ?? '—'} mono />
                <InfoItem label="E-mail" value={d.email} />
                <InfoItem label="Telefone" value={d.phone} />
              </>
            )}
          </dl>
        </div>

        {/* Endereço */}
        <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
          <h3 className="font-black text-[#1A1A1A] mb-4">Endereço</h3>
          <dl className="space-y-3">
            {d.street && <InfoItem label="Logradouro" value={`${d.street}${d.complement ? ', ' + d.complement : ''}`} />}
            {d.neighborhood && <InfoItem label="Bairro" value={d.neighborhood} />}
            <InfoItem label="Cidade / Estado" value={`${d.city} — ${d.state}`} />
            <InfoItem label="CEP" value={d.zipCode} mono />
          </dl>
        </div>

        {/* Veículo (entregador) ou Operação (empresa) */}
        {isDelivery ? (
          <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
            <h3 className="font-black text-[#1A1A1A] mb-4">Dados do Veículo</h3>
            <dl className="space-y-3">
              <InfoItem label="Tipo" value={d.tipoVeiculo ? (VEHICLE_LABEL[d.tipoVeiculo] ?? d.tipoVeiculo) : '—'} />
              <InfoItem label="Placa" value={d.placa ?? '—'} mono />
              <InfoItem label="Marca / Modelo" value={`${d.marca ?? '—'} ${d.modelo ?? ''}`} />
              <InfoItem label="Ano" value={d.ano ?? '—'} />
              <InfoItem label="Cor" value={d.cor ?? '—'} />
            </dl>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
            <h3 className="font-black text-[#1A1A1A] mb-4">Perfil de Operação</h3>
            <div className="space-y-4">
              {d.categories && (
                <div>
                  <div className="text-xs text-[#9E9E9E] font-medium mb-2">Categorias de Produto</div>
                  <div className="flex flex-wrap gap-1.5">
                    {d.categories.map(c => (
                      <span key={c} className="text-xs px-2.5 py-1 bg-[#F8F8F8] border border-[#E5E5E5] rounded-full font-medium">{c}</span>
                    ))}
                  </div>
                </div>
              )}
              {d.paymentMethods && (
                <div>
                  <div className="text-xs text-[#9E9E9E] font-medium mb-2">Meios de Pagamento</div>
                  <div className="flex flex-wrap gap-1.5">
                    {d.paymentMethods.map(p => (
                      <span key={p} className="text-xs px-2.5 py-1 bg-[#F8F8F8] border border-[#E5E5E5] rounded-full font-medium capitalize">{p.replace('_', ' ')}</span>
                    ))}
                  </div>
                </div>
              )}
              {d.deliveryRadius !== undefined && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#F8F8F8] rounded-xl p-3">
                    <div className="text-xs text-[#9E9E9E]">Raio de entrega</div>
                    <div className="font-bold text-[#1A1A1A]">{d.deliveryRadius} km</div>
                  </div>
                  <div className="bg-[#F8F8F8] rounded-xl p-3">
                    <div className="text-xs text-[#9E9E9E]">Entrega própria</div>
                    <div className="font-bold text-[#1A1A1A]">{d.ownDelivery ? 'Sim' : 'Não'}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Verificação CNPJ (apenas empresas) */}
        {!isDelivery && (
          <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
            <h3 className="font-black text-[#1A1A1A] mb-4">Verificação de CNPJ</h3>
            <div className="space-y-3">
              {[
                { check: 'CNPJ válido e ativo na Receita Federal', ok: true },
                { check: 'Situação cadastral: ATIVA', ok: true },
                { check: 'Natureza jurídica verificada', ok: true },
                { check: 'Sem pendências na Sefaz', ok: true },
                { check: 'Razão social compatível com documentos', ok: true },
              ].map(item => (
                <div key={item.check} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${item.ok ? 'bg-green-100' : 'bg-red-100'}`}>
                    <span className="text-xs">{item.ok ? '✓' : '✕'}</span>
                  </div>
                  <span className="text-sm text-[#666]">{item.check}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Documentos enviados */}
      <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-black text-[#1A1A1A]">Documentos Enviados</h3>
          <span className="text-xs text-[#9E9E9E]">{d.docs.filter(x => x.status === 'ok').length}/{d.docs.length} recebidos</span>
        </div>
        {d.docs.length === 0 ? (
          <p className="text-sm text-[#9E9E9E]">Nenhum documento enviado.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {d.docs.map((doc, i) => (
              <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${DOC_STATUS_STYLE[doc.status]}`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F8F8F8] border border-[#E5E5E5] flex items-center justify-center shrink-0 text-[#9E9E9E]">
                    {doc.filename.endsWith('.pdf') ? (
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{doc.label}</div>
                    <div className="text-xs opacity-70">{doc.filename}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full border ${DOC_STATUS_STYLE[doc.status]}`}>
                    {DOC_STATUS_LABEL[doc.status]}
                  </span>
                  <button
                    className="text-xs font-bold text-[#F05A28] hover:underline"
                    onClick={() => {
                      // In production: open signed URL from storage
                      window.alert(`Visualizar: ${doc.filename}\n(Integração com storage a implementar)`)
                    }}
                  >
                    Visualizar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isDelivery && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-xs text-yellow-800">
            <div className="flex items-start gap-2">
              <svg className="shrink-0 mt-0.5" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span><strong>Checklist para entregadores:</strong> Verifique se CNH está dentro da validade, CRLV com data vigente, selfie com rosto visível e documento legível, comprovante de residência nos últimos 90 dias.</span>
            </div>
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="font-black text-[#1A1A1A] text-lg mb-2">Rejeitar Cadastro</h3>
            <p className="text-[#9E9E9E] text-sm mb-5">
              Informe o motivo da rejeição. {d.name} receberá uma notificação por e-mail com este texto.
            </p>
            <textarea
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder={isDelivery
                ? 'Ex: CNH com validade expirada. Por favor, renove sua CNH e refaça o cadastro.'
                : 'Ex: Documentação incompleta. Por favor, reenvie com o contrato social atualizado.'}
              className="w-full h-28 px-4 py-3 border-2 border-[#E5E5E5] rounded-xl text-sm resize-none focus:border-red-400 focus:outline-none"
            />
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowRejectModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#E5E5E5] text-sm font-medium text-[#9E9E9E] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-all">
                Cancelar
              </button>
              <button onClick={handleReject} disabled={!rejectReason.trim() || loading}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-all disabled:opacity-60">
                {loading ? 'Rejeitando...' : 'Confirmar Rejeição'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function InfoItem({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs text-[#9E9E9E] font-medium">{label}</dt>
      <dd className={"text-sm font-semibold text-[#1A1A1A] mt-0.5"}>{value}</dd>
    </div>
  )
}
