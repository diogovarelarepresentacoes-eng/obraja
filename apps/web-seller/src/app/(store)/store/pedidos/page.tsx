const tabs = [
  { label: 'Todos', count: 47, key: 'todos' },
  { label: 'Aguardando', count: 6, key: 'aguardando' },
  { label: 'Em Separação', count: 4, key: 'separando' },
  { label: 'Saiu p/ Entrega', count: 3, key: 'saiu' },
  { label: 'Entregues', count: 29, key: 'entregues' },
  { label: 'Cancelados', count: 5, key: 'cancelados' },
]

const statusBadge: Record<string, string> = {
  Aguardando: 'bg-yellow-100 text-yellow-800',
  Separando: 'bg-blue-100 text-blue-800',
  Saiu: 'bg-orange-100 text-orange-800',
  Entregue: 'bg-green-100 text-green-800',
  Cancelado: 'bg-red-100 text-red-800',
}

const orders = [
  { id: '#8821', client: 'João Silva', contact: '(31) 9 9123-4567', items: 'Cimento CP-II (5 scs) + Areia', total: 'R$ 278,50', delivery: 'Frota própria', status: 'Aguardando', date: '01/08/2026' },
  { id: '#8820', client: 'Construtora Horizonte', contact: '(31) 3210-5544', items: 'Tinta Acrílica 18L (12 latas)', total: 'R$ 2.638,80', delivery: 'Expressa', status: 'Separando', date: '01/08/2026' },
  { id: '#8819', client: 'Maria Santos', contact: '(31) 9 9876-5432', items: 'Fio Elétrico 2,5mm 100m', total: 'R$ 189,00', delivery: 'Retirada', status: 'Saiu', date: '01/08/2026' },
  { id: '#8818', client: 'Pedro Alves', contact: '(31) 9 9654-3210', items: 'Argamassa (10 cx) + Cimento (20 scs)', total: 'R$ 1.033,00', delivery: 'Frota própria', status: 'Saiu', date: '01/08/2026' },
  { id: '#8817', client: 'Construtora Top Ltda.', contact: '(31) 3311-8800', items: 'Vergalhão CA-50 10mm (50 barras)', total: 'R$ 2.725,00', delivery: 'Expressa', status: 'Entregue', date: '31/07/2026' },
  { id: '#8816', client: 'Ana Lima', contact: '(31) 9 9111-2222', items: 'Tela Cerâmica 30×30 (4m²)', total: 'R$ 180,00', delivery: 'Frota própria', status: 'Entregue', date: '31/07/2026' },
  { id: '#8815', client: 'Reformas Belo Horizonte', contact: '(31) 3450-9900', items: 'Areia Média (3m³)', total: 'R$ 540,00', delivery: 'Frota própria', status: 'Entregue', date: '31/07/2026' },
  { id: '#8814', client: 'Carlos Drummond', contact: '(31) 9 9333-4444', items: 'Bloco Cerâmico (2.000 un)', total: 'R$ 1.900,00', delivery: 'Frota própria', status: 'Aguardando', date: '31/07/2026' },
  { id: '#8813', client: 'Engenharia Nova Era', contact: '(31) 3222-5566', items: 'Tubo PVC 100mm (20 barras)', total: 'R$ 1.098,00', delivery: 'Expressa', status: 'Separando', date: '30/07/2026' },
  { id: '#8812', client: 'Luciana Ferreira', contact: '(31) 9 9555-6677', items: 'Calafetar 300ml (10 un)', total: 'R$ 169,00', delivery: 'Retirada', status: 'Cancelado', date: '30/07/2026' },
  { id: '#8811', client: 'Construtora Pedra Branca', contact: '(31) 3100-4400', items: 'Telha Cerâmica (5.000 un)', total: 'R$ 16.000,00', delivery: 'Frota própria', status: 'Entregue', date: '30/07/2026' },
  { id: '#8810', client: 'Rafael Costa', contact: '(31) 9 9777-8888', items: 'Tela de Aço 6×2,4m (5 pç)', total: 'R$ 760,00', delivery: 'Frota própria', status: 'Aguardando', date: '29/07/2026' },
]

