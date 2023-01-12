import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TaskService {
  async get(): Promise<Task> {
    return { name: 'example name to make it return some name' } as Task;
  }
}
