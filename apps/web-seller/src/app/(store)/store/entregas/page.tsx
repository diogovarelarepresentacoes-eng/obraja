import type { DeliveryDisplayStatus } from '@obraja/shared'

type FleetMember = {
  name: string
  vehicle: string
  type: string
  plate: string
  status: DeliveryDisplayStatus
  deliveries: number
  rating: string
  action: string
  actionStyle: string
}

const summary = [
  { label: 'Total', count: 11, color: 'text-[#1A1A1A]' },
  { label: 'Em rota', count: 3, color: 'text-orange-600' },
  { label: 'Entregues', count: 5, color: 'text-green-600' },
  { label: 'Agendadas', count: 3, color: 'text-blue-600' },
]

const activeDeliveries = [
  {
    id: 'E-291',
    client: 'João Silva',
    address: 'Rua das Flores, 142 — Sta. Efigênia',
    deliverer: 'Carlos Mendes',
    vehicle: 'Moto',
    departed: '13h45',
    eta: '14h30',
  },
  {
    id: 'E-290',
    client: 'Construtora Horizonte',
    address: 'Av. Cristiano Machado, 2200 — Floramar',
    deliverer: 'Roberto Souza',
    vehicle: 'Moto',
    departed: '13h20',
    eta: '14h15',
  },
  {
    id: 'E-289',
    client: 'Pedro Alves',
    address: 'Rua Padre Eustáquio, 804 — P. Eustáquio',
    deliverer: 'Marcos Lima',
    vehicle: 'Fiorino',
    departed: '12h30',
    eta: '14h00',
  },
]

const DOT_COLORS: Record<DeliveryDisplayStatus, string> = {
  'Em rota': '#F05A28',
  Disponível: '#22C55E',
  Folga: '#EF4444',
}

const StatusDot = ({ status }: { status: DeliveryDisplayStatus }) => (
  <span className="inline-block w-2 h-2 rounded-full shrink-0 mr-1.5" style={{ backgroundColor: DOT_COLORS[status] ?? '#9E9E9E' }} />
)

const fleetStatus: Record<DeliveryDisplayStatus, { label: string; textColor: string; rowBg: string }> = {
  'Em rota': { label: 'Em rota', textColor: 'text-orange-600', rowBg: 'bg-orange-50' },
  Disponível: { label: 'Disponível', textColor: 'text-green-600', rowBg: '' },
  Folga: { label: 'Folga', textColor: 'text-red-500', rowBg: 'bg-red-50' },
}

const fleet: FleetMember[] = [
  { name: 'Carlos Mendes', vehicle: 'Honda CG 160', type: 'Moto', plate: 'ABC-1234', status: 'Em rota', deliveries: 2, rating: '4.8', action: 'Detalhes', actionStyle: 'bg-[#F2F2F2] text-[#1A1A1A] hover:bg-gray-200' },
  { name: 'Roberto Souza', vehicle: 'Yamaha Factor', type: 'Moto', plate: 'DEF-5678', status: 'Em rota', deliveries: 1, rating: '4.6', action: 'Detalhes', actionStyle: 'bg-[#F2F2F2] text-[#1A1A1A] hover:bg-gray-200' },
  { name: 'Marcos Lima', vehicle: 'Fiat Fiorino', type: 'Van', plate: 'GHI-9012', status: 'Em rota', deliveries: 1, rating: '4.7', action: 'Detalhes', actionStyle: 'bg-[#F2F2F2] text-[#1A1A1A] hover:bg-gray-200' },
  { name: 'Paulo Costa', vehicle: 'Honda Pop', type: 'Moto', plate: 'JKL-3456', status: 'Disponível', deliveries: 2, rating: '4.9', action: 'Escalar', actionStyle: 'bg-[#F05A28] text-white hover:bg-orange-600' },
  { name: 'André Silva', vehicle: 'Mercedes Sprinter', type: 'Van', plate: 'MNO-7890', status: 'Disponível', deliveries: 1, rating: '4.8', action: 'Escalar', actionStyle: 'bg-[#F05A28] text-white hover:bg-orange-600' },
  { name: 'Felipe Torres', vehicle: 'Biz 125', type: 'Moto', plate: 'PQR-1234', status: 'Folga', deliveries: 0, rating: '4.5', action: 'Chamar', actionStyle: 'bg-blue-500 text-white hover:bg-blue-600' },
  { name: 'Lucas Ferreira', vehicle: 'Biz 125', type: 'Moto', plate: 'STU-5678', status: 'Folga', deliveries: 0, rating: '4.3', action: 'Chamar', actionStyle: 'bg-blue-500 text-white hover:bg-blue-600' },
]

