import { ApiProperty } from '@nestjs/swagger';

// Clase DTO para la creación de Departamentos
export class CreateDepartmentDto {
  @ApiProperty({ description: 'Nombre del departamento' })
  name: string;
}