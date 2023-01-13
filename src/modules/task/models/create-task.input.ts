import {
  ArgsType,
  Field,
  GraphQLISODateTime,
  registerEnumType,
} from '@nestjs/graphql';
import { Status } from './task.model';

@ArgsType()
export class CreateTaskInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  description: string;

  @Field(() => Date, { nullable: true })
  expiresAt?: Date;

  @Field(() => Boolean)
  isCompleted: boolean;

  @Field(() => Status)
  status: Status;
}

registerEnumType(Status, {
  name: 'Status',
});
