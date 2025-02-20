import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DuacodersModule } from './modules/duacoders/duacoder.module';
import { CompanyStructureModule } from './modules/company-structure/company-structure.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ApiKeyModule } from './modules/api-key/api-key.module';
import { ApiKeyGuard } from './modules/api-key/guards/api-key.guard';
import { APP_GUARD } from '@nestjs/core';
import { AdminKeyValidationService } from './modules/api-key/admin-key-validation.service';
import { ConfigModule } from '@nestjs/config';
import { FileGeneratorModule } from './modules/file-generator/file-generator.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeedsService } from './modules/seeds/seeds.service';
import { SeedsModule } from './modules/seeds/seeds.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',    
      host: process.env.DB_HOST,  
      port: parseInt(process.env.DB_PORT!, 10),         
      username: process.env.DB_USER,   
      password: process.env.DB_PASSWORD, 
      database: process.env.DB_NAME,   
      autoLoadEntities: true,
      synchronize: true, // Cambiar
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','static'),
      serveRoot: '/static'
    }),
    DuacodersModule,
    CompanyStructureModule,
    ApiKeyModule,
    FileGeneratorModule,
    SeedsModule
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard
    },
    AdminKeyValidationService,
    SeedsService
  ]
})
export class AppModule {}
