import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CategoryInput {
  @Field(() => Int, {nullable: true})
  id?: number
  
  @Field(() => String, {nullable: true})
  name?: string
}