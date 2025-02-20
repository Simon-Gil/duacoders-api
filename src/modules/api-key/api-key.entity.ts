import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'api_key'})
export class ApiKeyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string;

  @Column({name: 'customer_name'})
  customerName:string

  @Column({name: 'is_admin', default: false})
  isAdmin: boolean
}