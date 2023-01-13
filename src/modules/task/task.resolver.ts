import { Args, Query, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './task.model';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}
  @Query((returns) => Task)
  async tasks(): Promise<Task[]> {
    const task = await this.taskService.getAll();
    return task;
  }
}
