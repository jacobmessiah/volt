import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async seedProducts() {
    // Load seed data from JSON file
    const seedDataPath = path.join(process.cwd(), 'prisma', 'products.seed.json');
    const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf8'));

    // Clear existing data
    await this.prisma.product.deleteMany();

    // Prepare products with JSON stringified images, sizes, tags
    const productsToCreate = seedData.map((product) => ({
      name: product.name,
      description: product.description,
      price: product.price,
      discountPrice: product.discountPrice,
      rating: product.rating,
      viewCount: product.viewCount,
      images: JSON.stringify(product.images),
      sizes: JSON.stringify(product.sizes),
      isNew: product.isNew,
      tags: JSON.stringify(product.tags),
    }));

    // Create all products!
    await this.prisma.product.createMany({
      data: productsToCreate,
    });

    return { message: 'Successfully seeded products', count: seedData.length };
  }

  async getProducts(tag?: string) {
    console.log('Received tag query parameter:', tag);
    return { placeholder: true, tag: tag || 'no tag provided', message: 'Products placeholder response' };
  }
}
