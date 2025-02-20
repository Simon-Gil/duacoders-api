import { ExceptionFilter, Catch, ArgumentsHost, HttpException, InternalServerErrorException, Logger } from '@nestjs/common';
import { Response, Request } from 'express';
import * as fs from 'fs';

// Filtro global de excepciones. Devuelve respuesta con status y mensaje de error. Registra el error en el log

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name);
    private logFilePath = '/app/logs/error.log';

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = exception instanceof HttpException ? exception.getStatus() : 500;
        const message = exception.message || 'Internal Server Error';

        const logMessage = `[${new Date().toISOString()}] ${request.method} ${request.url} | STATUS: ${status} | ERROR: ${message}\n`;

        // Guardado
        fs.appendFileSync(this.logFilePath, logMessage);

        // Log en consola y respuesta al usuario
        this.logger.error(logMessage);

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
        });
    }
}