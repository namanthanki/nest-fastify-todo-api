import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3000', 10) || 3000,
  database: {
    dialect: process.env.DB_DIALECT || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
}));
