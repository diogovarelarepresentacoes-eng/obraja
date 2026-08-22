const KpiIcon = ({ type }: { type: string }) => {
  if (type === 'pedidos') return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
  if (type === 'receita') return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  )
  if (type === 'produtos') return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  )
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  )
}

const kpis = [
  {
    label: 'Pedidos Hoje',
    value: '18',
    change: '+8% vs ontem',
    changePositive: true,
    iconType: 'pedidos',
    iconColor: '#F05A28',
    iconBg: 'rgba(240,90,40,0.1)',
  },
  {
    label: 'Receita do Mês',
    value: 'R$ 127.450',
    change: '+15% vs mês anterior',
    changePositive: true,
    iconType: 'receita',
    iconColor: '#059669',
    iconBg: 'rgba(5,150,105,0.1)',
  },
  {
    label: 'Produtos Ativos',
    value: '234',
    change: 'no catálogo',
    changePositive: true,
    iconType: 'produtos',
    iconColor: '#2563EB',
    iconBg: 'rgba(37,99,235,0.1)',
  },
  {
    label: 'Entregadores Disponíveis',
    value: '5 de 7',
    change: '2 em rota agora',
    changePositive: true,
    iconType: 'entregadores',
    iconColor: '#7C3AED',
    iconBg: 'rgba(124,58,237,0.1)',
  },
]

const statusCards = [
  { label: 'Aguardando confirmação', count: 6, color: 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]', dot: '#FFB800' },
  { label: 'Em separação', count: 4, color: 'bg-blue-50 text-blue-800 border-blue-200', dot: '#3B82F6' },
  { label: 'Saiu para entrega', count: 3, color: 'bg-[#FFF3EE] text-[#9A3412] border-[#FDBA74]', dot: '#F05A28' },
  { label: 'Entregues hoje', count: 5, color: 'bg-emerald-50 text-emerald-800 border-emerald-200', dot: '#22C55E' },
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
    actionStyle: 'bg-[#F05A28] text-white hover:bg-[#CC4010]',
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

const StatusDot = ({ status }: { status: 'online' | 'away' | 'critical' | 'warning' }) => {
  const colors: Record<string, string> = {
    online: '#22C55E',
    away: '#F05A28',
    critical: '#EF4444',
    warning: '#FFB800',
  }
  return (
    <span className="inline-block w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: colors[status] }} />
  )
}

const deliverers = [
  { name: 'Carlos Mendes', vehicle: 'Moto Honda CG', status: 'Disponível', statusType: 'online' as const, statusColor: 'text-green-600', count: 3 },
  { name: 'Roberto Souza', vehicle: 'Moto Yamaha', status: 'Em rota', statusType: 'away' as const, statusColor: 'text-orange-500', extra: 'Est. retorno: 14h30', count: null },
  { name: 'Marcos Lima', vehicle: 'Fiorino', status: 'Em rota', statusType: 'away' as const, statusColor: 'text-orange-500', extra: 'Est. retorno: 15h00', count: null },
  { name: 'Paulo Costa', vehicle: 'Moto Honda', status: 'Disponível', statusType: 'online' as const, statusColor: 'text-green-600', count: 2 },
  { name: 'André Silva', vehicle: 'Van Sprinter', status: 'Disponível', statusType: 'online' as const, statusColor: 'text-green-600', count: 1 },
]

const stockAlerts = [
  { level: 'critical', product: 'Cimento CP-II 50kg', qty: '45 sacos', min: '200', color: 'text-red-600' },
  { level: 'warning', product: 'Tinta Coral 18L Branco', qty: '12 latas', min: '30', color: 'text-yellow-600' },
]

export default function StoreDashboardPage() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-[#E5E5E5] p-5 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: kpi.iconBg, color: kpi.iconColor }}>
              <KpiIcon type={kpi.iconType} />
            </div>
            <div>
              <p className="text-sm text-[#9E9E9E] font-medium">{kpi.label}</p>
              <p className="text-2xl font-black text-[#1A1A1A] mt-0.5">{kpi.value}</p>
              <p className={`text-xs mt-1 font-medium ${kpi.changePositive ? 'text-emerald-600' : 'text-red-500'}`}>
                {kpi.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Status row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {statusCards.map((s) => (
          <div key={s.label} className={`rounded-lg border px-4 py-3 flex items-center gap-3 ${s.color}`}>
            <span className="inline-block w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.dot }} />
            <span className="text-sm font-medium flex-1 leading-tight">{s.label}</span>
            <span className="text-xl font-black shrink-0">{s.count}</span>
          </div>
        ))}
      </div>

      {/* Pedidos Recentes */}
      <div className="bg-white rounded-[10px] border border-[#E5E5E5] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between">
          <h2 className="text-base font-bold text-[#1A1A1A]">Pedidos Recentes</h2>
          <a href="/store/pedidos" className="text-sm text-[#F05A28] font-semibold hover:underline">
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
          <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between">
            <h2 className="text-base font-bold text-[#1A1A1A]">Entregadores</h2>
            <span className="text-xs text-[#9E9E9E]">
              {deliverers.filter(d => d.statusType === 'online').length} disponíveis · {deliverers.filter(d => d.statusType === 'away').length} em rota
            </span>
          </div>
          <div className="divide-y divide-[#F2F2F2]">
            {deliverers.map((d) => (
              <div key={d.name} className="px-6 py-3.5 flex items-center gap-4 hover:bg-[#FAFAFA] transition-colors">
                <StatusDot status={d.statusType} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-[#1A1A1A] text-sm">{d.name}</span>
                    <span className="text-xs text-[#9E9E9E] truncate">{d.vehicle}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-xs font-semibold ${d.statusColor}`}>{d.status}</p>
                  {d.count !== null && (
                    <p className="text-xs text-[#9E9E9E] mt-0.5">{d.count} entrega{d.count !== 1 ? 's' : ''} hoje</p>
                  )}
                  {d.extra && (
                    <p className="text-xs text-[#9E9E9E] mt-0.5">{d.extra}</p>
                  )}
                </div>
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
                  <StatusDot status={alert.level === 'critical' ? 'critical' : 'warning'} />
                  <div>
                    <p className={`text-sm font-semibold ${alert.color}`}>{alert.product}</p>
                    <p className="text-xs text-[#9E9E9E] mt-0.5">
                      Apenas {alert.qty} — mínimo: {alert.min}
                    </p>
                  </div>
                </div>
                <a href="/store/reposicao" className="mt-2 inline-block text-xs font-semibold text-[#F05A28] hover:underline">
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
