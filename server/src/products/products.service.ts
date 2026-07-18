import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async seedProducts() {
    const seedDataPath = path.join(process.cwd(), 'prisma', 'products.seed.json');
    const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf8'));

    await this.prisma.product.deleteMany({});

    await this.prisma.product.createMany({
      data: seedData,
    });

    return {
      message: 'Successfully seeded products',
      count: seedData.length
    };
  }

  async getProducts(tag?: string) {
    console.log('Received tag query parameter:', tag);
    return { placeholder: true, tag: tag || 'no tag provided', message: 'Products placeholder response' };
  }
}
