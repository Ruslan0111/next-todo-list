import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';

export interface Task {
  id: number;
  title: string;
  desc: string;
  isFinished: boolean;
}

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
  ) {}

  async create(task: Task): Promise<string> {
    console.log(task);
    const newTask = this.tasksRepository.create({
      title: task.title,
      desc: task.desc,
    });
    await this.tasksRepository.save(newTask);
    return 'Successfully created';
  }

  async getAll(): Promise<Task[]> {
    const tasks = await this.tasksRepository.find();
    return tasks;
  }

  async getSingle(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    return task;
  }

  async update(id: number, newTask: Task): Promise<string> {
    this.tasksRepository.update({ id }, newTask);
    return 'Successfully updated';
  }

  async delete(id: number): Promise<string> {
    this.tasksRepository.delete({ id });
    return 'Successfully deleted';
  }
}
