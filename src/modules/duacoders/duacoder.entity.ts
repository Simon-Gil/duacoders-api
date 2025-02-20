import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Department } from "../company-structure/department/department.entity";
import { Position } from "../company-structure/position/position.entity";

// Clase de entidad para Duacoder
@Entity({name: "duacoder"})
export class DuacoderEntity{
    @PrimaryColumn({name: "nif"})
    nif:string;

    @Column()
    name: string;

    @Column()
    bio: string;

    @Column()
    photoLink: string;

    @Column()
    withOnion: boolean;

    @Column('simple-array', {nullable:true})
    skills: string[];

    @Column({type: 'date', name: 'b_date', nullable: true})
    bDate: string;

    @ManyToOne(() => Department, (department) => department.duacoders)
    department: Department;

    @ManyToOne(()=> Position, (position) => position.duacoders)
    position: Position;

}