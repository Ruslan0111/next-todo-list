import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { Task, TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getTasks() {
    return this.tasksService.getAll();
  }

  @Get(':id')
  async getSingle(@Param() { id }: { id: number }) {
    return this.tasksService.getSingle(id);
  }

  @Post()
  async createTask(@Body() task: Task) {
    return this.tasksService.create(task);
  }

  @Put(':id')
  async updateTask(@Param() { id }: { id: number }, @Body() task: Task) {
    return this.tasksService.update(id, task);
  }

  @Delete(':id')
  async deleteTask(@Param() { id }: { id: number }) {
    return this.tasksService.delete(id);
  }
}
