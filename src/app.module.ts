import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './config/database.config';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [SequelizeModule.forRoot({ ...databaseConfig }), TodoModule],
})
export class AppModule {}
