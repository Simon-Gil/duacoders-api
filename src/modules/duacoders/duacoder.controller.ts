import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { DuacoderService } from "./duacoder.service";
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConsumes, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, PartialType } from "@nestjs/swagger";
import { CreateDuacoderDTO } from "./dto/create-duacoder.dto";
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer'
import * as path from "path";
import { DuacoderEntity } from "./duacoder.entity";
import { GetDuacodersQuery } from "./dto/get-duacoders-query.dto";



@ApiTags('Duacoders')
@Controller('api/duacoders')
export class DuacoderController {
    constructor(
        private readonly duacoderService: DuacoderService,
    ) { }

    // Obtener detalle duacoder
    @Get(':nif')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener detalle duacoder' })
    getDuacoderDetail(@Param('nif') nif: string) {
        return this.duacoderService.getDuacoderDetail(nif)
    }

    // Crear duacoder
    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Crear duacoder' })
    @ApiResponse({ status: 201, description: 'Duacoder creado con éxito' })
    @ApiResponse({ status: 400, description: 'Datos incorrectos' })
    postDuacoder(
        @Body() createDuacoderDto: CreateDuacoderDTO
    ) {
        return this.duacoderService.createDuacoder(createDuacoderDto)
    }

    // Obtener duacoders con filtros y paginación
    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtiene lista de duacoders, con opciones de filtrado y paginación' })
    @ApiQuery({ name: 'name', required: false, type: String })
    @ApiQuery({name: 'withOnion', required: false, type: Boolean})
    @ApiQuery({ name: 'departmentId', required: false, type: String })
    @ApiQuery({ name: 'positionId', required: false, type: String })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    getDuacoders(@Query() query: GetDuacodersQuery) {
        const { name,withOnion, departmentId, positionId, page, limit } = query;
        return this.duacoderService.getDuacoders({ name, departmentId, positionId, page, limit, withOnion})
    }

    // Eliminar duacoder
    @Delete(':nif')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Elimina un duacoder' })
    deleteDuacoder(@Param('nif') nif: string) {
        return this.duacoderService.deleteDuacoder(nif)
    }

    // Actualizar duacoder
    @Put(':nif')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Actualiza datos de duacoder' })
    @ApiParam({ name: 'nif', required: true, description: 'NIF de duacoder' })
    @ApiBody({ type: PartialType(CreateDuacoderDTO) })
    @ApiOkResponse({ description: 'Duacoder actualizado correctamente', type: DuacoderEntity })
    @ApiNotFoundResponse({ description: 'No se encontró el Duacoder' })
    @ApiBadRequestResponse({ description: 'Datos inválidos' })
    async updateDuacoder(
        @Param('nif') nif: string,
        @Body() updateDuacoderDto: Partial<CreateDuacoderDTO>
    ): Promise<DuacoderEntity> {
        return await this.duacoderService.updateDuacoder(nif, updateDuacoderDto);
    }


    // Actualizar imagen de duacoder
    @Post(':id/upload-image')
    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('photo', {
        storage: diskStorage({
            destination: path.join(__dirname, '..','..', '..', 'static', 'duacoders_images'),
            filename: (req, file, cb) => {
                const { id } = req.params; 
                if (!id) {
                    return cb(new BadRequestException('ID de usuario requerido'), '');
                }
                const fileExtension = file.originalname.split('.').pop();
                const fileName = `${uuidv4()}.${fileExtension}`;
                cb(null, fileName);
            }
        }),
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.startsWith('image/')) {
                return cb(new BadRequestException('Este endpoint solo permite la subida de imágenes'), false);
            }
            cb(null, true);
        }
    }))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                photo: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    })
    async updateDuacoderImage(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File
    ) {
        if (!file) {
            throw new BadRequestException('No se ha enviado ninguna imagen.');
        }

        const photoPath = `/static/duacoders_images/${file.filename}`;

        return this.duacoderService.updateDuacoderImage(id, photoPath);
    }

}