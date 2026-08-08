import { DataSource } from 'typeorm'
import { Category } from '../../modules/products/entities/category.entity'

export const CATEGORIES_SEED = [
  { name: 'Cimento e Argamassa', slug: 'cimento-argamassa', displayOrder: 1, iconUrl: '🏗️' },
  { name: 'Tintas e Revestimentos', slug: 'tintas-revestimentos', displayOrder: 2, iconUrl: '🎨' },
  { name: 'Elétrica e Iluminação', slug: 'eletrica-iluminacao', displayOrder: 3, iconUrl: '⚡' },
  { name: 'Hidráulica e Encanamento', slug: 'hidraulica-encanamento', displayOrder: 4, iconUrl: '🚿' },
  { name: 'Ferramentas e Equipamentos', slug: 'ferramentas-equipamentos', displayOrder: 5, iconUrl: '🔧' },
  { name: 'Madeiras e MDF', slug: 'madeiras-mdf', displayOrder: 6, iconUrl: '🪵' },
  { name: 'Cerâmica, Pisos e Azulejos', slug: 'ceramica-pisos-azulejos', displayOrder: 7, iconUrl: '🟫' },
  { name: 'Ferro, Aço e Metalurgia', slug: 'ferro-aco-metalurgia', displayOrder: 8, iconUrl: '⚙️' },
  { name: 'Impermeabilização', slug: 'impermeabilizacao', displayOrder: 9, iconUrl: '💧' },
  { name: 'Fibrocimento e Telhas', slug: 'fibrocimento-telhas', displayOrder: 10, iconUrl: '🏠' },
  { name: 'Areia, Brita e Pedra', slug: 'areia-brita-pedra', displayOrder: 11, iconUrl: '⛏️' },
  { name: 'Esquadrias e Vidros', slug: 'esquadrias-vidros', displayOrder: 12, iconUrl: '🪟' },
  { name: 'EPI e Segurança', slug: 'epi-seguranca', displayOrder: 13, iconUrl: '⛑️' },
  { name: 'Limpeza e Conservação', slug: 'limpeza-conservacao', displayOrder: 14, iconUrl: '🧹' },
  { name: 'Outros', slug: 'outros', displayOrder: 99, iconUrl: '📦' },
]

export async function seedCategories(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Category)
  for (const cat of CATEGORIES_SEED) {
    const exists = await repo.findOne({ where: { slug: cat.slug } })
    if (!exists) {
      await repo.save(repo.create({ ...cat, isActive: true }))
    }
  }
  console.log(`✅ Categorias: ${CATEGORIES_SEED.length} seeded`)
}
