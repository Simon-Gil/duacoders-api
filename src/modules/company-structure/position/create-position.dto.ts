import { ApiProperty } from '@nestjs/swagger';

export class CreatePositionDto {
  @ApiProperty({ description: 'Nombre del puesto' })
  name: string;
}