import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { SeedsService } from './modules/seeds/seeds.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Seeder
  const environment = process.env.NODE_ENV || 'development';
  if(environment === 'development'){
    const seedService = app.get(SeedsService)
    await seedService.runSeed();
  }

  // Global filter
  app.useGlobalFilters(new GlobalExceptionFilter())

  // Swagger
  const config = new DocumentBuilder()
  .setTitle('Duacoders API')
  .setDescription('Documentación API')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
