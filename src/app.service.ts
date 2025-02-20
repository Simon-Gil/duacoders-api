import { Injectable, NotFoundException } from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { Stream } from 'stream';

@Injectable()
export class AppService {
  getLogFileStream(): Stream {
    const logPath = join(process.cwd(), 'logs', 'error.log');

    if (!existsSync(logPath)) {
      throw new NotFoundException('Archivo error.log no encontrado');
    }

    return createReadStream(logPath);
  }
}
