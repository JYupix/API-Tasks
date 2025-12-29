import {
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Title must not be empty' })
  @IsString({ message: 'Title must be a string' })
  @Length(3, 100, { message: 'Title must be between 3 and 100 characters' })
  title: string;

  @IsNotEmpty({ message: 'Description must not be empty' })
  @IsString({ message: 'Description must be a string' })
  @MaxLength(500, { message: 'Description too long' })
  description: string;

  @IsEnum(TaskStatus, { message: 'Status must be either "pending" or "completed"' })
  @IsOptional()
  status: TaskStatus;
}