export default function PedidosPage() {
  return (
    <div className="space-y-5">
      {/* Filter tabs + actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap gap-1">
          {tabs.map((tab, i) => (
            <button
              key={tab.key}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors border ${
                i === 0
                  ? 'bg-[#F1591D] text-white border-[#F1591D]'
                  : 'bg-white text-[#9E9E9E] border-[#E5E5E5] hover:bg-[#F2F2F2]'
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                i === 0 ? 'bg-white text-[#F1591D]' : 'bg-[#F2F2F2] text-[#9E9E9E]'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9E9E]" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Buscar pedido ou cliente..."
              className="pl-9 pr-4 py-2 text-sm border border-[#E5E5E5] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F1591D] w-64"
            />
          </div>
          <button className="px-4 py-2 bg-[#F1591D] text-white text-sm font-bold rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap">
            + Novo Pedido Manual
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[10px] border border-[#E5E5E5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8F8F8] border-b border-[#E5E5E5]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Pedido</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Cliente</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Contato</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Itens</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Total</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Entrega</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Data</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F2F2]">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-4 py-3 font-bold text-[#1A1A1A]">{order.id}</td>
                  <td className="px-4 py-3 font-medium text-[#1A1A1A] whitespace-nowrap">{order.client}</td>
                  <td className="px-4 py-3 text-[#9E9E9E] whitespace-nowrap">{order.contact}</td>
                  <td className="px-4 py-3 text-[#9E9E9E] max-w-[180px] truncate">{order.items}</td>
                  <td className="px-4 py-3 font-semibold text-[#1A1A1A] whitespace-nowrap">{order.total}</td>
                  <td className="px-4 py-3 text-[#9E9E9E] whitespace-nowrap">{order.delivery}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${statusBadge[order.status] ?? 'bg-gray-100 text-gray-800'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#9E9E9E] whitespace-nowrap">{order.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {/* Eye */}
                      <button title="Ver detalhes" className="p-1.5 rounded-lg hover:bg-[#F2F2F2] text-[#9E9E9E] hover:text-[#1A1A1A] transition-colors">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      {/* Truck */}
                      <button title="Atribuir entrega" className="p-1.5 rounded-lg hover:bg-blue-50 text-[#9E9E9E] hover:text-blue-600 transition-colors">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <rect x="1" y="3" width="15" height="13" rx="1" />
                          <path d="M16 8h4l3 3v5h-7V8z" />
                          <circle cx="5.5" cy="18.5" r="2.5" />
                          <circle cx="18.5" cy="18.5" r="2.5" />
                        </svg>
                      </button>
                      {/* X */}
                      <button title="Cancelar pedido" className="p-1.5 rounded-lg hover:bg-red-50 text-[#9E9E9E] hover:text-red-500 transition-colors">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E5E5E5] flex items-center justify-between bg-[#F8F8F8]">
          <p className="text-sm font-semibold text-[#1A1A1A]">
            Total do período: <span className="text-[#F1591D]">R$ 127.450,80</span>
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-[#E5E5E5] text-sm text-[#9E9E9E] hover:bg-white transition-colors">
              ← Anterior
            </button>
            <span className="px-3 py-1.5 rounded-lg bg-[#F1591D] text-white text-sm font-bold">1</span>
            <button className="px-3 py-1.5 rounded-lg border border-[#E5E5E5] text-sm text-[#9E9E9E] hover:bg-white transition-colors">2</button>
            <button className="px-3 py-1.5 rounded-lg border border-[#E5E5E5] text-sm text-[#9E9E9E] hover:bg-white transition-colors">3</button>
            <button className="px-3 py-1.5 rounded-lg border border-[#E5E5E5] text-sm text-[#9E9E9E] hover:bg-white transition-colors">
              Próxima →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
