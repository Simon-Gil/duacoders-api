import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { ApiKeyEntity } from './api-key.entity';

// Servicio de validación para garantizar que la API Key del admin está configurada
@Injectable()
export class AdminKeyValidationService implements OnModuleInit {
  private readonly logger = new Logger(AdminKeyValidationService.name);

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(ApiKeyEntity) private readonly apiKeyRepository: Repository<ApiKeyEntity>,
  ) {}

  async onModuleInit() {
    const adminApiKey = this.configService.get<string>('ADMIN_API_KEY');
    
    // Comprobamos que ADMIN_API_KEY esta configurada
    if (!adminApiKey) {
      this.logger.error('La ADMIN_API_KEY no está configurada en las variables de entorno.');
      process.exit(1);  
    }
    const existingApiKey = await this.apiKeyRepository.findOne({ where: { key: adminApiKey } });

    if (!existingApiKey) {
      // Insertamos API KEY si no existe en la base de datos
      await this.createAdminApiKey(adminApiKey);
    } else {
      this.logger.log('La ADMIN_API_KEY ya está registrada en la base de datos.');
    }
  }

  // Metodo para crear la API KEY del admin
  async createAdminApiKey(key: string) {
    const apiKey = new ApiKeyEntity();
    apiKey.key = key;
    apiKey.customerName = 'admin'
    apiKey.isAdmin = true; 

    await this.apiKeyRepository.save(apiKey);
    this.logger.log('La ADMIN_API_KEY ha sido registrada en la base de datos.');
  }
}