import { TaskStatus } from '../enums/task-status.enum';

export class CreateTaskDto {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}
