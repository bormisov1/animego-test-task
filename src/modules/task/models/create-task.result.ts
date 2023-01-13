import { Field, ObjectType } from '@nestjs/graphql';
import { Task } from './task.model';

@ObjectType()
export class CreateTaskResult {
  @Field(() => Task, {
    nullable: true,
    description: 'Task',
  })
  task: Task;
}
