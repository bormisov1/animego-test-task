import { Args, Query, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './task.model';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query((returns) => Task)
  async task(@Args('id') id: string): Promise<Task> {
    const task = await this.taskService.get();
    return task;
  }
}
