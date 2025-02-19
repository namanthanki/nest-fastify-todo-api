import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.model';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, description: 'Return all todos.', type: [Todo] })
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo by id' })
  @ApiResponse({ status: 200, description: 'Return a todo.', type: Todo })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    const todo = await this.todoService.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({
    status: 201,
    description: 'The todo has been created.',
    type: Todo,
  })
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(createTodoDto.title);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo' })
  @ApiResponse({
    status: 200,
    description: 'The todo has been updated.',
    type: Todo,
  })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.update(id, updateTodoDto.completed ?? false);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo' })
  @ApiResponse({ status: 204, description: 'The todo has been deleted.' })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.todoService.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }
}
