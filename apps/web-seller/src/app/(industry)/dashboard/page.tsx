import Link from 'next/link'

const kpis = [
  {
    label: 'Pedidos Hoje',
    value: '23',
    change: '+12%',
    changeLabel: 'vs. ontem',
    positive: true,
    icon: (
      <svg width="22" height="22" fill="none" stroke="#F05A28" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Receita do Mês',
    value: 'R$ 487.320',
    change: '+8%',
    changeLabel: 'vs. mês anterior',
    positive: true,
    icon: (
      <svg width="22" height="22" fill="none" stroke="#F05A28" strokeWidth="2" viewBox="0 0 24 24">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    label: 'Produtos Ativos',
    value: '142',
    change: '',
    changeLabel: 'no catálogo',
    positive: true,
    icon: (
      <svg width="22" height="22" fill="none" stroke="#F05A28" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="3" width="7" height="7" rx="1" />
        <rect x="15" y="3" width="7" height="7" rx="1" />
        <rect x="2" y="14" width="7" height="7" rx="1" />
        <rect x="15" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Clientes Ativos',
    value: '38 lojas',
    change: '+3',
    changeLabel: 'este mês',
    positive: true,
    icon: (
      <svg width="22" height="22" fill="none" stroke="#F05A28" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
]

const recentOrders = [
  { id: '#4521', loja: 'Materiais Belo', produto: 'Cimento CP-II', qtd: '200 sacos', valor: 'R$ 6.580', status: 'Em produção', data: '01/08/2026' },
  { id: '#4520', loja: 'Construfácil Sul', produto: 'Argamassa AC-II', qtd: '50 cx', valor: 'R$ 1.875', status: 'Enviado', data: '31/07/2026' },
  { id: '#4519', loja: 'DepósitoMax', produto: 'Cimento CP-V', qtd: '500 sacos', valor: 'R$ 15.450', status: 'Entregue', data: '30/07/2026' },
  { id: '#4518', loja: 'Materiais RJ', produto: 'Calafetar', qtd: '30 un', valor: 'R$ 450', status: 'Pendente', data: '30/07/2026' },
  { id: '#4517', loja: 'BrasConstrução', produto: 'Cimento CP-II', qtd: '1.000 sacos', valor: 'R$ 31.900', status: 'Entregue', data: '29/07/2026' },
  { id: '#4516', loja: 'Construtec', produto: 'Argamassa AC-I', qtd: '100 cx', valor: 'R$ 3.200', status: 'Enviado', data: '29/07/2026' },
]

const statusStyle: Record<string, string> = {
  Pendente: 'bg-yellow-100 text-yellow-800',
  'Em produção': 'bg-blue-100 text-blue-800',
  Enviado: 'bg-orange-100 text-[#F05A28]',
  Entregue: 'bg-green-100 text-green-800',
}

const topProducts = [
  { nome: 'Cimento CP-II 50kg', volume: '8.420 sacos/mês', receita: 'R$ 267.358', pct: 100 },
  { nome: 'Argamassa AC-II 20kg', volume: '2.100 caixas/mês', receita: 'R$ 78.750', pct: 29 },
  { nome: 'Cimento CP-V 50kg', volume: '1.850 sacos/mês', receita: 'R$ 57.165', pct: 21 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-[#E5E5E5] p-5">
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm font-medium text-[#9E9E9E]">{kpi.label}</p>
              <div className="w-10 h-10 rounded-lg bg-[#FFF4F0] flex items-center justify-center shrink-0">
                {kpi.icon}
              </div>
            </div>
            <p className="text-2xl font-black text-[#1A1A1A] leading-none mb-1">{kpi.value}</p>
            <div className="flex items-center gap-1.5 mt-2">
              {kpi.change && (
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${kpi.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {kpi.change}
                </span>
              )}
              <span className="text-xs text-[#9E9E9E]">{kpi.changeLabel}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Orders table + Top Products */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-[#E5E5E5]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
            <h2 className="text-base font-black text-[#1A1A1A]">Pedidos Recentes</h2>
            <Link href="/pedidos" className="text-sm font-semibold text-[#F05A28] hover:underline">
              Ver todos
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#F2F2F2]">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Pedido</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Loja</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Produto</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Valor</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Data</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-[#F2F2F2] hover:bg-[#FAFAFA] transition-colors">
                    <td className="px-6 py-3.5 font-bold text-[#1A1A1A]">{order.id}</td>
                    <td className="px-4 py-3.5 text-[#1A1A1A]">{order.loja}</td>
                    <td className="px-4 py-3.5 text-[#9E9E9E]">{order.produto}<br /><span className="text-xs">{order.qtd}</span></td>
                    <td className="px-4 py-3.5 font-semibold text-[#1A1A1A] text-right">{order.valor}</td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#9E9E9E] text-xs">{order.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-[#E5E5E5]">
          <div className="px-6 py-4 border-b border-[#E5E5E5]">
            <h2 className="text-base font-black text-[#1A1A1A]">Produtos Mais Vendidos</h2>
            <p className="text-xs text-[#9E9E9E] mt-0.5">Agosto 2026</p>
          </div>
          <div className="px-6 py-4 space-y-5">
            {topProducts.map((p) => (
              <div key={p.nome}>
                <div className="flex items-start justify-between mb-1.5">
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] leading-tight">{p.nome}</p>
                    <p className="text-xs text-[#9E9E9E] mt-0.5">{p.volume}</p>
                  </div>
                  <p className="text-sm font-bold text-[#1A1A1A] shrink-0 ml-2">{p.receita}</p>
                </div>
                {/* CSS-only bar chart */}
                <div className="h-2 bg-[#F2F2F2] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#F05A28] rounded-full"
                    style={{ width: `${p.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Chart legend */}
          <div className="px-6 py-4 border-t border-[#F2F2F2]">
            <p className="text-xs text-[#9E9E9E] text-center">Volume relativo de vendas — agosto 2026</p>
          </div>
        </div>
      </div>
    </div>
  )
}
