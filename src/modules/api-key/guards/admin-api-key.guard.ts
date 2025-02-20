import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ApiKeyService } from '../api-key.service';
import { Observable } from 'rxjs';

// API Key Guard especial para permitir el acceso solo al admin
@Injectable()
export class AdminApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['authorization']?.replace('Bearer ', '');  

    if (!apiKey) {
      throw new UnauthorizedException('No se ha proporcionado una API Key');
    }

    const isAdmin = await this.apiKeyService.isAdmin(apiKey);
    if (!isAdmin) {
      throw new UnauthorizedException('Solo el admin puede acceder a este endpoint');
    }

    return true;
  }
}