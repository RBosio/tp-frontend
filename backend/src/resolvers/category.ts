import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Category } from "../entities/category";
import { CategoryService } from "../services/category";
import { CategoryInput } from "./types/category";

@Service()
@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}
  
  @Query(() => [Category])
  async getCategories(): Promise<Category[]> {
    return await this.categoryService.getAll()
  }

  @Query(() => Category)
  async getCategory(
    @Arg('id', () => ID) id: number
  ): Promise<Category> {
    return await this.categoryService.getOne(id)
  }

  @Mutation(() => String)
  async createCategory(
    @Arg('values', () => CategoryInput) values: CategoryInput
  ): Promise<string> {
    return await this.categoryService.create(values)
  }

  @Mutation(() => String)
  async updateCategory(
    @Arg('id', () => ID) id: number,
    @Arg('values', () => CategoryInput) values: CategoryInput
  ): Promise<string> {
    return await this.categoryService.update(id, values)
  }

  @Mutation(() => String)
  async deleteCategory(
    @Arg('id', () => ID) id: number,
  ): Promise<string> {
    return await this.categoryService.delete(id)
  }
}