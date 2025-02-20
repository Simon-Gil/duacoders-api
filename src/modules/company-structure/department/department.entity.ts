import { DuacoderEntity } from "src/modules/duacoders/duacoder.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Department{
    @PrimaryGeneratedColumn('uuid', {name: 'department_id'})
    departmentId: string;

    @Column({unique:true})
    name: string

    @OneToMany(() => DuacoderEntity, (duacoder) => duacoder.department)
    duacoders: DuacoderEntity[];
}