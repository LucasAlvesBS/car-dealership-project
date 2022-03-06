import { Column, Entity } from 'typeorm';
import { Dealership } from './dealership.entity';

@Entity({ name: 'vehicle' })
export class Vehicle extends Dealership {
  @Column({ length: '100' })
  name: string;

  @Column({ length: '100' })
  color: string;

  @Column()
  year: number;

  @Column()
  passengers: number;
}
