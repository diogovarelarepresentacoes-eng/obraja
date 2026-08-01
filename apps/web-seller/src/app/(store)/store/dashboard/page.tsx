const kpis = [
  {
    label: 'Pedidos Hoje',
    value: '18',
    change: '↑ 8% vs ontem',
    changePositive: true,
    icon: '📦',
    iconBg: 'bg-orange-100',
  },
  {
    label: 'Receita do Mês',
    value: 'R$ 127.450',
    change: '↑ 15% vs mês anterior',
    changePositive: true,
    icon: '💰',
    iconBg: 'bg-green-100',
  },
  {
    label: 'Produtos Ativos',
    value: '234',
    change: 'no catálogo',
    changePositive: true,
    icon: '🏷️',
    iconBg: 'bg-blue-100',
  },
  {
    label: 'Entregadores Disponíveis',
    value: '5 de 7',
    change: '2 em rota agora',
    changePositive: true,
    icon: '🛵',
    iconBg: 'bg-purple-100',
  },
]

const statusCards = [
  { label: 'Aguardando confirmação', count: 6, color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { label: 'Em separação', count: 4, color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { label: 'Saiu para entrega', count: 3, color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { label: 'Entregues hoje', count: 5, color: 'bg-green-100 text-green-800 border-green-200' },
]

const recentOrders = [
  {
    id: '#8821',
    client: 'João Silva',
    items: 'Cimento CP-II (5 scs) + Areia',
    total: 'R$ 278,50',
    delivery: 'Frota própria',
    status: 'Aguardando',
    statusColor: 'bg-yellow-100 text-yellow-800',
    action: 'Confirmar',
    actionStyle: 'bg-[#F1591D] text-white hover:bg-orange-600',
  },
  {
    id: '#8820',
    client: 'Construtora Horizonte',
    items: 'Tinta 18L (12 latas)',
    total: 'R$ 2.638,80',
    delivery: 'Expressa',
    status: 'Em separação',
    statusColor: 'bg-blue-100 text-blue-800',
    action: 'Ver',
    actionStyle: 'bg-[#F2F2F2] text-[#1A1A1A] hover:bg-gray-200',
  },
  {
    id: '#8819',
    client: 'Maria Santos',
    items: 'Fio Elétrico 2,5mm',
    total: 'R$ 189,00',
    delivery: 'Retirada',
    status: 'Saiu',
    statusColor: 'bg-orange-100 text-orange-800',
    action: 'Rastrear',
    actionStyle: 'bg-blue-500 text-white hover:bg-blue-600',
  },
  {
    id: '#8818',
    client: 'Pedro Alves',
    items: 'Argamassa (10 cx) + Cimento (20 scs)',
    total: 'R$ 1.033,00',
    delivery: 'Frota própria',
    status: 'Saiu',
    statusColor: 'bg-orange-100 text-orange-800',
    action: 'Rastrear',
    actionStyle: 'bg-blue-500 text-white hover:bg-blue-600',
  },
  {
    id: '#8817',
    client: 'Construtora Top',
    items: 'Vergalhão CA-50 (50 barras)',
    total: 'R$ 2.725,00',
    delivery: 'Expressa',
    status: 'Entregue',
    statusColor: 'bg-green-100 text-green-800',
    action: 'Ver',
    actionStyle: 'bg-[#F2F2F2] text-[#1A1A1A] hover:bg-gray-200',
  },
  {
    id: '#8816',
    client: 'Ana Lima',
    items: 'Tela Cerâmica 30×30 (4m²)',
    total: 'R$ 180,00',
    delivery: 'Frota própria',
    status: 'Entregue',
    statusColor: 'bg-green-100 text-green-800',
    action: 'Ver',
    actionStyle: 'bg-[#F2F2F2] text-[#1A1A1A] hover:bg-gray-200',
  },
]

const deliverers = [
  { name: 'Carlos Mendes', vehicle: 'Moto Honda CG', status: 'Disponível', statusColor: 'text-green-500', dot: '🟢', count: 3 },
  { name: 'Roberto Souza', vehicle: 'Moto Yamaha', status: 'Em rota', statusColor: 'text-orange-500', dot: '🟠', extra: 'Est. retorno: 14h30', count: null },
  { name: 'Marcos Lima', vehicle: 'Fiorino', status: 'Em rota', statusColor: 'text-orange-500', dot: '🟠', extra: 'Est. retorno: 15h00', count: null },
  { name: 'Paulo Costa', vehicle: 'Moto Honda', status: 'Disponível', statusColor: 'text-green-500', dot: '🟢', count: 2 },
  { name: 'André Silva', vehicle: 'Van Sprinter', status: 'Disponível', statusColor: 'text-green-500', dot: '🟢', count: 1 },
]

const stockAlerts = [
  { level: 'critical', product: 'Cimento CP-II 50kg', qty: '45 sacos', min: '200', color: 'text-red-600', dot: '🔴' },
  { level: 'warning', product: 'Tinta Coral 18L Branco', qty: '12 latas', min: '30', color: 'text-yellow-600', dot: '🟡' },
]

export default function StoreDashboardPage() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-[10px] border border-[#E5E5E5] p-5 flex items-start gap-4">
            <div className={`w-12 h-12 rounded-lg ${kpi.iconBg} flex items-center justify-center text-2xl shrink-0`}>
              {kpi.icon}
            </div>
            <div>
              <p className="text-sm text-[#9E9E9E] font-medium">{kpi.label}</p>
              <p className="text-2xl font-black text-[#1A1A1A] mt-0.5">{kpi.value}</p>
              <p className={`text-xs mt-1 font-medium ${kpi.changePositive ? 'text-green-600' : 'text-red-500'}`}>
                {kpi.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Status row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {statusCards.map((s) => (
          <div key={s.label} className={`rounded-lg border px-4 py-3 flex items-center justify-between ${s.color}`}>
            <span className="text-sm font-medium">{s.label}</span>
            <span className="text-2xl font-black">{s.count}</span>
          </div>
        ))}
      </div>

      {/* Pedidos Recentes */}
      <div className="bg-white rounded-[10px] border border-[#E5E5E5] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between">
          <h2 className="text-base font-bold text-[#1A1A1A]">Pedidos Recentes</h2>
          <a href="/store/pedidos" className="text-sm text-[#F1591D] font-semibold hover:underline">
            Ver todos →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8F8F8] border-b border-[#E5E5E5]">
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Pedido</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Cliente</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Itens</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Total</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Entrega</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F2F2]">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-6 py-4 font-bold text-[#1A1A1A]">{order.id}</td>
                  <td className="px-4 py-4 text-[#1A1A1A]">{order.client}</td>
                  <td className="px-4 py-4 text-[#9E9E9E] max-w-[200px] truncate">{order.items}</td>
                  <td className="px-4 py-4 font-semibold text-[#1A1A1A]">{order.total}</td>
                  <td className="px-4 py-4 text-[#9E9E9E]">{order.delivery}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${order.actionStyle}`}>
                      {order.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom row: Entregadores + Alertas */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Entregadores */}
        <div className="xl:col-span-2 bg-white rounded-[10px] border border-[#E5E5E5] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E5E5E5]">
            <h2 className="text-base font-bold text-[#1A1A1A]">Entregadores</h2>
          </div>
          <div className="p-4 flex flex-wrap gap-3">
            {deliverers.map((d) => (
              <div key={d.name} className="flex-1 min-w-[180px] bg-[#F8F8F8] rounded-lg p-4 border border-[#E5E5E5]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{d.dot}</span>
                  <span className="font-semibold text-[#1A1A1A] text-sm">{d.name}</span>
                </div>
                <p className="text-xs text-[#9E9E9E]">{d.vehicle}</p>
                <p className={`text-xs font-semibold mt-1 ${d.statusColor}`}>{d.status}</p>
                {d.count !== null && (
                  <p className="text-xs text-[#9E9E9E] mt-1">{d.count} entregas hoje</p>
                )}
                {d.extra && (
                  <p className="text-xs text-[#9E9E9E] mt-1">{d.extra}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Alertas de Estoque */}
        <div className="bg-white rounded-[10px] border border-[#E5E5E5] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center gap-2">
            <svg width="16" height="16" fill="none" stroke="#EF4444" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <h2 className="text-base font-bold text-[#1A1A1A]">Alertas de Estoque</h2>
          </div>
          <div className="p-4 space-y-3">
            {stockAlerts.map((alert) => (
              <div
                key={alert.product}
                className={`rounded-lg p-4 border ${
                  alert.level === 'critical'
                    ? 'bg-red-50 border-red-200'
                    : 'bg-yellow-50 border-yellow-200'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-base">{alert.dot}</span>
                  <div>
                    <p className={`text-sm font-semibold ${alert.color}`}>{alert.product}</p>
                    <p className="text-xs text-[#9E9E9E] mt-0.5">
                      Apenas {alert.qty} — mínimo: {alert.min}
                    </p>
                  </div>
                </div>
                <a href="/store/reposicao" className="mt-2 inline-block text-xs font-semibold text-[#F1591D] hover:underline">
                  Pedir reposição →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
