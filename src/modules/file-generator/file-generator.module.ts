import { Module } from '@nestjs/common';
import { FileGeneratorService } from './file-generator.service';
import { FileGeneratorController } from './file-generator.controller';
import { DuacodersModule } from '../duacoders/duacoder.module';
import { ExcelGenerator } from './generators/excel.generator';
import { PdfGenerator } from './generators/pdf.generator';

@Module({
  imports: [DuacodersModule],
  providers: [FileGeneratorService, ExcelGenerator, PdfGenerator],
  controllers: [FileGeneratorController]
})
export class FileGeneratorModule {}
