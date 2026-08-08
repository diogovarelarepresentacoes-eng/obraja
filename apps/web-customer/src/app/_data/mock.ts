export type Product = {
  id: string
  name: string
  unit: string
  originalPrice: number
  price: number
  discount: number
  store: string
  category: string
}

export type Store = {
  id: string
  name: string
  categories: string[]
  rating: number
  reviews: number
  deliveryTime: string
  minOrder: string
  distance: string
  freeDelivery: boolean
}

export type ProfessionalType = {
  id: string
  title: string
  emoji: string
  items: string[]
  color: string
}

export const CATEGORIES = [
  { slug: 'cimento-argamassa', emoji: '🏗️', label: 'Cimento e Argamassa' },
  { slug: 'tijolos-blocos',    emoji: '🧱', label: 'Tijolos e Blocos' },
  { slug: 'eletrica',          emoji: '⚡', label: 'Elétrica' },
  { slug: 'hidraulica',        emoji: '🚿', label: 'Hidráulica' },
  { slug: 'tintas',            emoji: '🎨', label: 'Tintas' },
  { slug: 'pisos',             emoji: '🪟', label: 'Pisos e Revestimentos' },
  { slug: 'ferramentas',       emoji: '🔧', label: 'Ferramentas' },
  { slug: 'aco-ferro',         emoji: '🔩', label: 'Aço e Ferro' },
  { slug: 'impermeabilizacao', emoji: '🛡️', label: 'Impermeabilização' },
  { slug: 'epi',               emoji: '🪖', label: 'EPI e Segurança' },
] as const

export const DAILY_OFFERS: Product[] = [
  {
    id: '1', name: 'Cimento CP II-E 50kg Votoran', unit: 'saco',
    originalPrice: 49.90, price: 37.90, discount: 24,
    store: 'Material Forte', category: 'Cimento',
  },
  {
    id: '2', name: 'Argamassa ACII Cinza 20kg Weber', unit: 'saco',
    originalPrice: 28.50, price: 22.00, discount: 23,
    store: 'ConstruBem', category: 'Argamassa',
  },
  {
    id: '3', name: 'Tinta Acrílica Premium Branca 18L Suvinil', unit: 'lata',
    originalPrice: 289.90, price: 219.90, discount: 24,
    store: 'Depósito Central', category: 'Tintas',
  },
  {
    id: '4', name: 'Vergalhão CA-50 3/8" 12m Gerdau', unit: 'barra',
    originalPrice: 38.00, price: 31.50, discount: 17,
    store: 'AçoMax', category: 'Ferro',
  },
]

export const BEST_SELLERS: Product[] = [
  {
    id: '5', name: 'Tijolo Cerâmico 9 furos 9x14x19cm', unit: 'milheiro',
    originalPrice: 980.00, price: 870.00, discount: 11,
    store: 'Cerâmica Norte', category: 'Tijolos',
  },
  {
    id: '6', name: 'Porcelanato Polido Branco 60x60cm', unit: 'm²',
    originalPrice: 72.90, price: 59.90, discount: 18,
    store: 'Pisos & Cia', category: 'Pisos',
  },
  {
    id: '7', name: 'Tubo PVC Esgoto 100mm 6m Tigre', unit: 'peça',
    originalPrice: 68.00, price: 54.00, discount: 21,
    store: 'HidroShop', category: 'Hidráulica',
  },
  {
    id: '8', name: 'Disjuntor Bipolar 20A Schneider', unit: 'un',
    originalPrice: 42.00, price: 34.90, discount: 17,
    store: 'EletroObra', category: 'Elétrica',
  },
  {
    id: '9', name: 'Capacete de Segurança Amarelo 3M', unit: 'un',
    originalPrice: 35.00, price: 28.00, discount: 20,
    store: 'EPISeguro', category: 'EPI',
  },
]

export const NEARBY_STORES: Store[] = [
  {
    id: '1', name: 'Material Forte',
    categories: ['Cimento', 'Areia', 'Brita', 'Argamassa'],
    rating: 4.8, reviews: 312, deliveryTime: '30–50 min',
    minOrder: 'R$ 150', distance: '1,2 km', freeDelivery: true,
  },
  {
    id: '2', name: 'ConstruBem',
    categories: ['Tintas', 'Pisos', 'Revestimentos', 'Ferramentas'],
    rating: 4.6, reviews: 218, deliveryTime: '40–60 min',
    minOrder: 'R$ 200', distance: '2,4 km', freeDelivery: false,
  },
  {
    id: '3', name: 'AçoMax Distribuidora',
    categories: ['Ferro', 'Aço', 'Vergalhão', 'Tela'],
    rating: 4.9, reviews: 156, deliveryTime: '60–90 min',
    minOrder: 'R$ 500', distance: '3,1 km', freeDelivery: true,
  },
]

export const PROFESSIONAL_TYPES: ProfessionalType[] = [
  {
    id: 'pedreiro', title: 'Pedreiro', emoji: '👷', color: '#F05A28',
    items: ['Cimento', 'Areia', 'Tijolo', 'Argamassa', 'Massa corrida'],
  },
  {
    id: 'engenheiro', title: 'Engenheiro', emoji: '📐', color: '#3B82F6',
    items: ['Vergalhão', 'Concreto', 'Fôrmas', 'Impermeabilização', 'Estruturas'],
  },
  {
    id: 'arquiteto', title: 'Arquiteto', emoji: '✏️', color: '#8B5CF6',
    items: ['Pisos', 'Revestimentos', 'Tintas premium', 'Iluminação', 'Metais'],
  },
  {
    id: 'construtora', title: 'Construtora', emoji: '🏗️', color: '#22C55E',
    items: ['Compra em volume', 'Cotação múltipla', 'Faturamento B2B', 'Entrega na obra'],
  },
]
