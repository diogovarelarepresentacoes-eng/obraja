import Link from 'next/link'

const kpiCards = [
  {
    label: 'Pedidos em Aberto',
    value: '7',
    sub: '3 aguardando confirmação',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    accent: '#F05A28',
  },
  {
    label: 'Gasto no Mês',
    value: 'R$ 234.870',
    sub: '↑ 22% vs mês anterior',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accent: '#22c55e',
  },
  {
    label: 'Cotações Ativas',
    value: '4',
    sub: '2 com respostas novas',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    accent: '#3b82f6',
  },
  {
    label: 'Fornecedores',
    value: '12 ativos',
    sub: 'Cadastrados na plataforma',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    accent: '#a855f7',
  },
]

const recentOrders = [
  { id: '#2891', supplier: 'Materiais Belo', item: 'Cimento CP-II (500 sacos)', value: 'R$ 15.950', status: 'Em entrega', date: '01/08/2026', statusColor: '#f97316', statusBg: '#fff7ed' },
  { id: '#2890', supplier: 'DepósitoMax', item: 'Tinta Acrílica (48 latas)', value: 'R$ 10.555', status: 'Entregue', date: '31/07/2026', statusColor: '#16a34a', statusBg: '#f0fdf4' },
  { id: '#2889', supplier: 'Construfácil Sul', item: 'Fio Elétrico 2,5mm (20 rolos)', value: 'R$ 3.780', status: 'Entregue', date: '29/07/2026', statusColor: '#16a34a', statusBg: '#f0fdf4' },
  { id: '#2888', supplier: 'Materiais Belo', item: 'Argamassa AC-II (200 cx)', value: 'R$ 7.500', status: 'Entregue', date: '27/07/2026', statusColor: '#16a34a', statusBg: '#f0fdf4' },
  { id: '#2887', supplier: 'Indústria Votorantim', item: 'Cimento CP-V (2000 sacos)', value: 'R$ 61.800', status: 'Entregue', date: '20/07/2026', statusColor: '#16a34a', statusBg: '#f0fdf4' },
]

const topSuppliers = [
  { name: 'Materiais Belo', rating: '4.8', orders: 47, initials: 'MB', color: '#F05A28' },
  { name: 'DepósitoMax', rating: '4.5', orders: 23, initials: 'DM', color: '#3b82f6' },
  { name: 'Construfácil Sul', rating: '4.6', orders: 18, initials: 'CS', color: '#22c55e' },
]

const quoteCards = [
  {
    id: '#Q-041',
    title: '500 sacos Cimento + 200 cx Argamassa',
    status: 'Aberta',
    responses: 3,
    deadline: '05/08/2026',
    items: ['Cimento CP-II 50kg — 500 sacos', 'Argamassa AC-II 20kg — 200 caixas', 'Calafetar 300ml — 50 un'],
    quotes: [
      { supplier: 'Materiais Belo', subtotal: 'R$ 23.450', delivery: '3 dias', payment: '30 dias' },
      { supplier: 'DepósitoMax', subtotal: 'R$ 24.100', delivery: '2 dias', payment: 'À vista' },
      { supplier: 'Indústria Ita', subtotal: 'R$ 21.900', delivery: '7 dias', payment: '60 dias' },
    ],
  },
  {
    id: '#Q-040',
    title: 'Materiais hidráulicos — Kit banheiro',
    status: 'Aberta',
    responses: 2,
    deadline: '03/08/2026',
    items: ['Tubo PVC 50mm — 30 barras', 'Joelho 50mm — 60 un', 'Válvula de descarga — 10 un'],
    quotes: [
      { supplier: 'Construfácil Sul', subtotal: 'R$ 8.700', delivery: '2 dias', payment: '30 dias' },
      { supplier: 'Materiais RJ', subtotal: 'R$ 9.100', delivery: '4 dias', payment: 'À vista' },
    ],
  },
]

