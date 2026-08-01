const products = [
  {
    emoji: '🏗️',
    nome: 'Cimento CP-II 50kg',
    categoria: 'Cimento',
    unidade: 'saco',
    estoque: '15.200',
    preco: 'R$ 31,90',
    status: 'Ativo',
  },
  {
    emoji: '🏗️',
    nome: 'Cimento CP-V 50kg',
    categoria: 'Cimento',
    unidade: 'saco',
    estoque: '8.400',
    preco: 'R$ 30,90',
    status: 'Ativo',
  },
  {
    emoji: '🪣',
    nome: 'Argamassa AC-II 20kg',
    categoria: 'Argamassa',
    unidade: 'cx',
    estoque: '4.200',
    preco: 'R$ 37,50',
    status: 'Ativo',
  },
  {
    emoji: '🪣',
    nome: 'Argamassa AC-I 20kg',
    categoria: 'Argamassa',
    unidade: 'cx',
    estoque: '2.800',
    preco: 'R$ 32,00',
    status: 'Ativo',
  },
  {
    emoji: '🧴',
    nome: 'Calafetar 300ml',
    categoria: 'Vedantes',
    unidade: 'un',
    estoque: '1.200',
    preco: 'R$ 15,00',
    status: 'Ativo',
  },
  {
    emoji: '🔩',
    nome: 'Tela de Aço 6m × 2,4m',
    categoria: 'Ferragens',
    unidade: 'pç',
    estoque: '320',
    preco: 'R$ 148,00',
    status: 'Ativo',
  },
  {
    emoji: '🏠',
    nome: 'Telha Cerâmica',
    categoria: 'Coberturas',
    unidade: 'un',
    estoque: '42.000',
    preco: 'R$ 2,90',
    status: 'Inativo',
  },
  {
    emoji: '🧱',
    nome: 'Bloco Cerâmico 9×19×19',
    categoria: 'Blocos',
    unidade: 'un',
    estoque: '180.000',
    preco: 'R$ 0,89',
    status: 'Ativo',
  },
]

const categories = ['Todas as Categorias', 'Cimento', 'Argamassa', 'Vedantes', 'Ferragens', 'Coberturas', 'Blocos']

export default function ProdutosPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div />
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#F05A28] rounded-lg text-sm font-bold text-white hover:bg-[#CC4010] transition-colors">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Novo Produto
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#E5E5E5]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-4 py-3 border-b border-[#F2F2F2]">
          <div className="relative flex-1 w-full">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9E9E]" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Buscar produto..."
              className="w-full pl-9 pr-4 py-2 border border-[#E5E5E5] rounded-lg text-sm text-[#1A1A1A] placeholder-[#9E9E9E] focus:outline-none focus:border-[#F05A28]"
            />
          </div>
          <select className="px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm text-[#1A1A1A] focus:outline-none focus:border-[#F05A28] bg-white">
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F2F2F2]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide w-16">Foto</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Nome</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Categoria</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Unidade</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Estoque</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Preço</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.nome} className="border-b border-[#F2F2F2] hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#F2F2F2] flex items-center justify-center text-xl">
                      {p.emoji}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-[#1A1A1A]">{p.nome}</td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs font-medium px-2 py-1 rounded bg-[#F2F2F2] text-[#9E9E9E]">{p.categoria}</span>
                  </td>
                  <td className="px-4 py-3.5 text-[#9E9E9E]">{p.unidade}</td>
                  <td className="px-4 py-3.5 font-semibold text-[#1A1A1A] text-right">{p.estoque}</td>
                  <td className="px-4 py-3.5 font-bold text-[#1A1A1A] text-right">{p.preco}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      p.status === 'Ativo'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-[#F2F2F2] text-[#9E9E9E]'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-[#F2F2F2] text-[#9E9E9E] hover:text-[#1A1A1A] transition-colors" title="Editar">
                        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-[#9E9E9E] hover:text-red-600 transition-colors" title="Excluir">
                        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        <div className="px-4 py-3 border-t border-[#F2F2F2]">
          <p className="text-sm text-[#9E9E9E]">
            <span className="font-semibold text-[#1A1A1A]">8</span> produtos · <span className="font-semibold text-[#1A1A1A]">7</span> ativos · <span className="font-semibold text-[#1A1A1A]">1</span> inativo
          </p>
        </div>
      </div>
    </div>
  )
}
