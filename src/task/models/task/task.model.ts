import { Field, GraphQLISODateTime, ID, ObjectType } from "@nestjs/graphql";
import Status from "./task.enum";

/* type Task {
    id:          Int
    name:        String
    description: String
    expires:     DateTime
    isCompleted: Boolean
    status:      Status
    createdAt:   DateTime
    updatedAt:   DateTime
} */

@ObjectType({ description: "Task " })
export class Task {
  @Field((type) => ID)
  id: number;

  @Field({ nullable: false })
  name?: string;

  @Field({ nullable: false })
  description?: string;

  @Field((type) => GraphQLISODateTime)
  expires: Date;

  @Field()
  isCompleted: boolean;

  @Field((type) => Status)
  status: Status;

  @Field((type) => GraphQLISODateTime)
  createdAt: Date;

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date;
}
