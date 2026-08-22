const orders = [
  { id: '#2891', supplier: 'Materiais Belo', item: 'Cimento CP-II (500 sacos)', value: 'R$ 15.950', status: 'Em entrega', date: '01/08/2026', statusColor: '#f97316', statusBg: '#fff7ed' },
  { id: '#2890', supplier: 'DepósitoMax', item: 'Tinta Acrílica (48 latas)', value: 'R$ 10.555', status: 'Entregue', date: '31/07/2026', statusColor: '#16a34a', statusBg: '#f0fdf4' },
  { id: '#2889', supplier: 'Construfácil Sul', item: 'Fio Elétrico 2,5mm (20 rolos)', value: 'R$ 3.780', status: 'Entregue', date: '29/07/2026', statusColor: '#16a34a', statusBg: '#f0fdf4' },
  { id: '#2888', supplier: 'Materiais Belo', item: 'Argamassa AC-II (200 cx)', value: 'R$ 7.500', status: 'Entregue', date: '27/07/2026', statusColor: '#16a34a', statusBg: '#f0fdf4' },
  { id: '#2887', supplier: 'Indústria Votorantim', item: 'Cimento CP-V (2000 sacos)', value: 'R$ 61.800', status: 'Entregue', date: '20/07/2026', statusColor: '#16a34a', statusBg: '#f0fdf4' },
  { id: '#2886', supplier: 'Construfácil Sul', item: 'Rejunte Branco (50 cx)', value: 'R$ 2.100', status: 'Cancelado', date: '18/07/2026', statusColor: '#ef4444', statusBg: '#fef2f2' },
  { id: '#2885', supplier: 'DepósitoMax', item: 'Cerâmica 60x60 (300 m²)', value: 'R$ 24.000', status: 'Entregue', date: '15/07/2026', statusColor: '#16a34a', statusBg: '#f0fdf4' },
  { id: '#2884', supplier: 'Materiais Belo', item: 'Tijolos 9x19x29 (5000 un)', value: 'R$ 8.500', status: 'Entregue', date: '12/07/2026', statusColor: '#16a34a', statusBg: '#f0fdf4' },
  { id: '#2883', supplier: 'Ind. Itambé', item: 'Cimento CP-III (1000 sacos)', value: 'R$ 29.800', status: 'Entregue', date: '08/07/2026', statusColor: '#16a34a', statusBg: '#f0fdf4' },
  { id: '#2882', supplier: 'Construfácil Sul', item: 'Telha Fibrocimento (200 un)', value: 'R$ 6.200', status: 'Entregue', date: '04/07/2026', statusColor: '#16a34a', statusBg: '#f0fdf4' },
  { id: '#2881', supplier: 'Materiais RJ', item: 'Porta de Madeira (8 un)', value: 'R$ 4.800', status: 'Entregue', date: '01/07/2026', statusColor: '#16a34a', statusBg: '#f0fdf4' },
  { id: '#2880', supplier: 'DepósitoMax', item: 'Piso Vinílico (500 m²)', value: 'R$ 59.885', status: 'Aguardando', date: '28/06/2026', statusColor: '#eab308', statusBg: '#fefce8' },
]

const tabs = [
  { label: 'Todos', count: 12 },
  { label: 'Em Aberto', count: 2 },
  { label: 'Em Entrega', count: 1 },
  { label: 'Entregues', count: 8 },
  { label: 'Cancelados', count: 1 },
]

