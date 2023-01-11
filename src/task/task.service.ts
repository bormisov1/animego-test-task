import { Injectable } from "@nestjs/common";
import { Task } from "./models/task/task.model";

@Injectable()
export class TaskService {

  async get(): Promise<Task> {
    return {} as Task;
  }

}