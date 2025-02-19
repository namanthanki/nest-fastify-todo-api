import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface TodoAttributes {
  id?: number;
  title: string;
  completed?: boolean;
}

@Table({ tableName: 'todos' })
export class Todo extends Model<TodoAttributes, Partial<TodoAttributes>> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id?: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  completed: boolean;
}
