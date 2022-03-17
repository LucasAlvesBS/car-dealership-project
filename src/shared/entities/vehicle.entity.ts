import { Column, Entity, ManyToMany } from 'typeorm';
import { Dealership } from './dealership.entity';
import { Orders } from './order.entity';

@Entity({ name: 'vehicles' })
export class Vehicles extends Dealership {
  @Column({ length: '100' })
  brand: string;

  @Column({ length: '100' })
  model: string;

  @Column({ length: '100' })
  color: string;

  @Column()
  year: number;

  @Column({ name: 'unit_quantity' })
  unitQuantity: number;

  @Column({ name: 'unit_price' })
  unitPrice: number;

  @ManyToMany(() => Orders, (orders) => orders.vehicles)
  orders: Orders[];
}
