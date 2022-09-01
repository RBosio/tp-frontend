import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Product } from "../entities/product";
import { ProductService } from "../services/product";
import { ProductInput } from "./types/product";

@Service()
@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}
  
  @Query(() => [Product])
  async getProducts(): Promise<Product[]> {
    return await this.productService.getAll()
  }

  @Query(() => Product)
  async getProduct(
    @Arg('id', () => ID) id: number
  ): Promise<Product> {
    return await this.productService.getOne(id)
  }

  @Mutation(() => String)
  async createProduct(
    @Arg('values', () => ProductInput) values: ProductInput
  ): Promise<string> {
    return await this.productService.create(values)
  }

  @Mutation(() => String)
  async updateProduct(
    @Arg('values', () => ProductInput) values: ProductInput
  ): Promise<string> {
    return await this.productService.update(values)
  }

  @Mutation(() => String)
  async deleteProduct(
    @Arg('id', () => ID) id: number,
  ): Promise<string> {
    return await this.productService.delete(id)
  }
}