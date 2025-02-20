import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ApiKeyEntity } from './api-key.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKeyEntity)
    private apiKeyRepository: Repository<ApiKeyEntity>
  ){}

  // Verificar validez de ApiKey
  async isValidApiKey(apiKey: string): Promise<boolean>{
    const result = await this.apiKeyRepository.findOne({
        where: {key: apiKey}
    })

    if(!result){
        return false
    }
    return true
  }

  // Crea nuevo registro de API KEY 
  async createApiKey(customerName: string, isAdmin: boolean = false): Promise<ApiKeyEntity> {
    const apiKey = new ApiKeyEntity();
    apiKey.key = uuidv4();  
    apiKey.customerName = customerName
    apiKey.isAdmin = isAdmin;  
    const savedApiKey = await this.apiKeyRepository.save(apiKey);
    return savedApiKey;
  }

  // Obtener API KEYs
  async getApiKeys(): Promise<ApiKeyEntity[]>{
    const apiKeys = await this.apiKeyRepository.find();
    return apiKeys;
  }

  // Elimina API KEY (No se puede eliminar Admin API KEY)
  async deleteApiKey(id:string){
    const apiKeyEntity = await this.apiKeyRepository.findOne({
      where: {id}
    })

    // Restricciones
    if(!apiKeyEntity){
      throw new NotFoundException(`No se ha encontrado API KEY con ID: ${id} `)
    }else if(apiKeyEntity.isAdmin){
      throw new BadRequestException('No es posible eliminar el API KEY del administrador')
    }

    return await this.apiKeyRepository.delete(id)

  }


  // Comprueba si la API KEY recibida como parámetro pertenece al admin
  async isAdmin(key: string): Promise<boolean>{
    const apiKey = await this.apiKeyRepository.findOne({
        where: {key}
    })

    if(apiKey){
        return apiKey.isAdmin
    }else return false
  }

}