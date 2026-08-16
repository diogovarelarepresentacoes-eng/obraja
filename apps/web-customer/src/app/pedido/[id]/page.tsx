import type { Metadata } from 'next'
import Link from 'next/link'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Pedido #${id} — ObraJá`,
    description: 'Acompanhe o status e rastreamento do seu pedido.',
  }
}

// ─── Types & config ────────────────────────────────────────────────────────────

type StatusKey = 'confirmado' | 'separacao' | 'saiu' | 'entregue'

const STATUS_CONFIG: Record<StatusKey, { label: string; color: string; bg: string }> = {
  confirmado: { label: 'Confirmado',       color: '#3B82F6', bg: '#EFF6FF' },
  separacao:  { label: 'Em preparação',    color: '#F05A28', bg: '#FFF3EE' },
  saiu:       { label: 'A caminho',        color: '#FFB800', bg: '#FFFBEB' },
  entregue:   { label: 'Entregue',         color: '#16A34A', bg: '#F0FDF4' },
}

// ─── Mock data ─────────────────────────────────────────────────────────────────

const MOCK_PEDIDO = {
  status: 'saiu' as StatusKey,
  criadoEm: '16/08/2026 às 09:14',
  previsao: '16/08/2026 entre 14h e 18h',
  entregador: {
    nome: 'Ricardo Alves',
    telefone: '5531998324410',
    placa: 'ABC-1D23',
    veiculo: 'Fiat Fiorino Branca',
  },
  itens: [
    { nome: 'Cimento CP-II 50 kg', qtd: 10, unidade: 'sc', preco: 39.90 },
    { nome: 'Areia Média — saco 20 kg', qtd: 5, unidade: 'sc', preco: 14.50 },
    { nome: 'Tijolo 9 furos (cento)', qtd: 2, unidade: 'ct', preco: 68.00 },
    { nome: 'Vergalhão CA-50 Ø8mm 12m', qtd: 20, unidade: 'br', preco: 31.00 },
  ],
  frete: 45.00,
  loja: 'Materiais Fortaleza Ltda.',
}

