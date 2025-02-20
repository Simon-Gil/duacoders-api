import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department/department.entity';
import { Position } from './position/position.entity';
import { CompanyStructureService } from './company-structure.service';
import { CompanyStructureController } from './company-structure.controller';
import { ApiKeyModule } from '../api-key/api-key.module';

@Module({
    imports: [TypeOrmModule.forFeature([Department, Position]), ApiKeyModule],
    providers: [CompanyStructureService],
    controllers: [CompanyStructureController],
    exports: [CompanyStructureService, TypeOrmModule]
  })
  export class CompanyStructureModule {}