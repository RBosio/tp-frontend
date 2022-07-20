import { Service } from "typedi";
import { conn } from "../config/typeorm";
import { Category } from "../entities/category";
import { CategoryInput } from "../resolvers/types/category";

@Service()
export class CategoryService {
  private categoryRepository = conn.getRepository(Category)

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository
    .createQueryBuilder()
    .getMany()
  }
  
  async getOne(id: number): Promise<Category> {
    const category = await this.categoryRepository
    .createQueryBuilder()
    .where('id = :id', {id})
    .getOne()

    if (!category) {
      throw new Error('Category doesn\'t exists')
    }
    
    return category
  }

  async create(values: CategoryInput): Promise<string> {
    const result = await this.categoryRepository.insert(values)

    return 'Category created'
  }

  async update(id: number, values: CategoryInput): Promise<string> {
    const { affected } = await this.categoryRepository.update(id, values)
    
    if (affected == 0) {
      throw new Error('Category doesn\'t exists')
    }

    return 'Category updated'
  }

  async delete(id: number): Promise<string> {
    const { affected } = await this.categoryRepository.update(id, {status: false})

    if (affected == 0) {
      throw new Error('Category doesn\'t exists')
    }

    return 'Category deleted'
  }
}