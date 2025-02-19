/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    description: 'The title of the todo item',
    minimum: 1,
    maximum: 100,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  title: string;
}
