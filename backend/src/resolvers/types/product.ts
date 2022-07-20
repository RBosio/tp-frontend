import { Field, Float, ID, InputType, Int } from "type-graphql";

@InputType()
export class ProductInput {
  @Field(() => String)
  name!: string

  @Field(() => Float)
  price!: number

  @Field(() => Int)
  stock!: number

  @Field(() => ID)
  category!: number

  @Field(() => String)
  image!: string
}