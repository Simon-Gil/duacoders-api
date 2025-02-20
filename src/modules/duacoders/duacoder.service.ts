import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { DuacoderEntity } from './duacoder.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateDuacoderDTO } from './dto/create-duacoder.dto'
import { CompanyStructureService } from '../company-structure/company-structure.service'
import * as path from 'path'
import * as fs from 'fs';
import { join } from 'path'

@Injectable()
export class DuacoderService {
    private readonly uploadPath = join(__dirname, '..', '..', '..', 'static', 'duacoders_images');
    constructor(
        @InjectRepository(DuacoderEntity)
        private duacoderRepository: Repository<DuacoderEntity>,
        private companyStructureService: CompanyStructureService
    ) { }

    // Obtiene detalle de duacoder
    async getDuacoderDetail(nif: string): Promise<any> {
        const duacoder = await this.duacoderRepository.findOne({
            where: { nif },
            relations: ['department', 'position']
        })
        if (!duacoder) {
            throw new NotFoundException(`El duacoder con NIF: ${nif} no existe en la base de datos `)
        }
        return duacoder
    }

    // Crear duacoder
    async createDuacoder(createDuacoderDto: CreateDuacoderDTO): Promise<DuacoderEntity> {
        const { nif, name, bio, withOnion, skills, bDate, photoLink, departmentId, positionId } = createDuacoderDto

        const duacoder = this.duacoderRepository.create({
            nif,
            name,
            bio,
            photoLink,
            withOnion,
            skills,
            bDate
        });

        if (bDate) {
            const datePattern = /^\d{4}-\d{2}-\d{2}$/;
            const isValidDate = datePattern.test(bDate);
            if (!isValidDate) {
                throw new BadRequestException('La fecha de nacimiento debe estar en formato YYYY-MM-DD')
            }
        }

        // Asignación de departamento 
        const department = await this.companyStructureService.getDepartmentById(departmentId)
        if (!department) {
            throw new BadRequestException('No se puede asignar el Departamento recibido, ya que no existe en la base de datos')
        }
        duacoder.department = department

        // Asignación de puesto
        const position = await this.companyStructureService.getPositionById(positionId)
        if (!position) {
            throw new BadRequestException('No se puede asignar el Puesto recibido, ya que no existe en la base de datos')
        }
        duacoder.position = position

        try {
            await this.duacoderRepository.insert(duacoder);
            return duacoder;
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new BadRequestException('El NIF ya está registrado en la base de datos');
            }
            throw new InternalServerErrorException('Error al crear el Duacoder');
        }
    }

    // Obtener duacoders. Recibe query con filtros y paginado
    async getDuacoders(query: any): Promise<DuacoderEntity[]> {
        const { name, departmentId, positionId, withOnion } = query;
        const queryBuilder = this.duacoderRepository.createQueryBuilder('duacoder')
            .leftJoinAndSelect('duacoder.department', 'department')
            .leftJoinAndSelect('duacoder.position', 'position')

        // Filtrado
        if (name) {
            queryBuilder.andWhere('duacoder.name LIKE :name', { name: `%${name}%` });
        }
        if (departmentId) {
            queryBuilder.andWhere('department.departmentId = :departmentId', { departmentId });
        }
        if (positionId) {
            queryBuilder.andWhere('duacoder.positionId = :positionId', { positionId });
        }
        if (withOnion !== undefined) {
            const parsedWithOnion = withOnion === 'true' ? 1 : 0;
            queryBuilder.andWhere('duacoder.withOnion = :parsedWithOnion', { parsedWithOnion })
        }

        // Paginación
        if (query.limit && query.page) {
            const limit = Number(query.limit);
            const page = Number(query.page);

            if (isNaN(limit) || isNaN(page) || limit <= 0 || page < 1) {
                throw new BadRequestException('El límite y la página deben ser números enteros positivos');
            }

            queryBuilder.skip((page - 1) * limit);
            queryBuilder.take(limit);
        }


        const duacoders = await queryBuilder.getMany();


        return duacoders

    }

    // Elimina duacoder
    async deleteDuacoder(nif: string) {
        return await this.duacoderRepository.delete({ nif: nif })
    }

    // Actualizar imagen de duacoder
    async updateDuacoderImage(nif: string, photoPath: string): Promise<DuacoderEntity> {
        const duacoder = await this.duacoderRepository.findOne({
            where: { nif: nif }
        });

        if (!duacoder) {
            throw new BadRequestException(`No se encontró un duacoder con NIF: ${nif}`)
        }
        // Eliminamos imagen anterior del duacoder (a no ser que tenga el mismo nombre y se sobreescriba)
        if (duacoder.photoLink != photoPath) {
            await this.deleteImage(duacoder.photoLink)
        }
        duacoder.photoLink = photoPath


        return await this.duacoderRepository.save(duacoder)
    }

    // Actualizar duacoder
    async updateDuacoder(nif: string, updateDuacoderDto: Partial<CreateDuacoderDTO>) {
        const duacoder = await this.duacoderRepository.findOne({
            where: { nif: nif }
        })

        if (!duacoder) {
            throw new NotFoundException(`El NIF ${nif} no corresponde a ningún duacoder de la base de datos`)
        }

        if (updateDuacoderDto.departmentId) {
            const department = await this.companyStructureService.getDepartmentById(updateDuacoderDto.departmentId)
            if (!department) {
                throw new BadRequestException(`El departamento con ID: ${updateDuacoderDto.departmentId} no existe en la base de datos`)
            }
            duacoder.department = department;
        }

        if (updateDuacoderDto.positionId) {
            const position = await this.companyStructureService.getPositionById(updateDuacoderDto.positionId)
            if (!position) {
                throw new BadRequestException(`El puesto con ID: ${updateDuacoderDto.positionId} no existe en la base de datos`)
            }
            duacoder.position = position;
        }

        Object.assign(duacoder, updateDuacoderDto);

        return await this.duacoderRepository.save(duacoder)
    }


    // Elimina imagen. Recibe photoPath
    async deleteImage(photoPath: string): Promise<void> {

        const fileName = photoPath.split('/').pop(); // Extrae el nombre del archivo
        if (!fileName) {
            return;
        }

        // Construir la ruta absoluta correcta
        const fullPath = join(this.uploadPath, fileName);

        try {
            await fs.promises.unlink(fullPath); // Intentar eliminar el archivo
            console.log(`Archivo eliminado: ${fullPath}`);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.warn(`El archivo no existe y no se puede eliminar: ${fullPath}`);
                return;
            }
            console.error('Error al eliminar el archivo:', error);
            throw new BadRequestException(`No se pudo eliminar el archivo: ${fullPath}`);
        }
    }


}