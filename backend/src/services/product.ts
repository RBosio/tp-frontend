import { Service } from "typedi";
import { conn } from "../config/typeorm";
import { Product } from "../entities/product";
import { ProductInput } from "../resolvers/types/product";

@Service()
export class ProductService {
  private productRepository = conn.getRepository(Product)

  async getAll(): Promise<Product[]> {
    return await this.productRepository
    .find({
      relations: {
        category: true
      }
    })
  }
  
  async getOne(id: number): Promise<Product> {
    const Product = await this.productRepository
    .findOne({
      relations: {
        category: true
      },
      where: {
        id
      }
    })

    if (!Product) {
      throw new Error('Product doesn\'t exists')
    }
    
    return Product
  }

  async create(values: ProductInput): Promise<string> {
    const product = this.productRepository.create(values)
    
    await this.productRepository.save(product)

    return 'Product created'
  }

  async update(values: ProductInput): Promise<string> {
    const product = this.productRepository.create(values)
    
    await this.productRepository.save(product)

    return 'Product updated'
  }

  async delete(id: number): Promise<string> {
    const product = await this.productRepository.findOne({
      where: {
        id
      }
    })

    if(!product){
      throw new Error('Product doesn\'t exists')
    }

    product.status = false

    await this.productRepository.save(product)

    return 'Product deleted'
  }
}