const TIMELINE: { key: StatusKey; label: string; desc: string; done: boolean; active: boolean }[] = [
  { key: 'confirmado', label: 'Pedido confirmado',  desc: 'Pagamento aprovado',        done: true,  active: false },
  { key: 'separacao',  label: 'Em separação',        desc: 'A loja está preparando',    done: true,  active: false },
  { key: 'saiu',       label: 'Saiu para entrega',   desc: 'Entregador a caminho',      done: false, active: true  },
  { key: 'entregue',   label: 'Entregue',            desc: 'Pedido concluído',          done: false, active: false },
]

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function PedidoPage({ params }: Props) {
  const { id } = await params
  const pedido = { ...MOCK_PEDIDO, id }
  const statusCfg = STATUS_CONFIG[pedido.status]
  const subtotal = pedido.itens.reduce((acc, it) => acc + it.preco * it.qtd, 0)
  const total = subtotal + pedido.frete
  const isEntregue = pedido.status === 'entregue'

  return (
    <div style={{ background: '#F5F5F5', minHeight: '100vh' }}>

      {/* Nav */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center px-4 gap-3"
        style={{ background: '#1A1A1A', height: '56px' }}
      >
        <Link
          href="/pedidos"
          className="flex items-center justify-center rounded-lg flex-shrink-0"
          style={{ width: '34px', height: '34px', background: '#2A2A2A' }}
          aria-label="Voltar para meus pedidos"
        >
          <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </Link>

        <Link href="/" className="flex items-center gap-2">
          <div
            className="flex items-center justify-center rounded-lg"
            style={{ width: '30px', height: '30px', background: '#F05A28' }}
          >
            <span className="text-white font-bold text-xs">OJ</span>
          </div>
          <span className="font-bold text-white text-base">ObraJá</span>
        </Link>

        <span className="ml-auto text-sm font-medium" style={{ color: '#9E9E9E' }}>
          #{id}
        </span>
      </header>

      <main style={{ paddingTop: '72px', maxWidth: '640px', margin: '0 auto', padding: '72px 16px 48px' }}>

        {/* Cabeçalho do pedido */}
        <div className="mb-5">
          <h1 className="text-lg font-bold mb-3" style={{ color: '#1A1A1A' }}>
            Pedido #{id}
          </h1>

          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: statusCfg.bg, color: statusCfg.color, border: `1px solid ${statusCfg.color}40` }}
            >
              {pedido.status === 'saiu' && (
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: statusCfg.color }}
                />
              )}
              {statusCfg.label}
            </span>
            <span className="text-xs" style={{ color: '#9E9E9E' }}>{pedido.criadoEm}</span>
          </div>

          {pedido.status !== 'entregue' && (
            <p className="text-xs mt-2" style={{ color: '#9E9E9E' }}>
              Previsão: <span style={{ color: '#1A1A1A', fontWeight: 500 }}>{pedido.previsao}</span>
            </p>
          )}
        </div>

        {/* Timeline */}
        <div
          className="rounded-xl p-5 mb-4"
          style={{ background: '#FFFFFF', border: '1px solid #E5E5E5' }}
        >
          <h2 className="text-sm font-semibold mb-4" style={{ color: '#1A1A1A' }}>Rastreamento</h2>
          <div className="relative">
            {/* Linha vertical */}
            <div
              className="absolute"
              style={{ left: '15px', top: '16px', bottom: '16px', width: '2px', background: '#E5E5E5' }}
            />

            <div className="space-y-5">
              {TIMELINE.map(step => (
                <div key={step.key} className="relative flex items-start gap-4">
                  {/* Ícone */}
                  <div
                    className="relative z-10 flex items-center justify-center rounded-full flex-shrink-0 text-xs font-semibold"
                    style={{
                      width: '32px',
                      height: '32px',
                      background: step.done ? '#16A34A' : step.active ? '#F05A28' : '#F5F5F5',
                      border: step.done
                        ? '2px solid #16A34A'
                        : step.active
                        ? '2px solid #CC4010'
                        : '2px solid #E5E5E5',
                      color: step.done || step.active ? '#FFFFFF' : '#9E9E9E',
                    }}
                  >
                    {step.done ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : step.active ? (
                      <span
                        className="w-2.5 h-2.5 rounded-full animate-pulse"
                        style={{ background: '#FFFFFF' }}
                      />
                    ) : (
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: '#9E9E9E' }}
                      />
                    )}
                  </div>

                  {/* Texto */}
                  <div className="pt-1">
                    <p
                      className="text-sm font-semibold leading-tight"
                      style={{ color: step.done || step.active ? '#1A1A1A' : '#9E9E9E' }}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#9E9E9E' }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mapa placeholder */}
        <div
          className="rounded-xl mb-4 flex items-center justify-center"
          style={{ background: '#F5F5F5', border: '1px solid #E5E5E5', height: '200px' }}
        >
          <div className="text-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p className="text-sm font-medium" style={{ color: '#9E9E9E' }}>Rastreamento em tempo real</p>
            <p className="text-xs mt-0.5" style={{ color: '#9E9E9E' }}>Disponível em breve</p>
          </div>
        </div>

        {/* Card entregador */}
        <div
          className="rounded-xl p-4 mb-4 flex items-center gap-4"
          style={{ background: '#FFFFFF', border: '1px solid #E5E5E5' }}
        >
          {/* Avatar placeholder */}
          <div
            className="flex-shrink-0 rounded-full flex items-center justify-center"
            style={{ width: '48px', height: '48px', background: '#F5F5F5' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide mb-0.5" style={{ color: '#9E9E9E' }}>Entregador</p>
            <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{pedido.entregador.nome}</p>
            <p className="text-xs mt-0.5" style={{ color: '#9E9E9E' }}>
              {pedido.entregador.veiculo} · {pedido.entregador.placa}
            </p>
          </div>

          <a
            href={`https://wa.me/${pedido.entregador.telefone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-lg flex-shrink-0 transition-colors"
            style={{ width: '40px', height: '40px', background: '#25D366' }}
            aria-label="Contato via WhatsApp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.985-1.306A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
            </svg>
          </a>
        </div>

        {/* Itens do pedido */}
        <div
          className="rounded-xl p-5 mb-4"
          style={{ background: '#FFFFFF', border: '1px solid #E5E5E5' }}
        >
          <h2 className="text-sm font-semibold mb-4" style={{ color: '#1A1A1A' }}>Itens do pedido</h2>

          <div>
            {pedido.itens.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-3"
                style={i < pedido.itens.length - 1 ? { borderBottom: '1px solid #F5F5F5' } : {}}
              >
                <div
                  className="flex-shrink-0 rounded-lg"
                  style={{ width: '40px', height: '40px', background: '#F5F5F5' }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-tight truncate" style={{ color: '#1A1A1A' }}>{item.nome}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#9E9E9E' }}>
                    {item.qtd} {item.unidade}
                  </p>
                </div>
                <p className="text-sm font-semibold flex-shrink-0" style={{ color: '#1A1A1A' }}>
                  R$ {formatBRL(item.preco * item.qtd)}
                </p>
              </div>
            ))}
          </div>

          {/* Resumo financeiro */}
          <div className="mt-3 pt-3 space-y-1.5" style={{ borderTop: '1px solid #E5E5E5' }}>
            <div className="flex justify-between text-sm">
              <span style={{ color: '#9E9E9E' }}>Subtotal</span>
              <span style={{ color: '#1A1A1A' }}>R$ {formatBRL(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: '#9E9E9E' }}>Frete</span>
              <span style={{ color: '#1A1A1A' }}>R$ {formatBRL(pedido.frete)}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-base font-bold" style={{ color: '#1A1A1A' }}>Total</span>
              <span className="text-base font-bold" style={{ color: '#F05A28' }}>R$ {formatBRL(total)}</span>
            </div>
          </div>
        </div>

        {/* Loja */}
        <p className="text-xs text-center mb-5" style={{ color: '#9E9E9E' }}>
          Vendido e entregue por{' '}
          <span className="font-medium" style={{ color: '#1A1A1A' }}>{pedido.loja}</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <a
            href="https://wa.me/5531900000000?text=Preciso%20de%20ajuda%20com%20meu%20pedido."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white transition-colors"
            style={{ background: '#1A1A1A' }}
          >
            Precisou de ajuda?
          </a>

          {isEntregue && (
            <button
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-colors"
              style={{ background: '#FFF3EE', color: '#F05A28', border: '1px solid #F05A28' }}
            >
              Avaliar entrega
            </button>
          )}
        </div>

      </main>
    </div>
  )
}
