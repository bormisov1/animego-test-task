import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

@ObjectType({ description: 'Task ' })
export class Task {
  @Field(() => ID)
  id: number;

  @Field({ nullable: false })
  name?: string;

  @Field({ nullable: false })
  description?: string;

  @Field(() => GraphQLISODateTime)
  expiresAt: Date;

  @Field()
  isCompleted: boolean;

  @Field(() => Status)
  status: Status;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}

export enum Status {
  COMPLETE = 'COMPLETE',
  IN_WORK = 'IN_WORK',
  AWAITING = 'AWAITING',
}

registerEnumType(Status, {
  name: 'Status',
});
