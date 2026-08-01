const orders = [
  { id: '#4521', loja: 'Materiais Belo', itens: 'Cimento CP-II × 200 sacos', total: 'R$ 6.580,00', status: 'Em produção', data: '01/08/2026' },
  { id: '#4520', loja: 'Construfácil Sul', itens: 'Argamassa AC-II × 50 cx', total: 'R$ 1.875,00', status: 'Enviado', data: '31/07/2026' },
  { id: '#4519', loja: 'DepósitoMax', itens: 'Cimento CP-V × 500 sacos', total: 'R$ 15.450,00', status: 'Entregue', data: '30/07/2026' },
  { id: '#4518', loja: 'Materiais RJ', itens: 'Calafetar × 30 un', total: 'R$ 450,00', status: 'Pendente', data: '30/07/2026' },
  { id: '#4517', loja: 'BrasConstrução', itens: 'Cimento CP-II × 1.000 sacos', total: 'R$ 31.900,00', status: 'Entregue', data: '29/07/2026' },
  { id: '#4516', loja: 'Construtec', itens: 'Argamassa AC-I × 100 cx', total: 'R$ 3.200,00', status: 'Enviado', data: '29/07/2026' },
  { id: '#4515', loja: 'CasaFácil Nordeste', itens: 'Bloco Cerâmico × 10.000 un', total: 'R$ 8.900,00', status: 'Entregue', data: '28/07/2026' },
  { id: '#4514', loja: 'Materiais Centro-Oeste', itens: 'Cimento CP-II × 300 sacos', total: 'R$ 9.570,00', status: 'Em produção', data: '28/07/2026' },
  { id: '#4513', loja: 'DepósitoMax', itens: 'Tela de Aço × 20 pç', total: 'R$ 2.960,00', status: 'Enviado', data: '27/07/2026' },
  { id: '#4512', loja: 'Construfácil Sul', itens: 'Calafetar × 100 un', total: 'R$ 1.500,00', status: 'Pendente', data: '27/07/2026' },
  { id: '#4511', loja: 'BrasConstrução', itens: 'Argamassa AC-II × 200 cx', total: 'R$ 7.500,00', status: 'Entregue', data: '26/07/2026' },
  { id: '#4510', loja: 'Materiais Belo', itens: 'Cimento CP-V × 150 sacos', total: 'R$ 4.635,00', status: 'Entregue', data: '25/07/2026' },
]

const statusStyle: Record<string, string> = {
  Pendente: 'bg-yellow-100 text-yellow-800',
  'Em produção': 'bg-blue-100 text-blue-800',
  Enviado: 'bg-orange-100 text-[#F05A28]',
  Entregue: 'bg-green-100 text-green-800',
}

const tabs = [
  { label: 'Todos', count: 47 },
  { label: 'Pendentes', count: 5 },
  { label: 'Em Produção', count: 8 },
  { label: 'Enviados', count: 12 },
  { label: 'Entregues', count: 22 },
]

export default function PedidosPage() {
  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div />
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E5E5] rounded-lg text-sm font-semibold text-[#1A1A1A] hover:bg-[#F2F2F2] transition-colors">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Exportar CSV
        </button>
      </div>

      {/* Filter tabs */}
      <div className="bg-white rounded-xl border border-[#E5E5E5]">
        <div className="flex items-center gap-1 px-4 pt-4 border-b border-[#E5E5E5] overflow-x-auto">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors -mb-px ${
                i === 0
                  ? 'border-[#F05A28] text-[#F05A28]'
                  : 'border-transparent text-[#9E9E9E] hover:text-[#1A1A1A]'
              }`}
            >
              {tab.label}
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                i === 0 ? 'bg-[#FFF4F0] text-[#F05A28]' : 'bg-[#F2F2F2] text-[#9E9E9E]'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search + date filter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-4 py-3 border-b border-[#F2F2F2]">
          <div className="relative flex-1 w-full">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9E9E]" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Buscar pedido, loja ou produto..."
              className="w-full pl-9 pr-4 py-2 border border-[#E5E5E5] rounded-lg text-sm text-[#1A1A1A] placeholder-[#9E9E9E] focus:outline-none focus:border-[#F05A28]"
            />
          </div>
          <input
            type="date"
            defaultValue="2026-08-01"
            className="px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm text-[#1A1A1A] focus:outline-none focus:border-[#F05A28]"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F2F2F2]">
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Pedido</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Loja</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Itens</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Total</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Data</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Ação</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-[#F2F2F2] hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-4 py-3.5">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-4 py-3.5 font-bold text-[#1A1A1A]">{order.id}</td>
                  <td className="px-4 py-3.5 font-medium text-[#1A1A1A]">{order.loja}</td>
                  <td className="px-4 py-3.5 text-[#9E9E9E] max-w-[200px] truncate">{order.itens}</td>
                  <td className="px-4 py-3.5 font-bold text-[#1A1A1A] text-right">{order.total}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-[#9E9E9E] text-xs">{order.data}</td>
                  <td className="px-4 py-3.5">
                    <button className="px-3 py-1.5 text-xs font-semibold border border-[#E5E5E5] rounded-lg text-[#1A1A1A] hover:border-[#F05A28] hover:text-[#F05A28] transition-colors">
                      Ver detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#F2F2F2]">
          <p className="text-sm text-[#9E9E9E]">Mostrando <span className="font-semibold text-[#1A1A1A]">1–12</span> de <span className="font-semibold text-[#1A1A1A]">47</span> pedidos</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-sm border border-[#E5E5E5] rounded-lg text-[#9E9E9E] hover:bg-[#F2F2F2]">‹</button>
            <button className="px-3 py-1.5 text-sm border border-[#F05A28] rounded-lg bg-[#F05A28] text-white font-semibold">1</button>
            <button className="px-3 py-1.5 text-sm border border-[#E5E5E5] rounded-lg text-[#1A1A1A] hover:bg-[#F2F2F2]">2</button>
            <button className="px-3 py-1.5 text-sm border border-[#E5E5E5] rounded-lg text-[#1A1A1A] hover:bg-[#F2F2F2]">3</button>
            <button className="px-3 py-1.5 text-sm border border-[#E5E5E5] rounded-lg text-[#9E9E9E] hover:bg-[#F2F2F2]">›</button>
          </div>
        </div>
      </div>
    </div>
  )
}
