import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class TmdbShowDetails {
  @Field(() => Int)
  public id!: number;

  @Field(() => String, { nullable: true })
  public name?: string | null;

  @Field(() => Int)
  public numberOfSeasons!: number;
}
