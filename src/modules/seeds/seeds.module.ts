import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../company-structure/department/department.entity';
import { Position } from '../company-structure/position/position.entity';
import { DuacoderEntity } from '../duacoders/duacoder.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Position, Department, DuacoderEntity])
  ],
  providers: [SeedsService],
  exports: [SeedsService]
})
export class SeedsModule {}
