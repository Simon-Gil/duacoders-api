import { Module } from '@nestjs/common';
import { ApiKeyController } from './api-key.controller';
import { ApiKeyService } from './api-key.service';

import { ApiKeyGuard } from './guards/api-key.guard';
import { ApiKeyEntity } from './api-key.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([ApiKeyEntity])],  
  controllers: [ApiKeyController],
  providers: [ApiKeyService, ApiKeyGuard],
  exports: [ApiKeyService, TypeOrmModule]
})
export class ApiKeyModule {}
