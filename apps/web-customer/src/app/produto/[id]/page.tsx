import type { Metadata } from 'next'
import Link from 'next/link'

type Props = { params: Promise<{ id: string }> }

const MOCK_PRODUCT = {
  id: '1',
  name: 'Cimento CP II-E 50kg Votoran',
  category: 'Cimento e Argamassa',
  price: 37.90,
  originalPrice: 49.90,
  discount: 24,
  unit: 'saco',
  store: 'Material Forte',
  storeRating: 4.8,
  storeReviews: 342,
  description: 'Cimento Portland Composto com adição de escória de alto forno. Indicado para uso em argamassas de assentamento, revestimento e concreto em geral. Alta resistência e durabilidade, ideal para construções residenciais e comerciais.',
  specs: [
    { label: 'Tipo', value: 'CP II-E' },
    { label: 'Peso', value: '50 kg' },
    { label: 'Resistência', value: '32 MPa' },
    { label: 'Marca', value: 'Votoran' },
    { label: 'Validade', value: '90 dias' },
  ],
  delivery: { time: '2-3 dias úteis', price: 0, minOrder: 'R$ 200' },
  otherStores: [
    { name: 'ConstruBem', price: 39.50, delivery: '3-5 dias' },
    { name: 'Depósito Central', price: 41.00, delivery: '1-2 dias' },
  ],
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return {
    title: `${MOCK_PRODUCT.name} — ObraJá`,
    description: `Compre ${MOCK_PRODUCT.name} com o melhor preço. Produto #${id}`,
  }
}

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => {
          if (i < fullStars) {
            return <span key={i} style={{ color: '#FFB800' }} className="text-sm">★</span>
          }
          if (i === fullStars && hasHalf) {
            return <span key={i} style={{ color: '#FFB800' }} className="text-sm">★</span>
          }
          return <span key={i} style={{ color: '#D1D5DB' }} className="text-sm">★</span>
        })}
      </div>
      <span className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{rating}</span>
      <span className="text-sm" style={{ color: '#9E9E9E' }}>({reviews} avaliações)</span>
    </div>
  )
}

