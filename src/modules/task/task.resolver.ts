import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {ExecutionContext,Inject } from '@nestjs/common';
import { TaskService } from './task.service';
import { Status, Task, CreateTaskInput, UpdateTaskInput } from './task.model';
import Redis from 'ioredis';
import { CONTEXT } from '@nestjs/graphql';
/*  */

@Resolver(() => Task)
export class TaskResolver {
  private redis = Redis.createClient();
  constructor(private readonly taskService: TaskService,
    @Inject(CONTEXT) private readonly ctx: ExecutionContext
    ){}



  getIp(){
    const request = this.ctx.switchToHttp().getRequest();
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
  return ip
  }

  async requestAsCache() {
    try {
      const key = this.getIp()
      const getResponse = await this.redis.get(key);
      if(getResponse) {
        return JSON.parse(getResponse);
      } else {
        const setnxResponse = await this.redis.setnx(key, 5);
        if (setnxResponse) {
          await this.redis.expire(key, 3000 / 1000);
        } else {
          await this.redis.decrby(key, 1);
        }
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }


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
  ): Promise<Task[]>{
    const cacheData = await this.requestAsCache();
    if (cacheData) {
      return {...cacheData, cache:true};
    } else {
      const queryResult = await this.taskService.getAll()
      const ip = this.getIp()
      this.redis.set(ip, JSON.stringify(queryResult), 'EX', 3000);
      return queryResult;
    } }
  
    /*
    const queryResult = await this.taskService.getAll()
     const data = await this.taskService.getByStatus(status); */

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
