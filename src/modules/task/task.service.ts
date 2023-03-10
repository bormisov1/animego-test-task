import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Task, Status, CreateTaskInput, UpdateTaskInput } from './task.model';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({});
    return tasks as Task[];
  }

  async getById(id: number): Promise<Task> {
    const task = await this.prisma.task.findUniqueOrThrow({
      where: {
        id,
      },
    });
    return task as Task;
  }

  async getByStatus(status: Status): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({where: {status}});
    return tasks as Task[];
  }

  async create(cti: CreateTaskInput): Promise<Task> {
    const task = await this.prisma.task.create({
      data: {
        name: cti.name,
        description: cti.description,
        expiresAt: cti.expiresAt,
        isCompleted: cti.isCompleted || false,
        status: cti.status || Status.AWAITING,
        updatedAt: new Date(),
      },
    });
    return task as Task;
  }

  async update(uti: UpdateTaskInput): Promise<Task> {
    const { id, ...data } = uti;
    const task = await this.prisma.task.update({
      where: {
        id: +id,
      },
      data,
    });
    return task as Task;
  }

  async delete(id: number): Promise<Task> {
    const task = await this.prisma.task.delete({
      where: {
        id: +id,
      },
    });
    return task as Task;
  }
}
