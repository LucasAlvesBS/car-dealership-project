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
      .select([
        'orders.id',
        'orders.payment',
        'orders.totalQuantity',
        'customers.fullName',
      ])
      .where(conditions)
      .getOne();
  }

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
