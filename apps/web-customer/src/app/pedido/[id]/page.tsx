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

// ─── Mock data ────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  confirmado:     { label: 'Confirmado',         color: '#3B82F6', bg: '#EFF6FF' },
  separacao:      { label: 'Em separação',        color: '#FFB800', bg: '#FFFBEB' },
  saiu:           { label: 'Saiu para entrega',   color: '#F05A28', bg: '#FFF3EE' },
  entregue:       { label: 'Entregue',            color: '#22C55E', bg: '#F0FDF4' },
} as const

type StatusKey = keyof typeof STATUS_CONFIG

const MOCK_PEDIDO = {
  id: '',           // filled at render time
  status: 'saiu' as StatusKey,
  criadoEm: '16/08/2026 às 09:14',
  previsao: '16/08/2026 entre 14h e 18h',
  entregador: {
    nome: 'Ricardo Alves',
    telefone: '(31) 99832-4410',
    placa: 'ABC-1D23',
    veiculo: 'Fiat Fiorino Branca',
  },
  itens: [
    { nome: 'Cimento CP-II 50 kg', qtd: 10, unidade: 'sc', preco: 39.9 },
    { nome: 'Areia Média — saco 20 kg', qtd: 5, unidade: 'sc', preco: 14.5 },
    { nome: 'Tijolo 9 furos (cento)', qtd: 2, unidade: 'ct', preco: 68.0 },
    { nome: 'Vergalhão CA-50 ⌀8mm 12m', qtd: 20, unidade: 'br', preco: 31.0 },
  ],
  frete: 45.0,
  loja: 'Materiais Fortaleza Ltda.',
}

