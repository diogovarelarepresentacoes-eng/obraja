import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from './entities/product.entity'
import { Category } from './entities/category.entity'
import { ProductImage } from './entities/product-image.entity'
import { ProductVariant } from './entities/product-variant.entity'
import { ProductReview } from './entities/product-review.entity'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, ProductImage, ProductVariant, ProductReview])],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
