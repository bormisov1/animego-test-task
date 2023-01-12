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
  @Field((type) => ID)
  id: number;

  @Field({ nullable: false })
  name?: string;

  @Field({ nullable: false })
  description?: string;

  @Field((type) => GraphQLISODateTime)
  expiresAt: Date;

  @Field()
  isCompleted: boolean;

  @Field((type) => Status)
  status: Status;

  @Field((type) => GraphQLISODateTime)
  createdAt: Date;

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date;
}

@InputType()
export class CreateTaskInput {
  @Field()
  name?: string;

  @Field()
  description?: string;

  @Field((type) => GraphQLISODateTime)
  expiresAt: Date;

  @Field()
  isCompleted: boolean;

  @Field()
  status?: Status;

  @Field((type) => GraphQLISODateTime)
  createdAt: Date;

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date;
}

@InputType()
export class UpdateTaskInput {
  @Field((type) => ID)
  id: number;

  @Field({ nullable: false })
  name?: string;

  @Field()
  description?: string;

  @Field((type) => GraphQLISODateTime)
  expiresAt?: Date;

  @Field()
  isCompleted?: boolean;

  @Field()
  status?: Status;
}
