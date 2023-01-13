import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({});
    return tasks as Task[];
  }
}
