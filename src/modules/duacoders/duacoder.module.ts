import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DuacoderEntity } from "./duacoder.entity";
import { DuacoderService } from "./duacoder.service";
import { DuacoderController } from "./duacoder.controller";
import { CompanyStructureModule } from "../company-structure/company-structure.module";

@Module({
    imports: [TypeOrmModule.forFeature([DuacoderEntity]),
        CompanyStructureModule
    ],
    providers: [DuacoderService],
    controllers: [DuacoderController],
    exports: [DuacoderService, TypeOrmModule]
})

export class DuacodersModule { }