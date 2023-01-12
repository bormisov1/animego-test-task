import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './models/task';
import { CreateTaskInput, UpdateTaskInput } from './models/input';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query((returns) => Task)
  async task(@Args('id') id: number): Promise<Task> {
    return await this.taskService.getById(id);
  }

  @Mutation((returns) => Task)
  async createTask(
    @Args({ name: 'createTaskImport', type: () => CreateTaskInput })
    createTaskInput: CreateTaskInput,
  ) {
    return this.taskService.create(createTaskInput);
  }

  @Mutation((returns) => Task)
  async updateTask(
    @Args({ name: 'updateTaskImport', type: () => UpdateTaskInput })
    updateTaskInput: UpdateTaskInput,
  ) {
    return this.taskService.update(updateTaskInput);
  }

  @Mutation((returns) => Task)
  async deleteTask(@Args('id') id: number): Promise<Task> {
    return this.taskService.delete(id);
  }
}
