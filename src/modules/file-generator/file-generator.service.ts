import { Injectable, NotFoundException } from '@nestjs/common';
import { DuacoderService } from '../duacoders/duacoder.service';
import { ExcelGenerator } from './generators/excel.generator';
import { PdfGenerator } from './generators/pdf.generator';

@Injectable()
export class FileGeneratorService {
    constructor(
        private readonly duacoderService: DuacoderService,
        private readonly excelGenerator: ExcelGenerator,
        private readonly pdfGenerator: PdfGenerator
    ) {} 
    
    async generateDuacodersExcel(query:any){
        const duacoders = await this.duacoderService.getDuacoders(query)
        const workbook = await this.excelGenerator.generateExcel(duacoders)
        return new Promise((resolve, reject) => {
            workbook.writeToBuffer().then((buffer) => {
              resolve(buffer);
            }).catch((err) => reject(err));
          });
    }

    async generateDuacoderPDF(nif:string): Promise<Buffer>{
        const duacoder = await this.duacoderService.getDuacoderDetail(nif);
        if(!duacoder){
            throw new NotFoundException('No existe ningún duacoder con el NIF especificado')
        }
        return await this.pdfGenerator.generateDuacoderPdf(duacoder)
    }
}
