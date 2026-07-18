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

    // Create all products and images in a transaction
    const createdProducts = await this.prisma.$transaction(async (prisma) => {
      // Step 1: Create all products and get their IDs
      const productsToCreate = seedData.map((product) => ({
        name: product.name,
        description: product.description,
        price: product.price,
        discountPrice: product.discountPrice,
        rating: product.rating,
        viewCount: product.viewCount,
        sizes: JSON.stringify(product.sizes),
        isNew: product.isNew,
        tags: JSON.stringify(product.tags),
      }));

      const createdProducts = await prisma.product.createMany({
        data: productsToCreate,
        returning: true, // Only works with PostgreSQL!
      });

      // Step 2: Prepare product images with product IDs
      const allProductImages = [];
      createdProducts.forEach((product, index) => {
        const originalProduct = seedData[index];
        originalProduct.images.forEach((img) => {
          allProductImages.push({
            url: img.url,
            altText: img.altText,
            productId: product.id,
          });
        });
      });

      // Step 3: Create all product images
      await prisma.productImage.createMany({
        data: allProductImages,
      });

      return createdProducts;
    });

    return { message: 'Successfully seeded products', count: createdProducts.length };
  }

  async getProducts(tag?: string) {
    console.log('Received tag query parameter:', tag);
    return { placeholder: true, tag: tag || 'no tag provided', message: 'Products placeholder response' };
  }
}
