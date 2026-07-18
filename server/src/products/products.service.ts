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
    await this.prisma.productImage.deleteMany();
    await this.prisma.product.deleteMany();

    // Create all products with nested images
    for (const product of seedData) {
      await this.prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          discountPrice: product.discountPrice,
          rating: product.rating,
          viewCount: product.viewCount,
          sizes: JSON.stringify(product.sizes),
          isNew: product.isNew,
          tags: JSON.stringify(product.tags),
          images: {
            create: product.images.map((img) => ({
              url: img.url,
              altText: img.altText,
            })),
          },
        },
      });
    }

    return { message: 'Successfully seeded products', count: seedData.length };
  }

  async getProducts(tag?: string) {
    console.log('Received tag query parameter:', tag);
    return { placeholder: true, tag: tag || 'no tag provided', message: 'Products placeholder response' };
  }
}
