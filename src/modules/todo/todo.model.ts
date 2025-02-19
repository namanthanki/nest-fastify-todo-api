import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

// Interface for creation attributes (what's required when creating a new Todo)
interface TodoCreationAttributes {
  title: string;
  completed?: boolean;
}

// Interface for all attributes (including generated ones)
interface TodoAttributes extends TodoCreationAttributes {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ tableName: 'todos' })
export class Todo extends Model<TodoAttributes, TodoCreationAttributes> {
  @ApiProperty({ description: 'The unique identifier of the todo item' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ description: 'The title of the todo item' })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare title: string;

  @ApiProperty({ description: 'The completion status of the todo item' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare completed: boolean;

  @ApiProperty({ description: 'The creation date of the todo item' })
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare createdAt: Date;

  @ApiProperty({ description: 'The last update date of the todo item' })
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare updatedAt: Date;
}
