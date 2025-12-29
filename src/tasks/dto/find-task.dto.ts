import { TaskStatus } from '../enums/task-status.enum';

export class FindTasksDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
