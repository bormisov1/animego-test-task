import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './models/task.model';
import { CreateTaskInput } from './models/create-task.input';
import { CreateTaskResult } from './models/create-task.result';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => Task)
  async task(@Args('id') id: string): Promise<Task> {
    const task = await this.taskService.get();
    return task;
  }

  @Mutation(() => CreateTaskResult)
  async taskMutation(@Args() args: CreateTaskInput): Promise<CreateTaskResult> {
    return await this.taskService.createTask(args);
  }
}
