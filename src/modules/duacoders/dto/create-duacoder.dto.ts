import { IsDateString, IsOptional, Matches } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";


// Clase DTO para la creación de duacoder
export class CreateDuacoderDTO{
    @Transform(({value}) => value.trim().toUpperCase())
    @ApiProperty({description: 'NIF de duacoder'})
    nif: string;

    @ApiProperty({description: 'Nombre de duacoder'})
    name: string;

    @ApiProperty({description: 'Biografía de duacoder'})
    bio: string;

    @ApiProperty({description: 'Foto de duacoder'})
    photoLink: string;

    @ApiProperty({description: 'Gusto de tortilla de duacoder (true: con cebolla, false: sin)'})
    withOnion: boolean

    @ApiProperty({description: 'Lista de habilidades de duacoder',
        type: [String]
    })
    skills: string[]

    @ApiProperty({description: 'Fecha de nacimiento de duacoder'})
    @IsOptional()
    @IsDateString()
    bDate: string

    @ApiProperty({description: 'ID de Departamento'})
    departmentId: string

    @ApiProperty({description: 'ID de Puesto'})
    positionId: string
}