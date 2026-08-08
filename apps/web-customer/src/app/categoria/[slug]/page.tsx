import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `${slug} — ObraJá`,
    description: `Materiais da categoria ${slug} com os melhores preços.`,
  }
}

export default async function CategoriaPage({ params }: Props) {
  const { slug } = await params

  return (
    <main className="container-app py-8 mt-16">
      <h1 className="text-2xl font-black capitalize" style={{ color: '#1A1A1A' }}>
        {slug.replace(/-/g, ' ')}
      </h1>
      <p className="mt-2 text-sm" style={{ color: '#9E9E9E' }}>
        Grid de produtos por categoria — em breve.
      </p>
    </main>
  )
}
