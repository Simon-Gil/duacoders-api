import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { GetDuacodersQuery } from '../duacoders/dto/get-duacoders-query.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileGeneratorService } from './file-generator.service';
import { Response } from 'express';

@ApiTags('File-Generators')
@Controller('api/file-generator')
export class FileGeneratorController {
    constructor(private readonly fileGeneratorService: FileGeneratorService) { }

    // Obtener excel con lista de duacoders
    @Get('duacoder-excel')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtiene archivo xlsx con lista de duacoders' })
    @ApiQuery({ name: 'name', required: false, type: String })
    @ApiQuery({ name: 'withOnion', required: false, type: Boolean })
    @ApiQuery({ name: 'departmentId', required: false, type: String })
    @ApiQuery({ name: 'positionId', required: false, type: String })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    async getDuacodersExcel(@Query() query: GetDuacodersQuery, @Res() res: Response) {
        const { name, withOnion, departmentId, positionId, page, limit } = query;
        const buffer = await this.fileGeneratorService.generateDuacodersExcel({ name, departmentId, positionId, page, limit, withOnion })
        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': 'attachment; filename="duacoders.xlsx"',
        });
        res.send(buffer);
    }

    // Obtener el pdf con ficha de duacoder
    @Get('duacoder-detail/:nif')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtiene archivo xlsx con lista de duacoders' })
    async getDuacoderPDF(@Param('nif') nif: string, @Res() res: Response){
        const buffer = await this.fileGeneratorService.generateDuacoderPDF(nif);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="duacoder_${nif}.pdf"`,
          });
      
          res.send(buffer);
    }

}