const TIMELINE = [
  { key: 'confirmado', label: 'Pedido confirmado',   desc: 'Pagamento aprovado', done: true },
  { key: 'separacao',  label: 'Em separação',         desc: 'A loja está preparando', done: true },
  { key: 'saiu',       label: 'Saiu para entrega',    desc: 'Entregador a caminho', done: false },
  { key: 'entregue',   label: 'Entregue',             desc: 'Pedido concluído', done: false },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function Logo() {
  return (
    <span className="text-xl font-black tracking-tight leading-none">
      <span className="text-white">Obra</span>
      <span style={{ color: '#F05A28' }}>Já</span>
    </span>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PedidoPage({ params }: Props) {
  const { id } = await params
  const pedido = { ...MOCK_PEDIDO, id }
  const statusCfg = STATUS_CONFIG[pedido.status]

  const subtotal = pedido.itens.reduce((acc, it) => acc + it.preco * it.qtd, 0)
  const total = subtotal + pedido.frete

  const isEntregue = pedido.status === 'entregue'

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
          <Link
            href="/pedidos"
            className="flex items-center justify-center w-9 h-9 rounded-xl transition-colors"
            style={{ background: '#2D2D2D' }}
            aria-label="Voltar para meus pedidos"
          >
            <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Logo />
          <span className="ml-auto text-sm font-semibold" style={{ color: '#9E9E9E' }}>
            #{id}
          </span>
        </div>
      </header>

      <main
        className="container-app pb-24"
        style={{ paddingTop: 'calc(var(--header-height, 56px) + 1.25rem)' }}
      >

        {/* ── Status badge ── */}
        <div className="mb-5 flex items-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-black"
            style={{ background: statusCfg.bg, color: statusCfg.color, border: `1.5px solid ${statusCfg.color}33` }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: statusCfg.color }}
            />
            {statusCfg.label}
          </span>
        </div>

        <p className="text-xs mb-1" style={{ color: '#9E9E9E' }}>
          Pedido realizado em {pedido.criadoEm}
        </p>
        <p className="text-xs font-semibold mb-5" style={{ color: '#1A1A1A' }}>
          Previsão: {pedido.previsao}
        </p>

        {/* ── Timeline ── */}
        <div
          className="rounded-2xl p-5 mb-4"
          style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <h2 className="text-sm font-black mb-4" style={{ color: '#1A1A1A' }}>
            Rastreamento
          </h2>
          <div className="relative">
            {/* vertical line */}
            <div
              className="absolute left-[17px] top-4 bottom-4 w-0.5"
              style={{ background: '#E5E5E5' }}
            />
            <div className="space-y-6">
              {TIMELINE.map((step, i) => {
                const isActive = step.key === pedido.status
                const isDone = step.done
                return (
                  <div key={step.key} className="relative flex items-start gap-4">
                    {/* circle */}
                    <div
                      className="relative z-10 w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center text-sm font-black"
                      style={{
                        background: isDone ? '#22C55E' : isActive ? '#F05A28' : '#F5F5F5',
                        border: isActive ? '2px solid #CC4010' : isDone ? '2px solid #16A34A' : '2px solid #E5E5E5',
                        color: isDone || isActive ? '#fff' : '#9E9E9E',
                      }}
                    >
                      {isDone ? '✓' : i + 1}
                    </div>
                    {/* text */}
                    <div className="pt-1.5">
                      <p
                        className="text-sm font-bold leading-tight"
                        style={{ color: isDone || isActive ? '#1A1A1A' : '#9E9E9E' }}
                      >
                        {step.label}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: '#9E9E9E' }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Mapa placeholder ── */}
        <div
          className="rounded-2xl mb-4 overflow-hidden relative flex items-center justify-center"
          style={{ background: '#D1D5DB', height: '180px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
        >
          <div className="absolute inset-0 opacity-20">
            {/* grid lines */}
            {[...Array(6)].map((_, i) => (
              <div
                key={`h${i}`}
                className="absolute w-full border-t"
                style={{ top: `${(i + 1) * 16.66}%`, borderColor: '#6B7280' }}
              />
            ))}
            {[...Array(6)].map((_, i) => (
              <div
                key={`v${i}`}
                className="absolute h-full border-l"
                style={{ left: `${(i + 1) * 16.66}%`, borderColor: '#6B7280' }}
              />
            ))}
          </div>
          <div className="flex flex-col items-center gap-2 z-10">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#F05A28">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
            </svg>
            <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: '#fff', color: '#1A1A1A' }}>
              Mapa em tempo real — em breve
            </span>
          </div>
        </div>

        {/* ── Entregador ── */}
        <div
          className="rounded-2xl p-5 mb-4 flex items-center gap-4"
          style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <div
            className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center text-2xl"
            style={{ background: '#FFF3EE' }}
          >
            🧑‍💼
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: '#9E9E9E' }}>
              Entregador
            </p>
            <p className="font-black text-sm" style={{ color: '#1A1A1A' }}>{pedido.entregador.nome}</p>
            <p className="text-xs mt-0.5" style={{ color: '#9E9E9E' }}>
              {pedido.entregador.veiculo} · {pedido.entregador.placa}
            </p>
          </div>
          <a
            href={`tel:${pedido.entregador.telefone}`}
            className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
            style={{ background: '#22C55E' }}
            aria-label="Ligar para entregador"
          >
            <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.69A2 2 0 012 .91h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* ── Itens ── */}
        <div
          className="rounded-2xl p-5 mb-4"
          style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <h2 className="text-sm font-black mb-4" style={{ color: '#1A1A1A' }}>
            Itens do pedido
          </h2>
          <div className="space-y-3">
            {pedido.itens.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: '#F5F5F5' }}
                >
                  📦
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-tight truncate" style={{ color: '#1A1A1A' }}>
                    {item.nome}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#9E9E9E' }}>
                    {item.qtd} {item.unidade}
                  </p>
                </div>
                <p className="text-sm font-black flex-shrink-0" style={{ color: '#1A1A1A' }}>
                  R$ {(item.preco * item.qtd).toFixed(2).replace('.', ',')}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 space-y-2" style={{ borderTop: '1px solid #F5F5F5' }}>
            <div className="flex justify-between text-sm">
              <span style={{ color: '#9E9E9E' }}>Subtotal</span>
              <span style={{ color: '#1A1A1A' }}>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: '#9E9E9E' }}>Frete</span>
              <span style={{ color: '#1A1A1A' }}>R$ {pedido.frete.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between text-base font-black pt-1">
              <span style={{ color: '#1A1A1A' }}>Total</span>
              <span style={{ color: '#F05A28' }}>R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        </div>

        {/* ── Loja ── */}
        <p className="text-xs text-center mb-5" style={{ color: '#9E9E9E' }}>
          Vendido e entregue por <strong style={{ color: '#1A1A1A' }}>{pedido.loja}</strong>
        </p>

        {/* ── CTAs ── */}
        <div className="flex flex-col gap-3">
          <a
            href="https://wa.me/5531900000000?text=Olá!%20Preciso%20de%20suporte%20com%20meu%20pedido."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-black text-white transition-opacity hover:opacity-90"
            style={{ background: '#25D366' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.985-1.306A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
            </svg>
            Falar com suporte
          </a>

          {isEntregue && (
            <button
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-black transition-opacity hover:opacity-90"
              style={{ background: '#FFF3EE', color: '#F05A28', border: '2px solid #F05A28' }}
            >
              ⭐ Avaliar entrega
            </button>
          )}
        </div>

      </main>
    </div>
  )
}
