import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from 'src/shared/dtos/create/create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
