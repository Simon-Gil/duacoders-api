import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from '../company-structure/position/position.entity';
import { Repository } from 'typeorm';
import { Department } from '../company-structure/department/department.entity';
import { departments } from './data/departments.data';
import { positions } from './data/positions.data';
import { DuacoderEntity } from '../duacoders/duacoder.entity';
import { duacoders } from './data/duacoders.data';

@Injectable()
export class SeedsService {
    constructor(
        @InjectRepository(Position)
        private readonly positionRepository: Repository<Position>,
    
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>,

        @InjectRepository(DuacoderEntity)
        private readonly duacoderRepository: Repository<DuacoderEntity>
    ){}

    async runSeed(){
        console.log('Insertando sample data...')

        
        // Insertar departamentos
        if((await this.departmentRepository.count() === 0)) {
            await this.departmentRepository.save(departments)
        }

        // Insertar puestos
        if((await this.positionRepository.count() === 0)) {
            await this.positionRepository.save(positions)
        }

        // Obtener departamentos y puestos
        const savedDepartments = await this.departmentRepository.find();
        const savedPositions = await this.positionRepository.find();

        // Insertar duacoders
        if(await this.duacoderRepository.count() === 0) {
            const duacoderEntities : DuacoderEntity[] = [];
            duacoders.forEach(async duacoder => {
                const { nif, name, bio, withOnion, skills, bDate, photoLink } = duacoder;

                const duacoderEntity = this.duacoderRepository.create({
                    nif,
                    name,
                    bio,
                    photoLink,
                    withOnion,
                    skills,
                    bDate
                });
        
                const department = savedDepartments.find(dep => dep.name === duacoder.departmentId);
                const position = savedPositions.find(pos => pos.name === duacoder.positionId);
                if(department && position){
                    duacoderEntity.department = department;
                    duacoderEntity.position = position;
                    
                    await this.duacoderRepository.save(duacoderEntity)
                }else{
                    console.log(`No se encontro puesto o departamento para el duacoder: ${duacoder.name}}`)
                }
            });

        }
        console.log('Datos insertados')
    }
   
}
