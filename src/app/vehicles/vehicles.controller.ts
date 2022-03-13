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
import { CreateVehicleDto } from 'src/shared/dtos/create/create-vehicle.dto';
import { UpdateVehicleDto } from 'src/shared/dtos/update/update-vehicle.dto';
import { VehiclesService } from './vehicles.service';

@Controller('dealership/vehicles')
export class VehiclesController {
  constructor(private readonly vehicleService: VehiclesService) {}

  @Get()
  async findAllVehicles() {
    return await this.vehicleService.findAllVehicles();
  }

  @Get(':id')
  async findOneVehicle(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.vehicleService.findOneVehicle({ id });
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async createVehicle(@Body() body: CreateVehicleDto) {
    return await this.vehicleService.createVehicle(body);
  }

  @Patch(':id')
  async updateVehicle(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateVehicleDto,
  ) {
    return await this.vehicleService.updateVehicle(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteVehicle(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.vehicleService.deleteVehicle(id);
  }
}