export default async function ProdutoPage({ params }: Props) {
  const { id } = await params
  const product = { ...MOCK_PRODUCT, id }

  const installment = (product.price / 10).toFixed(2)

  return (
    <>
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 gap-3"
        style={{ backgroundColor: '#1A1A1A', backdropFilter: 'blur(12px)' }}
      >
        <Link
          href="/marketplace"
          className="flex items-center justify-center w-9 h-9 rounded-full transition-colors"
          style={{ backgroundColor: '#2A2A2A' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </Link>

        <div className="flex-1 flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F05A28' }}>
              <span className="text-white font-black text-xs">OJ</span>
            </div>
            <span className="font-black text-white text-lg tracking-tight">ObraJá</span>
          </Link>
        </div>

        <Link
          href="/carrinho"
          className="flex items-center justify-center w-9 h-9 rounded-full transition-colors relative"
          style={{ backgroundColor: '#2A2A2A' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center font-bold"
            style={{ backgroundColor: '#F05A28', fontSize: '10px' }}
          >
            2
          </span>
        </Link>
      </nav>

      <main className="min-h-screen pt-16" style={{ backgroundColor: '#F5F5F5' }}>
        {/* Breadcrumb */}
        <div className="px-4 py-3" style={{ backgroundColor: 'white' }}>
          <nav className="flex items-center gap-1 text-xs" style={{ color: '#9E9E9E' }}>
            <Link href="/" className="hover:underline">Início</Link>
            <span>/</span>
            <Link href="/marketplace" className="hover:underline">Marketplace</Link>
            <span>/</span>
            <span style={{ color: '#F05A28' }}>{product.category}</span>
          </nav>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Galeria */}
            <div className="space-y-3">
              <div
                className="relative w-full rounded-2xl flex items-center justify-center overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #F05A28 0%, #FFD4C2 50%, #FFF8F5 100%)',
                  aspectRatio: '1 / 1',
                  boxShadow: '0 4px 24px rgba(240,90,40,0.15)',
                }}
              >
                {/* Badge desconto */}
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-black"
                  style={{ backgroundColor: '#F05A28' }}
                >
                  -{product.discount}%
                </div>
                {/* Emoji produto */}
                <span style={{ fontSize: '120px', lineHeight: 1 }}>🏗️</span>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2">
                {['🏗️', '📦', '🧱'].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 rounded-xl flex items-center justify-center cursor-pointer border-2"
                    style={{
                      background: 'linear-gradient(135deg, #F05A28 0%, #FFD4C2 100%)',
                      borderColor: i === 0 ? '#F05A28' : 'transparent',
                      fontSize: '32px',
                    }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>

            {/* Informações do produto */}
            <div className="space-y-4">
              {/* Categoria */}
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: '#FFF0EB', color: '#F05A28' }}
              >
                {product.category}
              </span>

              {/* Nome */}
              <h1 className="text-2xl font-black leading-tight" style={{ color: '#1A1A1A' }}>
                {product.name}
              </h1>

              {/* Loja */}
              <div
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ backgroundColor: '#F5F5F5' }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm"
                  style={{ backgroundColor: '#1A1A1A' }}
                >
                  {product.store[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#1A1A1A' }}>{product.store}</p>
                  <StarRating rating={product.storeRating} reviews={product.storeReviews} />
                </div>
              </div>

              {/* Preços */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm line-through" style={{ color: '#9E9E9E' }}>
                    R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: '#F05A28' }}
                  >
                    -{product.discount}%
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>R$</span>
                  <span className="text-4xl font-black" style={{ color: '#1A1A1A' }}>
                    {Math.floor(product.price)}
                  </span>
                  <span className="text-xl font-black" style={{ color: '#1A1A1A' }}>
                    ,{product.price.toFixed(2).split('.')[1]}
                  </span>
                  <span className="text-sm" style={{ color: '#9E9E9E' }}>/{product.unit}</span>
                </div>
                <p className="text-sm font-semibold" style={{ color: '#22C55E' }}>
                  ou 10x de R$ {installment.replace('.', ',')} sem juros
                </p>
              </div>

              {/* Botões de ação */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/checkout"
                  className="w-full py-4 rounded-2xl text-white font-black text-lg text-center transition-all active:scale-95"
                  style={{ backgroundColor: '#F05A28', boxShadow: '0 4px 16px rgba(240,90,40,0.35)' }}
                >
                  Comprar agora
                </Link>
                <Link
                  href="/carrinho"
                  className="w-full py-4 rounded-2xl font-black text-lg text-center border-2 transition-all active:scale-95"
                  style={{ borderColor: '#F05A28', color: '#F05A28' }}
                >
                  Adicionar ao carrinho
                </Link>
              </div>

              {/* Entrega */}
              <div
                className="flex items-start gap-3 p-4 rounded-2xl"
                style={{ backgroundColor: '#F0FFF4', border: '1px solid #BBF7D0' }}
              >
                <div className="mt-0.5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" rx="2" />
                    <path d="M16 8h4l3 5v3h-7V8z" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: '#16A34A' }}>
                    {product.delivery.price === 0 ? 'Frete Grátis' : `Frete: R$ ${product.delivery.price}`}
                  </p>
                  <p className="text-sm" style={{ color: '#9E9E9E' }}>
                    Entrega em {product.delivery.time}
                  </p>
                  {product.delivery.minOrder && (
                    <p className="text-xs mt-0.5" style={{ color: '#9E9E9E' }}>
                      Pedido mínimo: {product.delivery.minOrder}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Abas de conteúdo */}
          <ProductTabs product={product} />
        </div>
      </main>
    </>
  )
}

function ProductTabs({ product }: { product: typeof MOCK_PRODUCT }) {
  return (
    <div className="mt-8 bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Tab headers — static, server-rendered, first tab visible */}
      <div
        className="flex border-b"
        style={{ borderColor: '#F5F5F5' }}
      >
        {['Descrição', 'Especificações', 'Outras lojas'].map((tab, i) => (
          <div
            key={tab}
            className="flex-1 py-4 text-center font-semibold text-sm cursor-pointer"
            style={{
              color: i === 0 ? '#F05A28' : '#9E9E9E',
              borderBottom: i === 0 ? '2px solid #F05A28' : '2px solid transparent',
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="p-6 space-y-8">
        {/* Descrição */}
        <div>
          <h2 className="text-lg font-black mb-3" style={{ color: '#1A1A1A' }}>Descrição do produto</h2>
          <p className="text-sm leading-relaxed" style={{ color: '#4B4B4B' }}>
            {product.description}
          </p>
        </div>

        {/* Especificações */}
        <div>
          <h2 className="text-lg font-black mb-3" style={{ color: '#1A1A1A' }}>Especificações técnicas</h2>
          <div className="rounded-xl overflow-hidden border" style={{ borderColor: '#F5F5F5' }}>
            {product.specs.map((spec, i) => (
              <div
                key={spec.label}
                className="flex items-center px-4 py-3"
                style={{
                  backgroundColor: i % 2 === 0 ? '#FAFAFA' : 'white',
                  borderBottom: i < product.specs.length - 1 ? '1px solid #F5F5F5' : 'none',
                }}
              >
                <span className="w-1/2 text-sm font-semibold" style={{ color: '#9E9E9E' }}>{spec.label}</span>
                <span className="w-1/2 text-sm font-bold" style={{ color: '#1A1A1A' }}>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Outras lojas */}
        <div>
          <h2 className="text-lg font-black mb-3" style={{ color: '#1A1A1A' }}>Outras lojas vendendo este produto</h2>
          <div className="space-y-3">
            {product.otherStores.map((store) => (
              <div
                key={store.name}
                className="flex items-center justify-between p-4 rounded-2xl border"
                style={{ borderColor: '#F5F5F5', backgroundColor: '#FAFAFA' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm"
                    style={{ backgroundColor: '#1A1A1A' }}
                  >
                    {store.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#1A1A1A' }}>{store.name}</p>
                    <p className="text-xs" style={{ color: '#9E9E9E' }}>Entrega: {store.delivery}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-lg" style={{ color: '#1A1A1A' }}>
                    R$ {store.price.toFixed(2).replace('.', ',')}
                  </p>
                  <button
                    className="text-xs font-semibold px-3 py-1 rounded-full mt-1"
                    style={{ backgroundColor: '#FFF0EB', color: '#F05A28' }}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
