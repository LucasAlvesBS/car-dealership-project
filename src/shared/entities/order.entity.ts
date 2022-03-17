import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Payment } from '../enums/payment.enum';
import { Customers } from './customer.entity';
import { Dealership } from './dealership.entity';
import { Vehicles } from './vehicle.entity';

@Entity({ name: 'orders' })
export class Orders extends Dealership {
  @Column({ type: 'enum', enum: Payment, nullable: false })
  payment: Payment;

  @Column({ name: 'total_quantity' })
  totalQuantity: number;

  @Column({ name: 'total_cost' })
  totalCost: number;

  @ManyToOne(() => Customers, (customer) => customer.orders)
  @JoinColumn({ name: 'customer_id' })
  customer: Customers;

  @ManyToMany(() => Vehicles, (vehicles) => vehicles.orders)
  @JoinTable({
    name: 'orders_vehicles',
    joinColumns: [{ name: 'order_id' }],
    inverseJoinColumns: [{ name: 'vehicle_id' }],
  })
  vehicles: Vehicles[];
}
