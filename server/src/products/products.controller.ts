import { Controller, Post, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('seed')
  async seed() {
    return this.productsService.seedProducts();
  }

  @Get()
  async getProducts(@Query('tag') tag?: string) {
    return this.productsService.getProducts(tag);
  }
}