export default function PedidosPage() {
  return (
    <main className="flex-1 px-8 py-8" style={{ marginTop: 64 }}>
      {/* Filters Row */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        {/* Tabs */}
        <div
          className="flex items-center rounded-lg overflow-hidden"
          style={{ background: '#F2F2F2', padding: 4, gap: 2 }}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              className="px-4 py-2 rounded-md text-sm font-semibold transition-colors flex items-center gap-1.5"
              style={
                i === 0
                  ? { background: '#fff', color: '#1A1A1A', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }
                  : { background: 'transparent', color: '#9E9E9E' }
              }
            >
              {tab.label}
              <span
                className="text-xs rounded-full px-1.5 py-0.5"
                style={
                  i === 0
                    ? { background: '#F05A28', color: '#fff' }
                    : { background: '#E5E5E5', color: '#9E9E9E' }
                }
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search + Date */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#9E9E9E"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar pedido ou fornecedor..."
              className="pl-9 pr-4 py-2 rounded-lg text-sm outline-none"
              style={{
                background: '#fff',
                border: '1px solid #E5E5E5',
                color: '#1A1A1A',
                width: 260,
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="date"
              className="px-3 py-2 rounded-lg text-sm outline-none"
              style={{ background: '#fff', border: '1px solid #E5E5E5', color: '#1A1A1A' }}
              defaultValue="2026-07-01"
            />
            <span style={{ color: '#9E9E9E' }}>—</span>
            <input
              type="date"
              className="px-3 py-2 rounded-lg text-sm outline-none"
              style={{ background: '#fff', border: '1px solid #E5E5E5', color: '#1A1A1A' }}
              defaultValue="2026-08-01"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ background: '#fff', border: '1px solid #F2F2F2' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: '#F8F8F8', borderBottom: '1px solid #F2F2F2' }}>
              <th className="text-left px-6 py-3.5 font-semibold text-xs uppercase tracking-wide" style={{ color: '#9E9E9E' }}>Pedido</th>
              <th className="text-left px-4 py-3.5 font-semibold text-xs uppercase tracking-wide" style={{ color: '#9E9E9E' }}>Fornecedor</th>
              <th className="text-left px-4 py-3.5 font-semibold text-xs uppercase tracking-wide" style={{ color: '#9E9E9E' }}>Itens</th>
              <th className="text-right px-4 py-3.5 font-semibold text-xs uppercase tracking-wide" style={{ color: '#9E9E9E' }}>Valor Total</th>
              <th className="text-left px-4 py-3.5 font-semibold text-xs uppercase tracking-wide" style={{ color: '#9E9E9E' }}>Status</th>
              <th className="text-left px-4 py-3.5 font-semibold text-xs uppercase tracking-wide" style={{ color: '#9E9E9E' }}>Data</th>
              <th className="text-center px-4 py-3.5 font-semibold text-xs uppercase tracking-wide" style={{ color: '#9E9E9E' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t transition-colors hover:bg-gray-50"
                style={{ borderColor: '#F2F2F2' }}
              >
                <td className="px-6 py-3.5 font-bold" style={{ color: '#1A1A1A' }}>
                  {order.id}
                </td>
                <td className="px-4 py-3.5 font-medium" style={{ color: '#1A1A1A' }}>
                  {order.supplier}
                </td>
                <td className="px-4 py-3.5 max-w-[200px]">
                  <span className="truncate block" style={{ color: '#9E9E9E' }}>
                    {order.item}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right font-bold" style={{ color: '#1A1A1A' }}>
                  {order.value}
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
                    style={{ color: order.statusColor, background: order.statusBg }}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap" style={{ color: '#9E9E9E' }}>
                  {order.date}
                </td>
                <td className="px-4 py-3.5 text-center">
                  <button
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:opacity-90"
                    style={{ background: '#F2F2F2', color: '#1A1A1A' }}
                  >
                    Ver Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div
          className="px-6 py-4 flex items-center justify-between border-t"
          style={{ borderColor: '#F2F2F2', background: '#F8F8F8' }}
        >
          <div className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>
            Total do período:{' '}
            <span style={{ color: '#F05A28' }}>R$ 234.870</span>
          </div>
          {/* Pagination */}
          <div className="flex items-center gap-1">
            <button
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors hover:bg-gray-100"
              style={{ color: '#9E9E9E' }}
            >
              ‹
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold transition-colors"
                style={
                  p === 1
                    ? { background: '#F05A28', color: '#fff' }
                    : { color: '#9E9E9E' }
                }
              >
                {p}
              </button>
            ))}
            <button
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors hover:bg-gray-100"
              style={{ color: '#9E9E9E' }}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
