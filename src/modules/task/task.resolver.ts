import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Status, Task, CreateTaskInput, UpdateTaskInput } from './task.model';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query((returns) => Task)
  async task(@Args('id') id: number): Promise<Task> {
    return await this.taskService.getById(id);
  }

  @Query((returns) => [Task])
  async tasks(
    @Args({
      name: 'status',
      type: () => Status,
      nullable: true,
    })
    status: Status,
  ): Promise<Task[]> {
    if (status === null) {
      console.log('tasks');
      return await this.taskService.getAll();
    }

    return await this.taskService.getByStatus(status);
  }

  @Mutation((returns) => Task)
  async createTask(
    @Args({ name: 'createTaskInput', type: () => CreateTaskInput })
    createTaskInput: CreateTaskInput,
  ) {
    return this.taskService.create(createTaskInput);
  }

  
  @Mutation((returns) => Task)
  async updateTask(
    @Args({ name: 'updateTaskInput', type: () => UpdateTaskInput })
    updateTaskInput: UpdateTaskInput,
  ) {
    return this.taskService.update(updateTaskInput);
  }

  @Mutation((returns) => Task)
  async deleteTask(@Args('id') id: number): Promise<Task> {
    return this.taskService.delete(id);
  }
}
