import {
  Controller, Get, Post, Patch, Param, Body, Query, UseGuards, Request,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto'
import { CreateCategoryDto } from './dto/create-category.dto'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { SellerType } from './entities/product.entity'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('categories')
  getCategories() {
    return this.productsService.findAllCategories()
  }

  @Post('categories')
  @UseGuards(JwtAuthGuard)
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.productsService.createCategory(dto)
  }

  @Get()
  findAll(
    @Query('categoryId') categoryId?: string,
    @Query('sellerId') sellerId?: string,
    @Query('search') search?: string,
  ) {
    return this.productsService.findAll({ categoryId, sellerId, search })
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateProductDto, @Request() req: { user: { sub: string; role: string } }) {
    const sellerType = req.user.role === 'industry' ? SellerType.INDUSTRY : SellerType.STORE
    return this.productsService.create(dto, req.user.sub, sellerType)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto)
  }

  @Patch(':id/approve')
  @UseGuards(JwtAuthGuard)
  approve(@Param('id') id: string) {
    return this.productsService.approve(id)
  }
}
