import { Injectable } from "@nestjs/common";
import { Task } from "task/models/task/task.model";

@Injectable()
export class TaskService {
  getHello(): Task {
    return {} as Task;
  }
}