export default function DashboardPage() {
  return (
    <main className="flex-1 px-8 py-8" style={{ marginTop: 64 }}>
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {kpiCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl p-5 flex flex-col gap-3"
            style={{ background: '#fff', border: '1px solid #F2F2F2' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium" style={{ color: '#9E9E9E' }}>
                {card.label}
              </span>
              <span style={{ color: card.accent }}>{card.icon}</span>
            </div>
            <div className="text-2xl font-black" style={{ color: '#1A1A1A' }}>
              {card.value}
            </div>
            <div className="text-xs" style={{ color: '#9E9E9E' }}>
              {card.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Link
          href="/cotacoes"
          className="rounded-xl p-5 flex items-center gap-4 cursor-pointer transition-opacity hover:opacity-90"
          style={{ background: '#F05A28' }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'rgba(255,255,255,0.2)' }}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <div className="font-bold text-white">Nova Cotação</div>
            <div className="text-xs text-white/80 mt-0.5">Solicitar preços a fornecedores</div>
          </div>
        </Link>
        <Link
          href="/pedidos"
          className="rounded-xl p-5 flex items-center gap-4 cursor-pointer transition-opacity hover:opacity-90"
          style={{ background: '#1A1A1A' }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div>
            <div className="font-bold text-white">Pedido Recorrente</div>
            <div className="text-xs text-white/60 mt-0.5">Repetir um pedido anterior</div>
          </div>
        </Link>
        <div
          className="rounded-xl p-5 flex items-center gap-4 cursor-pointer transition-colors hover:bg-gray-100"
          style={{ background: '#F2F2F2', border: '1px solid #E5E5E5' }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: '#fff' }}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#1A1A1A" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <div>
            <div className="font-bold" style={{ color: '#1A1A1A' }}>Lista de Compras</div>
            <div className="text-xs mt-0.5" style={{ color: '#9E9E9E' }}>Gerenciar itens frequentes</div>
          </div>
        </div>
      </div>

      {/* Bottom row: Orders + Quotes + Suppliers */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recent Orders — spans 2 cols */}
        <div
          className="col-span-2 rounded-xl"
          style={{ background: '#fff', border: '1px solid #F2F2F2' }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#F2F2F2' }}>
            <h2 className="font-bold text-base" style={{ color: '#1A1A1A' }}>Pedidos Recentes</h2>
            <Link href="/pedidos" className="text-sm font-medium hover:underline" style={{ color: '#F05A28' }}>
              Ver todos
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#F8F8F8' }}>
                  <th className="text-left px-6 py-3 font-semibold text-xs uppercase tracking-wide" style={{ color: '#9E9E9E' }}>Pedido</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide" style={{ color: '#9E9E9E' }}>Fornecedor</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide" style={{ color: '#9E9E9E' }}>Valor</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide" style={{ color: '#9E9E9E' }}>Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide" style={{ color: '#9E9E9E' }}>Data</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr
                    key={order.id}
                    className="border-t transition-colors hover:bg-gray-50"
                    style={{ borderColor: '#F2F2F2' }}
                  >
                    <td className="px-6 py-3.5 font-semibold" style={{ color: '#1A1A1A' }}>
                      {order.id}
                    </td>
                    <td className="px-4 py-3.5" style={{ color: '#1A1A1A' }}>
                      {order.supplier}
                    </td>
                    <td className="px-4 py-3.5 font-semibold" style={{ color: '#1A1A1A' }}>
                      {order.value}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ color: order.statusColor, background: order.statusBg }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5" style={{ color: '#9E9E9E' }}>
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column: Top Suppliers */}
        <div className="flex flex-col gap-5">
          <div
            className="rounded-xl flex-1"
            style={{ background: '#fff', border: '1px solid #F2F2F2' }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#F2F2F2' }}>
              <h2 className="font-bold text-base" style={{ color: '#1A1A1A' }}>Top Fornecedores</h2>
              <Link href="/fornecedores" className="text-xs font-medium hover:underline" style={{ color: '#F05A28' }}>
                Ver todos
              </Link>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {topSuppliers.map((s) => (
                <div key={s.name} className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ background: s.color, color: '#fff' }}
                  >
                    {s.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate" style={{ color: '#1A1A1A' }}>
                      {s.name}
                    </div>
                    <div className="text-xs" style={{ color: '#9E9E9E' }}>
                      {s.orders} pedidos
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 text-sm font-bold" style={{ color: '#FFB800' }}>
                    ★ {s.rating}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Quotes */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-base" style={{ color: '#1A1A1A' }}>Cotações Ativas</h2>
          <Link href="/cotacoes" className="text-sm font-medium hover:underline" style={{ color: '#F05A28' }}>
            Ver todas
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {quoteCards.map((q) => (
            <div
              key={q.id}
              className="rounded-xl"
              style={{ background: '#fff', border: '1px solid #F2F2F2' }}
            >
              <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#F2F2F2' }}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm" style={{ color: '#1A1A1A' }}>{q.id}</span>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: '#fff7ed', color: '#f97316' }}
                    >
                      {q.status}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: '#1A1A1A' }}>{q.title}</p>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <div className="text-xs" style={{ color: '#9E9E9E' }}>Prazo</div>
                  <div className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{q.deadline}</div>
                </div>
              </div>
              <div className="px-5 py-3">
                <div className="text-xs font-semibold mb-2" style={{ color: '#9E9E9E' }}>
                  {q.responses} RESPOSTAS RECEBIDAS
                </div>
                <table className="w-full text-xs">
                  <thead>
                    <tr>
                      <th className="text-left pb-1.5 font-semibold" style={{ color: '#9E9E9E' }}>Fornecedor</th>
                      <th className="text-right pb-1.5 font-semibold" style={{ color: '#9E9E9E' }}>Total</th>
                      <th className="text-right pb-1.5 font-semibold" style={{ color: '#9E9E9E' }}>Entrega</th>
                      <th className="text-right pb-1.5 font-semibold" style={{ color: '#9E9E9E' }}>Pgto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {q.quotes.map((quote, i) => (
                      <tr key={quote.supplier} style={{ borderTop: '1px solid #F2F2F2' }}>
                        <td className="py-1.5 font-medium" style={{ color: '#1A1A1A' }}>{quote.supplier}</td>
                        <td className="py-1.5 text-right font-bold" style={{ color: i === 0 && q.id === '#Q-041' ? '#16a34a' : '#1A1A1A' }}>{quote.subtotal}</td>
                        <td className="py-1.5 text-right" style={{ color: '#9E9E9E' }}>{quote.delivery}</td>
                        <td className="py-1.5 text-right" style={{ color: '#9E9E9E' }}>{quote.payment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex gap-2 mt-3">
                  <Link
                    href="/cotacoes"
                    className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-center transition-opacity hover:opacity-90"
                    style={{ background: '#F05A28', color: '#fff' }}
                  >
                    Aceitar Melhor Preço
                  </Link>
                  <Link
                    href="/cotacoes"
                    className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-center border transition-colors hover:bg-gray-50"
                    style={{ color: '#1A1A1A', borderColor: '#E5E5E5' }}
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
