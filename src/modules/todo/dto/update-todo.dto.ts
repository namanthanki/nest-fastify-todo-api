/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTodoDto {
  @ApiPropertyOptional({
    description: 'The completion status of the todo item',
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
