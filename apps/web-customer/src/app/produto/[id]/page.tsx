import type { Metadata } from 'next'
import Link from 'next/link'

// ─── Types & mock data ────────────────────────────────────────────────────────

type Props = { params: Promise<{ id: string }> }

const MOCK_PRODUCT = {
  id: '1',
  name: 'Cimento CP II-E 50kg Votoran',
  category: 'Cimento e Argamassa',
  categorySlug: 'cimento-argamassa',
  price: 37.90,
  originalPrice: 49.90,
  discount: 24,
  unit: 'saco',
  emoji: '🧱',
  store: 'Material Forte',
  storeRating: 4.8,
  storeReviews: 342,
  description:
    'Cimento Portland Composto com adição de escória de alto forno. Indicado para uso em argamassas de assentamento, revestimento e concreto em geral. Alta resistência e durabilidade, ideal para construções residenciais e comerciais.',
  specs: [
    { label: 'Tipo', value: 'CP II-E' },
    { label: 'Peso', value: '50 kg' },
    { label: 'Resistência', value: '32 MPa' },
    { label: 'Marca', value: 'Votoran' },
    { label: 'Validade', value: '90 dias' },
  ],
  delivery: { time: '2–3 dias úteis', price: 0, minOrder: 'R$ 200' },
  otherStores: [
    { id: 'os1', name: 'ConstruBem', price: 39.50, delivery: '3–5 dias', rating: 4.5 },
    { id: 'os2', name: 'Depósito Central', price: 41.00, delivery: '1–2 dias', rating: 4.7 },
  ],
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return {
    title: `${MOCK_PRODUCT.name} — ObraJá`,
    description: `Compre ${MOCK_PRODUCT.name} com o melhor preço. Produto #${id}`,
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtPrice(v: number) {
  return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  const full = Math.floor(rating)
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} style={{ color: i < full ? '#FFB800' : '#D1D5DB' }} className="text-sm">
            ★
          </span>
        ))}
      </div>
      <span className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{rating}</span>
      <span className="text-xs" style={{ color: '#9E9E9E' }}>({reviews} avaliações)</span>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProdutoPage({ params }: Props) {
  const { id } = await params
  const product = { ...MOCK_PRODUCT, id }

  const installment = (product.price / 10).toFixed(2)

  return (
    <div className="bg-[#F5F5F5] min-h-screen">

      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 h-14"
        style={{ background: '#1A1A1A' }}
      >
        <div className="max-w-5xl mx-auto px-4 h-full flex items-center gap-3">
          <Link href={`/categoria/${product.categorySlug}`} aria-label="Voltar" className="flex-shrink-0">
            <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2.2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <div className="flex-1 flex items-center gap-1.5 min-w-0">
            <span className="text-xl font-black leading-none">
              <span className="text-white">Obra</span>
              <span style={{ color: '#F05A28' }}>Já</span>
            </span>
          </div>

          <Link href="/carrinho" className="relative flex-shrink-0" aria-label="Carrinho">
            <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-16 pb-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs py-3 mb-1" style={{ color: '#9E9E9E' }}>
          <Link href="/home" className="hover:underline" style={{ color: '#9E9E9E' }}>Home</Link>
          <span>›</span>
          <Link href={`/categoria/${product.categorySlug}`} className="hover:underline" style={{ color: '#9E9E9E' }}>
            {product.category}
          </Link>
          <span>›</span>
          <span className="truncate max-w-[160px] font-medium" style={{ color: '#1A1A1A' }}>
            {product.name}
          </span>
        </nav>

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── Galeria ──────────────────────────────────────────────────── */}
          <div className="space-y-3">
            <div className="relative aspect-square bg-[#F5F5F5] rounded-xl border border-[#E5E5E5] flex items-center justify-center overflow-hidden">
              {product.discount > 0 && (
                <span
                  className="absolute top-3 left-3 text-xs font-bold rounded-full px-2.5 py-1"
                  style={{ background: '#FFB800', color: '#1A1A1A' }}
                >
                  -{product.discount}%
                </span>
              )}
              <span style={{ fontSize: '100px', lineHeight: 1 }}>{product.emoji}</span>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2">
              {[product.emoji, '📦', '🏗️'].map((em, i) => (
                <div
                  key={i}
                  className="w-20 h-20 rounded-lg bg-[#F5F5F5] border-2 flex items-center justify-center text-2xl cursor-pointer"
                  style={{ borderColor: i === 0 ? '#F05A28' : '#E5E5E5' }}
                >
                  {em}
                </div>
              ))}
            </div>
          </div>

          {/* ── Info do produto ───────────────────────────────────────────── */}
          <div className="space-y-4">

            {/* Badge categoria */}
            <span
              className="inline-block text-xs font-medium px-3 py-1 rounded-full"
              style={{ background: '#FFF3EE', color: '#F05A28' }}
            >
              {product.category}
            </span>

            {/* Nome */}
            <h1 className="text-2xl font-bold leading-tight" style={{ color: '#1A1A1A' }}>
              {product.name}
            </h1>

            {/* Rating */}
            <StarRating rating={product.storeRating} reviews={product.storeReviews} />

            {/* Preços */}
            <div className="space-y-0.5">
              {product.originalPrice > 0 && (
                <p className="text-sm text-gray-400 line-through">
                  R$ {fmtPrice(product.originalPrice)}
                </p>
              )}
              <p className="text-3xl font-black" style={{ color: '#F05A28' }}>
                R$ {fmtPrice(product.price)}
                <span className="text-base font-medium ml-1" style={{ color: '#9E9E9E' }}>
                  /{product.unit}
                </span>
              </p>
              <p className="text-sm" style={{ color: '#16A34A' }}>
                ou 10x de R$ {installment.replace('.', ',')} sem juros
              </p>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-col gap-2.5">
              <Link
                href="/carrinho"
                className="w-full py-3.5 rounded-xl text-white font-bold text-base text-center transition-all"
                style={{ background: '#F05A28' }}
              >
                Adicionar ao carrinho
              </Link>
              <Link
                href="/checkout"
                className="w-full py-3.5 rounded-xl font-bold text-base text-center border-2 transition-all"
                style={{ borderColor: '#F05A28', color: '#F05A28', background: 'transparent' }}
              >
                Comprar agora
              </Link>
            </div>

            {/* Card entrega */}
            <div
              className="flex items-start gap-3 p-4 rounded-xl border"
              style={{ background: '#F0FFF4', borderColor: '#BBF7D0' }}
            >
              <svg className="flex-shrink-0 mt-0.5" width="20" height="20" fill="none" stroke="#16A34A" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="1" y="3" width="15" height="13" rx="2" />
                <path d="M16 8h4l3 5v3h-7V8z" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#16A34A' }}>
                  {product.delivery.price === 0 ? 'Frete grátis' : `Frete: R$ ${product.delivery.price}`}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#9E9E9E' }}>
                  Entrega em {product.delivery.time}
                </p>
                {product.delivery.minOrder && (
                  <p className="text-xs mt-0.5" style={{ color: '#9E9E9E' }}>
                    Pedido mínimo: {product.delivery.minOrder}
                  </p>
                )}
              </div>
            </div>

            {/* Card loja vendedora */}
            <div
              className="flex items-center gap-3 p-4 rounded-xl border border-[#E5E5E5] bg-white"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ background: '#1A1A1A' }}
              >
                {product.store[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{product.store}</p>
                <StarRating rating={product.storeRating} reviews={product.storeReviews} />
              </div>
              <Link
                href={`/loja/1`}
                className="text-xs font-medium px-3 py-1.5 rounded-lg border border-[#E5E5E5]"
                style={{ color: '#1A1A1A' }}
              >
                Ver loja
              </Link>
            </div>
          </div>
        </div>

        {/* ── Tabs de conteúdo (server-rendered estático) ────────────────── */}
        <div className="mt-8 bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
          {/* Cabeçalhos das tabs */}
          <div className="flex border-b border-[#E5E5E5]">
            {['Descrição', 'Especificações', 'Outras lojas'].map((tab, i) => (
              <div
                key={tab}
                className="flex-1 py-3.5 text-center text-sm font-medium cursor-pointer"
                style={{
                  color: i === 0 ? '#F05A28' : '#9E9E9E',
                  borderBottom: i === 0 ? '2px solid #F05A28' : '2px solid transparent',
                }}
              >
                {tab}
              </div>
            ))}
          </div>

          <div className="p-5 space-y-8">

            {/* Descrição */}
            <div>
              <h2 className="text-base font-bold mb-2" style={{ color: '#1A1A1A' }}>
                Descrição do produto
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#4B4B4B' }}>
                {product.description}
              </p>
            </div>

            {/* Especificações */}
            <div>
              <h2 className="text-base font-bold mb-2" style={{ color: '#1A1A1A' }}>
                Especificações técnicas
              </h2>
              <div className="rounded-lg overflow-hidden border border-[#E5E5E5]">
                {product.specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className="flex items-center px-4 py-3"
                    style={{
                      background: i % 2 === 0 ? '#FAFAFA' : '#fff',
                      borderBottom: i < product.specs.length - 1 ? '1px solid #F5F5F5' : 'none',
                    }}
                  >
                    <span className="w-1/2 text-sm" style={{ color: '#9E9E9E' }}>{spec.label}</span>
                    <span className="w-1/2 text-sm font-medium" style={{ color: '#1A1A1A' }}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Outras lojas */}
            <div>
              <h2 className="text-base font-bold mb-2" style={{ color: '#1A1A1A' }}>
                Outras lojas vendendo este produto
              </h2>
              <div className="space-y-3">
                {product.otherStores.map((store) => (
                  <div
                    key={store.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA]"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ background: '#1A1A1A' }}
                      >
                        {store.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: '#1A1A1A' }}>{store.name}</p>
                        <p className="text-xs" style={{ color: '#9E9E9E' }}>Entrega: {store.delivery}</p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                      <p className="text-base font-bold" style={{ color: '#1A1A1A' }}>
                        R$ {fmtPrice(store.price)}
                      </p>
                      <Link
                        href="/checkout"
                        className="text-xs font-medium px-3 py-1 rounded-full"
                        style={{ background: '#FFF3EE', color: '#F05A28' }}
                      >
                        Comprar
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
