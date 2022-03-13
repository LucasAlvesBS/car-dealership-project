import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateOrderDto } from 'src/shared/dtos/create/create-order.dto';
import { UpdateOrderDto } from 'src/shared/dtos/update/update-order.dto';
import { OrdersService } from './orders.service';

@Controller('dealership/orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get(':id')
  async findOneOrder(@Param('id') id: string) {
    return await this.orderService.findOneOrder({ id });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() body: CreateOrderDto) {
    return await this.orderService.createOrder(body);
  }

  @Patch(':id')
  async updateOrder(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateOrderDto,
  ) {
    return await this.orderService.updateOrder(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOrder(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.orderService.deleteOrder(id);
  }
}
