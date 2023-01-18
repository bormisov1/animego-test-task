import {
  Field,
  GraphQLISODateTime,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export enum Status {
  COMPLETE = 'COMPLETE',
  IN_WORK = 'IN_WORK',
  AWAITING = 'AWAITING',
}

registerEnumType(Status, {
  name: 'Status',
});

@ObjectType({ description: 'Task ' })
export class Task {
  @Field(() => ID)
  id: number;

  @Field({ nullable: false })
  name?: string;

  @Field({ nullable: false })
  description?: string;

  @Field(() => GraphQLISODateTime)
  expiresAt?: Date;

  @Field()
  isCompleted: boolean;

  @Field(() => Status)
  status: Status;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}

@InputType()
export class CreateTaskInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  expiresAt?: Date;

  @Field({ nullable: true })
  isCompleted?: boolean;

  @Field(() => Status, { nullable: true })
  status?: Status;
}

@InputType()
export class UpdateTaskInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  expiresAt?: Date;

  @Field({ nullable: true })
  isCompleted?: boolean;

  @Field(() => Status, { nullable: true })
  status?: Status;
}
