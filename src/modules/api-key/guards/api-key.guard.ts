
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ApiKeyService } from '../api-key.service'; 

// API Key guard para restringir el acceso a los endpoints de la API
@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const apiKey = request.headers['authorization']?.replace('Bearer ', '');  

    if (!apiKey || !(await this.apiKeyService.isValidApiKey(apiKey))) {
      throw new UnauthorizedException('API Key inválida');
    }

    return true;  
  }
}