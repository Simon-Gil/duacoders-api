import { ApiProperty } from '@nestjs/swagger';

export class CreateApiKeyDto {
  @ApiProperty({ description: 'Nombre de consumidor API', type: String })
  customerName: string;
}