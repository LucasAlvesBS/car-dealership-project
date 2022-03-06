import { Column, Entity } from 'typeorm';
import { Role } from '../enums/role.enum';
import { Dealership } from './dealership.entity';

@Entity({ name: 'customers' })
export class Customers extends Dealership {
  @Column({ name: 'full_name', length: '255' })
  fullName: string;

  @Column({ length: '255', unique: true })
  email: string;

  @Column({ length: '255' })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;
}
