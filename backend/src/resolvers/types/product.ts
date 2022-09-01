import { Field, Float, ID, InputType, Int } from "type-graphql";

@InputType()
export class ProductInput {
  @Field(() => Int, {nullable: true})
  id?: number
  
  @Field(() => String, {nullable: true})
  name?: string

  @Field(() => Float, {nullable: true})
  price?: number

  @Field(() => Int, {nullable: true})
  stock?: number

  @Field(() => ID, {nullable: true})
  category?: number

  @Field(() => String, {nullable: true})
  image?: string
}