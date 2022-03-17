import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/shared/dtos/create/create-order.dto';
import { UpdateOrderDto } from 'src/shared/dtos/update/update-order.dto';
import { Orders } from 'src/shared/entities/order.entity';
import { createQueryBuilder, FindConditions, Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>,
  ) {}

  async findOneOrder(conditions: FindConditions<Orders>) {
    return createQueryBuilder(Orders, 'orders')
      .innerJoinAndSelect('orders.customer', 'customers')
      .innerJoinAndSelect('orders.vehicles', 'vehicles')
      .select([
        'orders.id as id',
        'orders.payment as payment',
        'orders.totalQuantity as totalQuantity',
        'SUM(vehicles.unitPrice) as totalCost',
        'customers.fullName as fullName',
      ])
      .where(conditions)
      .groupBy('orders.id')
      .addGroupBy('customers.fullName')
      .getRawOne();
  }
  /* 'orders.payment',
        'orders.totalQuantity',
        'orders.totalCost',
        'customers.fullName',
        'vehicles.brand',
        'vehicles.model',
        'vehicles.year',
        'vehicles.color',
        'vehicles.passengers',
        'vehicles.unitPrice', */
  async createOrder(data: CreateOrderDto) {
    const order = this.orderRepository.create(data);
    order.totalQuantity = order.vehicles.length;
    return await this.orderRepository.save(order);
  }

  async updateOrder(id: string, data: UpdateOrderDto) {
    const order = await this.orderRepository.findOneOrFail({ id });
    this.orderRepository.merge(order, data);
    return await this.orderRepository.save(order);
  }

  async deleteOrder(id: string) {
    await this.orderRepository.findOneOrFail({ id });
    this.orderRepository.softDelete({ id });
  }
}
