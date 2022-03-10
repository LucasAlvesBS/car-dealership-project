import { Column, Entity, ManyToMany } from 'typeorm';
import { Customers } from './customer.entity';
import { Dealership } from './dealership.entity';

@Entity({ name: 'vehicle' })
export class Vehicles extends Dealership {
  @Column({ length: '100' })
  name: string;

  @Column({ length: '100' })
  color: string;

  @Column()
  year: number;

  @Column()
  passengers: number;

  @ManyToMany(() => Customers, (customers) => customers.vehicles)
  customers: Customers[];
}
