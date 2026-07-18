import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetProductsDto } from './dto/get-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(@Query() query: GetProductsDto) {
    return this.productsService.getProducts(query);
  }

  // must be before :id so "search" isn't treated as an id
  @Get('search')
  searchProducts(@Query('q') q: string) {
    return this.productsService.searchProducts(q);
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }
}
