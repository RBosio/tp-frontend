import { Service } from "typedi";
import { conn } from "../config/typeorm";
import { Category } from "../entities/category";
import { CategoryInput } from "../resolvers/types/category";

@Service()
export class CategoryService {
  private categoryRepository = conn.getRepository(Category)

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository
    .find()
  }
  
  async getOne(id: number): Promise<Category> {
    const category = await this.categoryRepository
    .findOne({
      where: {
        id
      }
    })

    if (!category) {
      throw new Error('Category doesn\'t exists')
    }
    
    return category
  }

  async create(values: CategoryInput): Promise<string> {
    const category = this.categoryRepository.create(values)
    
    await this.categoryRepository.save(category)

    return 'Category created'
  }

  async update(values: CategoryInput): Promise<string> {
    const category = this.categoryRepository.create(values)
    
    await this.categoryRepository.save(category)

    return 'Category updated'
  }

  async delete(id: number): Promise<string> {
    const category = await this.categoryRepository.findOne({
      where: {
        id
      }
    })

    if(!category){
      throw new Error('Category doesn\'t exists')
    }

    category.status = false
    
    await this.categoryRepository.save(category)

    return 'Category deleted'
  }
}