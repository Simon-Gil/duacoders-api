import { Controller, Post, Body, UnauthorizedException, UseGuards, Delete, Param, Get } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { AdminApiKeyGuard } from './guards/admin-api-key.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateApiKeyDto } from './dto/create-api-key.dto';


@ApiTags('Api Keys')
@Controller('api/keys')
export class ApiKeyController {
  constructor(
    private readonly apiKeyService: ApiKeyService,
  ) {}

  // Crear nueva API KEY (solo con Admin API KEY)
  @Post()
  @UseGuards(AdminApiKeyGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Crea nueva API KEY. (Requiere Admin API KEY)'})
  @ApiBody({ type: CreateApiKeyDto})
  async createApiKey(@Body() body: {  customerName: string }) {
    
    const { customerName } = body;
    const newApiKey = await this.apiKeyService.createApiKey(customerName); 
    return { message: 'Clave API creada', apiKey: newApiKey.key };
  }

  // Eliminar API KEY
  @Delete(':id')
  @UseGuards(AdminApiKeyGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Elimina API KEY. (Requiere Admin API KEY)'})
  async deleteApiKey(@Param('id') id : string){
    return this.apiKeyService.deleteApiKey(id)
  }

  // Obtener API Keys
  @Get()
  @UseGuards(AdminApiKeyGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtiene las API KEY registradas en el sistema. (Requiere Admin API KEY)'})
  async getApiKeys(){
    return this.apiKeyService.getApiKeys();
  }
  
}