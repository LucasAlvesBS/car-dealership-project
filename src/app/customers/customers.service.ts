import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from 'src/shared/dtos/create/create-customer.dto';
import { UpdateCustomerDto } from 'src/shared/dtos/update/update-customer.dto';
import { Customers } from 'src/shared/entities/customer.entity';
import { createQueryBuilder, FindConditions, Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customers)
    private readonly customerRepository: Repository<Customers>,
  ) {}

  async findAllCustomers() {
    return createQueryBuilder(Customers, 'customers')
      .innerJoinAndSelect('customers.vehicles', 'vehicles')
      .select([
        'customers.id',
        'customers.fullName',
        'vehicles.id',
        'vehicles.name',
      ])
      .getMany();
  }

  async getProfile(conditions: FindConditions<Customers>) {
    return createQueryBuilder(Customers, 'customers')
      .innerJoinAndSelect('customers.vehicles', 'vehicles')
      .select([
        'customers.id',
        'customers.fullName',
        'vehicles.id',
        'vehicles.name',
      ])
      .where(`customers.id = ${conditions}`)
      .getOne();
  }

  async createAccount(data: CreateCustomerDto) {
    const user = this.customerRepository.create(data);
    return await this.customerRepository.save(user);
  }

  async updateAccount(id: string, data: UpdateCustomerDto) {
    const user = await this.customerRepository.findOneOrFail({ id });
    this.customerRepository.merge(user, data);
    return await this.customerRepository.save(user);
  }

  async deleteAccount(id: string) {
    await this.customerRepository.findOneOrFail({ id });
    this.customerRepository.softDelete({ id });
  }
}
