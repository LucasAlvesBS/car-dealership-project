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
import { CreateCustomerDto } from 'src/shared/dtos/create/create-customer.dto';
import { UpdateCustomerDto } from 'src/shared/dtos/update/update-customer.dto';
import { CustomersService } from './customers.service';

@Controller('dealership/customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Get()
  async findAllCustomers() {
    return await this.customerService.findAllCustomers();
  }

  @Get(':id')
  async getProfile(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.customerService.getProfile({ id });
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async createAccount(@Body() body: CreateCustomerDto) {
    return await this.customerService.createAccount(body);
  }

  @Patch(':id')
  async updateAccount(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateCustomerDto,
  ) {
    return await this.customerService.updateAccount(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAccount(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.customerService.deleteAccount(id);
  }
}
