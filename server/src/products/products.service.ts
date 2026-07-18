import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { GetProductsDto } from './dto/get-products.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  getProducts(dto: GetProductsDto) {
    const {
      priceMin,
      priceMax,
      sizes,
      tags,
      isNew,
      ratingMin,
      limit = 15,
      page = 0,
    } = dto;

    const where: Prisma.ProductWhereInput = {
      ...(priceMin !== undefined || priceMax !== undefined
        ? {
            price: {
              ...(priceMin !== undefined && { gte: priceMin }),
              ...(priceMax !== undefined && { lte: priceMax }),
            },
          }
        : {}),

      ...(sizes?.length ? { sizes: { hasSome: sizes } } : {}),

      ...(tags?.length ? { tags: { hasSome: tags } } : {}),

      ...(isNew !== undefined ? { isNew } : {}),

      ...(ratingMin !== undefined ? { rating: { gte: ratingMin } } : {}),
    };

    return this.prisma.product.findMany({
      where,
      take: limit,
      skip: page * limit,
      include: { images: true },
    });
  }

  getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });
  }

  searchProducts(q: string) {
    if (!q?.trim()) return [];

    return this.prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
          { tags: { has: q.toLowerCase() } },
        ],
      },
      take: 20,
      include: { images: true },
    });
  }
}
