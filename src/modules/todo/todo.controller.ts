import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.todoService.findOne(Number(id));
  }

  @Post()
  async create(@Body('title') title: string) {
    return this.todoService.create(title);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body('completed') completed: boolean) {
    return this.todoService.update(Number(id), completed);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.todoService.delete(Number(id));
  }
}
