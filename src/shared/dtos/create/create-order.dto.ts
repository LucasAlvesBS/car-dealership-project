import { IsEnum, IsNotEmpty } from 'class-validator';
import { Customers } from 'src/shared/entities/customer.entity';
import { Vehicles } from 'src/shared/entities/vehicle.entity';
import { Payment } from 'src/shared/enums/payment.enum';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsEnum(Payment)
  payment: Payment;

  @IsNotEmpty()
  customer: Customers;

  @IsNotEmpty()
  vehicles: Vehicles[];
}
