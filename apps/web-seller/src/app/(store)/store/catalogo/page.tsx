const products = [
  {
    emoji: '🏗️',
    emojiBg: 'bg-gray-100',
    name: 'Cimento CP-II 50kg',
    category: 'Cimento',
    categoryColor: 'bg-gray-100 text-gray-700',
    retail: 'R$ 34,90',
    wholesale: 'R$ 31,90',
    stock: 890,
    unit: 'sacos',
    active: true,
  },
  {
    emoji: '🏗️',
    emojiBg: 'bg-gray-100',
    name: 'Cimento CP-V 50kg',
    category: 'Cimento',
    categoryColor: 'bg-gray-100 text-gray-700',
    retail: 'R$ 33,50',
    wholesale: 'R$ 30,50',
    stock: 340,
    unit: 'sacos',
    active: true,
  },
  {
    emoji: '🪣',
    emojiBg: 'bg-yellow-50',
    name: 'Argamassa AC-II 20kg',
    category: 'Argamassa',
    categoryColor: 'bg-yellow-100 text-yellow-800',
    retail: 'R$ 39,90',
    wholesale: 'R$ 37,00',
    stock: 420,
    unit: 'cx',
    active: true,
  },
  {
    emoji: '🎨',
    emojiBg: 'bg-red-50',
    name: 'Tinta Acrílica Coral 18L',
    category: 'Tintas',
    categoryColor: 'bg-red-100 text-red-700',
    retail: 'R$ 229,90',
    wholesale: 'R$ 210,00',
    stock: 48,
    unit: 'latas',
    active: true,
  },
  {
    emoji: '⚡',
    emojiBg: 'bg-blue-50',
    name: 'Fio Elétrico 2,5mm 100m',
    category: 'Elétrica',
    categoryColor: 'bg-blue-100 text-blue-700',
    retail: 'R$ 192,00',
    wholesale: 'R$ 180,00',
    stock: 65,
    unit: 'rolos',
    active: true,
  },
  {
    emoji: '🔩',
    emojiBg: 'bg-slate-100',
    name: 'Vergalhão CA-50 10mm 12m',
    category: 'Ferragens',
    categoryColor: 'bg-slate-100 text-slate-700',
    retail: 'R$ 56,00',
    wholesale: 'R$ 52,00',
    stock: 280,
    unit: 'barras',
    active: true,
  },
  {
    emoji: '🚿',
    emojiBg: 'bg-cyan-50',
    name: 'Tubo PVC 100mm 6m',
    category: 'Hidráulica',
    categoryColor: 'bg-cyan-100 text-cyan-700',
    retail: 'R$ 54,90',
    wholesale: 'R$ 49,00',
    stock: 75,
    unit: 'barras',
    active: true,
  },
  {
    emoji: '🏠',
    emojiBg: 'bg-orange-50',
    name: 'Telha Cerâmica un',
    category: 'Coberturas',
    categoryColor: 'bg-orange-100 text-orange-700',
    retail: 'R$ 3,20',
    wholesale: 'R$ 2,90',
    stock: 12000,
    unit: 'un',
    active: true,
  },
  {
    emoji: '⛏️',
    emojiBg: 'bg-amber-50',
    name: 'Areia Média m³',
    category: 'Agregados',
    categoryColor: 'bg-amber-100 text-amber-700',
    retail: 'R$ 180,00',
    wholesale: 'R$ 165,00',
    stock: 32,
    unit: 'm³',
    active: true,
  },
  {
    emoji: '🧱',
    emojiBg: 'bg-red-50',
    name: 'Bloco Cerâmico 9×19×19',
    category: 'Blocos',
    categoryColor: 'bg-red-100 text-red-700',
    retail: 'R$ 0,95',
    wholesale: 'R$ 0,82',
    stock: 45000,
    unit: 'un',
    active: true,
  },
  {
    emoji: '🔧',
    emojiBg: 'bg-purple-50',
    name: 'Calafetar 300ml Tigre',
    category: 'Vedantes',
    categoryColor: 'bg-purple-100 text-purple-700',
    retail: 'R$ 16,90',
    wholesale: 'R$ 14,50',
    stock: 8,
    unit: 'un',
    active: true,
    lowStock: true,
  },
  {
    emoji: '🔩',
    emojiBg: 'bg-slate-100',
    name: 'Tela de Aço 6×2,4m',
    category: 'Ferragens',
    categoryColor: 'bg-slate-100 text-slate-700',
    retail: 'R$ 152,00',
    wholesale: 'R$ 140,00',
    stock: 42,
    unit: 'pç',
    active: true,
  },
]

