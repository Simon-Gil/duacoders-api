import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CompanyStructureService } from './company-structure.service';
import { CreateDepartmentDto } from './department/create-department.dto';
import { CreatePositionDto } from './position/create-position.dto';
import { AdminApiKeyGuard } from '../api-key/guards/admin-api-key.guard';


@ApiTags('Company-structure')
@Controller('api/company-structure')
export class CompanyStructureController {
  constructor(private readonly companyStructureService: CompanyStructureService) {}


  // Endpoints Department
  @Post('departments')
  @UseGuards(AdminApiKeyGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear departamento. (Requiere Admin API KEY)' })
  @ApiResponse({ status: 201, description: 'Departamento creado con éxito' })
  createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.companyStructureService.createDepartment(createDepartmentDto);
  }

  @Get('departments')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener departamentos'})
  getDepartments(){
    return this.companyStructureService.getDepartments()
  }



  // Endpoints Position
  @Post('positions')
  @UseGuards(AdminApiKeyGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear nuevo puesto. (Requiere Admin API KEY)' })
  @ApiResponse({ status: 201, description: 'Puesto creado con éxito' })
  createPosition(@Body() createPositionDto: CreatePositionDto) {
    return this.companyStructureService.createPosition(createPositionDto);
  }

  @Get('positions')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener puestos'})
  getPositions(){
    return this.companyStructureService.getPositions();
  }
}