import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configuration from './config/configuration';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...(await configService.get('app.database')),
        autoLoadModels: true,
        synchronize: process.env.NODE_ENV !== 'production',
        logging: process.env.NODE_ENV !== 'production' ? console.log : false,
      }),
    }),
    TodoModule,
  ],
})
export class AppModule {}
