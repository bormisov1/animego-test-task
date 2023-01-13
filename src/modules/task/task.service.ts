import { Injectable } from '@nestjs/common';
import { Task } from './models/task.model';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTaskInput } from './models/create-task.input';
import { CreateTaskResult } from './models/create-task.result';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async get(): Promise<Task> {
    return { name: 'example name to make it return some name' } as Task;
  }

  async createTask(args: CreateTaskInput): Promise<CreateTaskResult> {
    const task = await this.prisma.task.create({
      data: {
        ...args,
      },
    });
    return {
      task: task as any,
    };
  }
}