export default function EntregasPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <button className="px-4 py-2 bg-[#F05A28] text-white text-sm font-bold rounded-lg">
            Entregas de Hoje
          </button>
          <button className="px-4 py-2 bg-white border border-[#E5E5E5] text-sm font-semibold text-[#9E9E9E] rounded-lg hover:bg-[#F2F2F2] transition-colors">
            Minha Frota
          </button>
          <button className="px-4 py-2 bg-white border border-[#E5E5E5] text-sm font-semibold text-[#9E9E9E] rounded-lg hover:bg-[#F2F2F2] transition-colors">
            Terceirizadas
          </button>
        </div>
        <button className="px-4 py-2 bg-[#F05A28] text-white text-sm font-bold rounded-lg hover:bg-orange-600 transition-colors">
          + Cadastrar Entregador
        </button>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {summary.map((s) => (
          <div key={s.label} className="bg-white rounded-[10px] border border-[#E5E5E5] px-5 py-4 text-center">
            <p className={`text-3xl font-black ${s.color}`}>{s.count}</p>
            <p className="text-xs text-[#9E9E9E] font-medium mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Map placeholder + active deliveries */}
      <div className="bg-white rounded-[10px] border border-[#E5E5E5] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E5E5]">
          <h2 className="text-base font-bold text-[#1A1A1A]">Entregas Ativas — Rastreamento em Tempo Real</h2>
        </div>

        {/* Map placeholder */}
        <div className="bg-[#1A1A1A] h-[260px] flex flex-col items-center justify-center gap-3 relative">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" fill="none" stroke="#F05A28" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <div className="text-center">
              <p className="text-white font-bold text-lg">Mapa em tempo real</p>
              <p className="text-[#9E9E9E] text-sm mt-1">Rastreamento GPS ao vivo dos entregadores</p>
            </div>
          </div>
          {/* Simulated dots */}
          <div className="absolute top-12 left-1/4 w-3 h-3 rounded-full bg-[#F05A28] animate-pulse shadow-lg shadow-orange-500/50" />
          <div className="absolute top-20 left-1/2 w-3 h-3 rounded-full bg-[#F05A28] animate-pulse shadow-lg shadow-orange-500/50" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-16 right-1/3 w-3 h-3 rounded-full bg-[#F05A28] animate-pulse shadow-lg shadow-orange-500/50" style={{ animationDelay: '1s' }} />
        </div>

        {/* Active delivery cards */}
        <div className="p-5 space-y-3">
          {activeDeliveries.map((d) => (
            <div key={d.id} className="bg-[#F8F8F8] rounded-lg border border-[#E5E5E5] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F05A28] flex items-center justify-center text-white shrink-0">
                  {d.vehicle === 'Moto' ? (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <circle cx="5.5" cy="17.5" r="3.5" /><circle cx="18.5" cy="17.5" r="3.5" />
                      <path d="M15 6h-4l-1 4h8l-2 4M9 6L6 10" /><path d="M3 10h4" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 3v5h-7V8z" />
                      <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-bold text-[#1A1A1A] text-sm">Entrega #{d.id} → {d.client}</p>
                  <p className="text-xs text-[#9E9E9E] mt-0.5">{d.address}</p>
                  <p className="text-xs text-[#9E9E9E] mt-0.5">
                    Entregador: <span className="font-semibold text-[#1A1A1A]">{d.deliverer}</span> ({d.vehicle}) — Saiu: {d.departed} — Est: <span className="font-semibold text-[#F05A28]">{d.eta}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="px-3 py-1.5 bg-blue-500 text-white text-xs font-semibold rounded-lg hover:bg-blue-600 transition-colors">
                  Rastrear no Mapa
                </button>
                <button className="px-3 py-1.5 bg-green-500 text-white text-xs font-semibold rounded-lg hover:bg-green-600 transition-colors">
                  Confirmar Entrega
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fleet table */}
      <div className="bg-white rounded-[10px] border border-[#E5E5E5] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E5E5]">
          <h2 className="text-base font-bold text-[#1A1A1A]">Minha Frota</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8F8F8] border-b border-[#E5E5E5]">
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Nome</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Veículo</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Placa</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Entregas Hoje</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Rating</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F2F2]">
              {fleet.map((f) => {
                const st = fleetStatus[f.status]
                return (
                  <tr key={f.name} className={`hover:bg-[#FAFAFA] transition-colors ${st.rowBg}`}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#F2F2F2] flex items-center justify-center text-xs font-bold text-[#1A1A1A]">
                          {f.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </div>
                        <span className="font-semibold text-[#1A1A1A]">{f.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#1A1A1A]">
                      {f.vehicle} <span className="text-[#9E9E9E] text-xs">({f.type})</span>
                    </td>
                    <td className="px-4 py-3 font-mono text-[#9E9E9E] text-xs">{f.plate}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-semibold flex items-center ${st.textColor}`}>
                        <StatusDot status={f.status} />{st.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-[#1A1A1A]">{f.deliveries}</td>
                    <td className="px-4 py-3">
                      <span className="text-yellow-500 font-semibold text-sm">★ {f.rating}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${f.actionStyle}`}>
                        {f.action}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
