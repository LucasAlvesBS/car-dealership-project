import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Role } from '../enums/role.enum';
import { Dealership } from './dealership.entity';
import { Vehicles } from './vehicle.entity';

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

  @ManyToMany(() => Vehicles, (vehicles) => vehicles.customers)
  @JoinTable({
    name: 'customers_vehicles',
    joinColumns: [{ name: 'customer_id' }],
    inverseJoinColumns: [{ name: 'vehicle_id' }],
  })
  vehicles: Vehicles[];
}
