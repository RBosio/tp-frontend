import { Service } from "typedi";
import { conn } from "../config/typeorm";
import { Product } from "../entities/product";
import { ProductInput } from "../resolvers/types/product";

@Service()
export class ProductService {
  private productRepository = conn.getRepository(Product)

  async getAll(): Promise<Product[]> {
    return await this.productRepository
    .createQueryBuilder('product')
    .innerJoinAndSelect('product.category', 'category')
    .getMany()
  }
  
  async getOne(id: number): Promise<Product> {
    const Product = await this.productRepository
    .createQueryBuilder('product')
    .innerJoinAndSelect('product.category', 'category')
    .where('product.id = :id', {id})
    .getOne()

    if (!Product) {
      throw new Error('Product doesn\'t exists')
    }
    
    return Product
  }

  async create(values: ProductInput): Promise<string> {
    const result = await this.productRepository.insert(values)

    return 'Product created'
  }

  async update(id: number, values: ProductInput): Promise<string> {
    const { affected } = await this.productRepository.update(id, values)
    
    if (affected == 0) {
      throw new Error('Product doesn\'t exists')
    }

    return 'Product updated'
  }

  async delete(id: number): Promise<string> {
    const { affected } = await this.productRepository.update(id, {status: false})

    if (affected == 0) {
      throw new Error('Product doesn\'t exists')
    }

    return 'Product deleted'
  }
}