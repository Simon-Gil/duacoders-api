import { ApiProperty } from '@nestjs/swagger';

// Clase DTO para crear API Keys
export class CreateApiKeyDto {
  @ApiProperty({ description: 'Nombre de consumidor API', type: String })
  customerName: string;
}