import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import path from 'path';
import { promises as fs } from 'fs';
import { v4 as uuid } from 'uuid';
import { Task } from './interfaces/task.interface';
import { FindTasksDto } from './dto/find-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './enums/task-status.enum';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  private filePath = path.join(process.cwd(), 'src', 'data', 'tasks.json');

  private async readFile(): Promise<Task[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as Task[];
    } catch (err) {
      this.logger.error('Failed to read tasks file', (err as Error).stack);
      throw new InternalServerErrorException('Failed to read tasks');
    }
  }

  private async writeFile(tasks: Task[]): Promise<void> {
    try {
      await fs.writeFile(
        this.filePath,
        JSON.stringify(tasks, null, 2),
        'utf-8',
      );
    } catch (err) {
      this.logger.error('Failed to write tasks file', (err as Error).stack);
      throw new InternalServerErrorException('Failed to write tasks');
    }
  }

  async findAll(filters?: FindTasksDto): Promise<Task[]> {
    const tasks = await this.readFile();

    this.logger.log(
      `Retrieved all tasks${filters ? ` with filters: ${JSON.stringify(filters)}` : ''}`,
    );

    if (!filters) return tasks;

    return tasks.filter(
      (task) =>
        (!filters.title ||
          task.title.toLowerCase().includes(filters.title.toLowerCase())) &&
        (!filters.description ||
          task.description
            .toLowerCase()
            .includes(filters.description.toLowerCase())) &&
        (!filters.status || task.status === filters.status),
    );
  }

  async findById(id: string): Promise<Task> {
    const tasks = await this.readFile();
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      this.logger.warn(`Task with id ${id} not found`);
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    this.logger.log(`Retrieved task with id ${id}`);
    return task;
  }

  async createTask(task: CreateTaskDto): Promise<Task> {
    const tasks = await this.readFile();

    const newTask: Task = {
      id: uuid(),
      title: task.title,
      description: task.description,
      status: task.status || TaskStatus.PENDING,
      createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    await this.writeFile(tasks);

    this.logger.log(`Task created: ${newTask.title}`);
    return newTask;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const tasks = await this.readFile();

    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      this.logger.warn(`Task with id ${id} not found`);
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    const updatedTask: Task = {
      ...tasks[taskIndex],
      ...updateTaskDto,
    };

    tasks[taskIndex] = updatedTask;
    await this.writeFile(tasks);

    this.logger.log(`Task with id ${id} updated`);
    return updatedTask;
  }

  async deleteTask(id: string): Promise<Task> {
    const tasks = await this.readFile();
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      this.logger.warn(`Task with id ${id} not found`);
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];
    await this.writeFile(tasks);

    this.logger.log(`Task with id ${id} deleted`);
    return deletedTask;
  }
}