function stockColor(qty: number, lowStock?: boolean) {
  if (lowStock || qty < 10) return 'text-red-600 bg-red-50'
  if (qty <= 50) return 'text-orange-600 bg-orange-50'
  return 'text-green-700 bg-green-50'
}

export default function CatalogoPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9E9E]" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Buscar produto..."
              className="pl-9 pr-4 py-2 text-sm border border-[#E5E5E5] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F1591D] w-64"
            />
          </div>
          <select className="px-3 py-2 text-sm border border-[#E5E5E5] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F1591D] text-[#1A1A1A]">
            <option value="">Todas as categorias</option>
            <option>Cimento</option>
            <option>Argamassa</option>
            <option>Tintas</option>
            <option>Elétrica</option>
            <option>Ferragens</option>
            <option>Hidráulica</option>
            <option>Coberturas</option>
            <option>Agregados</option>
            <option>Blocos</option>
            <option>Vedantes</option>
          </select>
          <select className="px-3 py-2 text-sm border border-[#E5E5E5] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F1591D] text-[#1A1A1A]">
            <option>Mais vendido</option>
            <option>Preço ↑</option>
            <option>Preço ↓</option>
            <option>Nome A-Z</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-[#F1591D] text-white text-sm font-bold rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap">
          + Adicionar Produto
        </button>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p.name}
            className={`bg-white rounded-[10px] border overflow-hidden hover:shadow-md transition-shadow ${
              p.lowStock ? 'border-red-300' : 'border-[#E5E5E5]'
            }`}
          >
            {/* Card top */}
            <div className={`${p.emojiBg} flex items-center justify-center h-20 text-4xl border-b border-[#F2F2F2] relative`}>
              {p.emoji}
              {p.lowStock && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Estoque baixo!
                </span>
              )}
            </div>

            {/* Card body */}
            <div className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <p className="font-bold text-[#1A1A1A] text-sm leading-tight">{p.name}</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${p.categoryColor}`}>
                  {p.category}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-base font-black text-[#1A1A1A]">{p.retail}</span>
                <span className="text-xs text-[#9E9E9E]">varejo</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-[#9E9E9E]">{p.wholesale}</span>
                <span className="text-xs text-[#9E9E9E]">atacado</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${stockColor(p.stock, p.lowStock)}`}>
                  Estoque: {p.stock.toLocaleString('pt-BR')} {p.unit}
                </span>
              </div>
            </div>

            {/* Card footer */}
            <div className="px-4 py-3 border-t border-[#F2F2F2] flex items-center justify-between bg-[#FAFAFA]">
              <div className="flex items-center gap-1">
                {/* Active toggle */}
                <div className="w-9 h-5 bg-green-500 rounded-full relative cursor-pointer flex-shrink-0">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow" />
                </div>
                <span className="text-xs text-green-600 font-semibold ml-1">Ativo</span>
              </div>
              <div className="flex items-center gap-1">
                {/* Edit */}
                <button title="Editar" className="p-1.5 rounded-lg hover:bg-[#F2F2F2] text-[#9E9E9E] hover:text-[#1A1A1A] transition-colors">
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                {/* Delete */}
                <button title="Excluir" className="p-1.5 rounded-lg hover:bg-red-50 text-[#9E9E9E] hover:text-red-500 transition-colors">
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-sm text-[#9E9E9E]">Exibindo 12 de 234 produtos</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg border border-[#E5E5E5] text-sm text-[#9E9E9E] hover:bg-white transition-colors">
            ← Anterior
          </button>
          <span className="px-3 py-1.5 rounded-lg bg-[#F1591D] text-white text-sm font-bold">1</span>
          <button className="px-3 py-1.5 rounded-lg border border-[#E5E5E5] text-sm text-[#9E9E9E] hover:bg-white transition-colors">2</button>
          <button className="px-3 py-1.5 rounded-lg border border-[#E5E5E5] text-sm text-[#9E9E9E] hover:bg-white transition-colors">
            Próxima →
          </button>
        </div>
      </div>
    </div>
  )
}
