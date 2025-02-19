import { Injectable } from '@nestjs/common';
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
      throw new Error('Todo not found');
    }
    return todo;
  }

  async create(title: string): Promise<Todo> {
    return this.todoModel.create({ title, completed: false });
  }

  async update(id: number, completed: boolean): Promise<[number, Todo[]]> {
    return this.todoModel.update(
      { completed },
      { where: { id }, returning: true },
    );
  }

  async delete(id: number): Promise<void> {
    const todo = await this.findOne(id);
    if (todo) await todo.destroy();
  }
}
