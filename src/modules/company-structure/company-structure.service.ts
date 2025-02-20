import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Department } from './department/department.entity';
import { Position } from './position/position.entity';
import { CreateDepartmentDto } from './department/create-department.dto';
import { CreatePositionDto } from './position/create-position.dto';

@Injectable()
export class CompanyStructureService {
    constructor(
        @InjectRepository(Department)
        private departmentRepository: Repository<Department>,
        @InjectRepository(Position)
        private positionRepository: Repository<Position>,
    ) { }

    async createDepartment(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
        const department = this.departmentRepository.create(createDepartmentDto);
        try{
            await this.departmentRepository.insert(department);
            return department
        }catch(error){
            if(error.code === 'ER_DUP_ENTRY'){
                throw new BadRequestException('El nombre ya está asignado a otro departamento')
            }
            throw new InternalServerErrorException('Error al crear el departamento')
        }
    }

    async getDepartments(): Promise<Department[]> {
        return this.departmentRepository.find();
    }

    async getDepartmentById(departmentId: string): Promise<Department | null>{
        return this.departmentRepository.findOne({
            where: {departmentId : departmentId}
        })
    } 

    async createPosition(createPositionDto: CreatePositionDto): Promise<Position> {
        const position = this.positionRepository.create(createPositionDto);
        try{
            await this.positionRepository.insert(position);
            return position
        }catch(error){
            if(error.code === 'ER_DUP_ENTRY'){
                throw new BadRequestException('El nombre ya está asignado a otro puesto')
            }else{
                throw new InternalServerErrorException('Error al crear el puesto')
            }
        }
    }

    async getPositions(): Promise<Position[]>{
        return this.positionRepository.find()
    }

    async getPositionById(positionId: string): Promise<Position | null>{
        return this.positionRepository.findOne({
            where: {positionId : positionId}
        })
    } 


}