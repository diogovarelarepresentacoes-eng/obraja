import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product, SellerType } from './entities/product.entity'
import { Category } from './entities/category.entity'
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto'
import { CreateCategoryDto } from './dto/create-category.dto'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
  ) {}

  async findAllCategories(): Promise<Category[]> {
    return this.categoryRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } })
  }

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepo.save(this.categoryRepo.create(dto))
  }

  async findAll(query: { categoryId?: string; sellerId?: string; search?: string }): Promise<Product[]> {
    const qb = this.productRepo.createQueryBuilder('p')
      .leftJoinAndSelect('p.images', 'img')
      .where('p.is_active = true AND p.is_approved = true')

    if (query.categoryId) qb.andWhere('p.category_id = :cat', { cat: query.categoryId })
    if (query.sellerId) qb.andWhere('p.seller_id = :sid', { sid: query.sellerId })
    if (query.search) qb.andWhere('p.name ILIKE :q', { q: `%${query.search}%` })

    return qb.orderBy('p.total_sold', 'DESC').limit(50).getMany()
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: { images: true, variants: true, category: true },
    })
    if (!product) throw new NotFoundException('Produto não encontrado')
    return product
  }

  async create(dto: CreateProductDto, sellerId: string, sellerType: SellerType): Promise<Product> {
    return this.productRepo.save(this.productRepo.create({ ...dto, sellerId, sellerType }))
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    await this.productRepo.update(id, dto)
    return this.findOne(id)
  }

  async approve(id: string): Promise<Product> {
    await this.productRepo.update(id, { isApproved: true })
    return this.findOne(id)
  }
}
