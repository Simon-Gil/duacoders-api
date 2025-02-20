import { ApiProperty } from '@nestjs/swagger';

// DTO para creación de Puestos
export class CreatePositionDto {
  @ApiProperty({ description: 'Nombre del puesto' })
  name: string;
}