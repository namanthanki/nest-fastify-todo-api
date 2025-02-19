import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo) private todoModel: typeof Todo) {}

  async findAll(): Promise<Todo[]> {
    return this.todoModel.findAll();
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoModel.findByPk(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async create(title: string): Promise<Todo> {
    return this.todoModel.create({ title });
  }

  async update(id: number, completed: boolean): Promise<Todo> {
    const [affectedCount] = await this.todoModel.update(
      { completed },
      { where: { id } },
    );

    if (affectedCount === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    // Then fetch the updated record
    const updatedTodo = await this.todoModel.findByPk(id);
    if (!updatedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return updatedTodo;
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await this.todoModel.destroy({ where: { id } });
    return deleted > 0;
  }
}
