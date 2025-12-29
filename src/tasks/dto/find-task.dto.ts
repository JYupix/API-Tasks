import { IsOptional, IsString, IsEnum } from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';

export class FindTasksDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
