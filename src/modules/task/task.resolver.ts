import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Status, Task, CreateTaskInput, UpdateTaskInput } from './task.model';
import Redis from 'ioredis';
import { Request } from 'express';

/*  */

@Resolver(() => Task)
export class TaskResolver {
  private redis = Redis.createClient();
  constructor(private readonly taskService: TaskService) {}

  async requestAsCache(key: string, cb: any) {
    try {
      const valueFiled = key + '_filed';
      const valueCounter = key + '_counter';

      const currentValue = (await this.redis.get(valueCounter)) || null;
      if (!currentValue) {
        await this.redis.set(valueCounter, 5);
        await this.redis.expire(valueCounter, 300);
      }

      if (currentValue || 0 > 0) {
        const value = await this.redis.get(valueFiled);
        if (value) {
          console.log('using cache data');
          await this.redis.decrby(valueCounter, 1);
          return JSON.parse(value);
        } else {
          // Get the updated data and set it to valueFiled key
          const updatedData = cb;
          await this.redis.set(valueFiled, JSON.stringify(updatedData));
          await this.redis.expire(valueFiled, 300);
          await this.redis.decrby(valueCounter, 1);
          return updatedData;
        }
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }

  @Query((returns) => Task)
  async task(
    @Args('id') id: number,
    @Context() context: { req: Request },
  ): Promise<Task> {
    const type = context.req.body.query.match(/query\s+(\w+)/)[1];
    const request = context.req;
    const cacheData = await this.requestAsCache(
      `${request.ip}_${type}`,
      await this.taskService.getById(id),
    );
    if (cacheData) {
      return cacheData;
    } else {
      return await this.taskService.getById(id);
    }
  }

  @Query((returns) => [Task])
  async tasks(
    @Args({
      name: 'status',
      type: () => Status,
      nullable: true,
    })
    status: Status,
    @Context() context: { req: Request },
  ): Promise<Task[]> {
    const type = context.req.body.query.match(/query\s+(\w+)/)[1];
    const request = context.req;
    const cacheData = await this.requestAsCache(
      `${request.ip}_${type}`,
      !status
        ? await this.taskService.getAll()
        : await this.taskService.getByStatus(status),
    );
    if (cacheData) {
      return cacheData;
    } else {
      const queryResult = !status
        ? await this.taskService.getAll()
        : await this.taskService.getByStatus(status);
      return queryResult;
    }
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
