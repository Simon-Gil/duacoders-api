import { Controller, Get, HttpException, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AdminApiKeyGuard } from './modules/api-key/guards/admin-api-key.guard';

@ApiTags('App')
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Comprueba el correcto funcionamiento del servidor'})
  checkHealth() {
    return {status: 'ok', timestamp: new Date()};
  }

  // Endpoint
  @Get('logs')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtiene el log de errores del servidor. Requiere Admin API KEY.'})
  @UseGuards(AdminApiKeyGuard)
  async downloadLogs(@Res() res: Response) {
    try {
      const fileStream = this.appService.getLogFileStream();

      res.setHeader('Content-Disposition', 'attachment; filename=error.log');
      res.setHeader('Content-Type', 'text/plain');

      fileStream.pipe(res);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
