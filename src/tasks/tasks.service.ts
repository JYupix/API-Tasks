import { Injectable, NotFoundException } from '@nestjs/common';
import path from 'path';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';
import { Task } from './interfaces/task.inferface';
import { FindTasksDto } from './dto/find-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private filePath = path.join(process.cwd(), 'src', 'data', 'tasks.json');

  private readFile(): Task[] {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data) as Task[];
  }

  private writeFile(tasks: Task[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(tasks, null, 2), 'utf-8');
  }

  findAll(filters?: FindTasksDto): Task[] {
    const tasks = this.readFile();

    if (!filters) {
      return tasks;
    }

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

  findById(id: string): Task {
    const tasks = this.readFile();
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  createTask(task: CreateTaskDto): Task {
    const tasks = this.readFile();

    const newTask: Task = {
      id: uuid(),
      title: task.title,
      description: task.description,
      status: task.status || 'PENDING',
      createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    this.writeFile(tasks);

    return newTask;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
    const tasks = this.readFile();

    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    const updatedTask: Task = {
      ...tasks[taskIndex],
      ...updateTaskDto,
    };

    tasks[taskIndex] = updatedTask;
    this.writeFile(tasks);

    return updatedTask;
  }

  deleteTask(id: string): void {
    const tasks = this.readFile();

    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    tasks.splice(taskIndex, 1);
    this.writeFile(tasks);
  }
}
