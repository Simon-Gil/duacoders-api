import { DuacoderEntity } from "src/modules/duacoders/duacoder.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// Clase de entidad para Position
@Entity()
export class Position{
    @PrimaryGeneratedColumn('uuid', {name: 'department_id'})
    positionId: string;

    @Column({unique: true})
    name: string

    @OneToMany(() => DuacoderEntity, (duacoder) => duacoder.department)
    duacoders: DuacoderEntity[];
}