import {
  IsOptional,
  IsString,
  IsEnum,
  Length,
  MaxLength,
} from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';

export class UpdateTaskDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  @Length(3, 100, { message: 'Title must be between 3 and 100 characters' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MaxLength(500, { message: 'Description must not exceed 500 characters' })
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'Status must be either "pending" or "completed"',
  })
  status?: TaskStatus;
}
