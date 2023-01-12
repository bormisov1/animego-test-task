import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

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

export enum Status {
  COMPLETE = 'COMPLETE',
  IN_WORK = 'IN_WORK',
  AWAITING = 'AWAITING',
}

registerEnumType(Status, {
  name: 'Status',
});
