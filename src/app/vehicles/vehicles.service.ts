import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVehicleDto } from 'src/shared/dtos/create/create-vehicle.dto';
import { UpdateVehicleDto } from 'src/shared/dtos/update/update-vehicle.dto';
import { Vehicles } from 'src/shared/entities/vehicle.entity';
import { createQueryBuilder, FindConditions, Repository } from 'typeorm';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicles)
    private readonly vehicleRepository: Repository<Vehicles>,
  ) {}

  async findAllVehicles() {
    return createQueryBuilder(Vehicles, 'vehicles')
      .select([
        'vehicles.id',
        'vehicles.brand',
        'vehicles.model',
        'vehicles.year',
        'vehicles.passengers',
      ])
      .getMany();
  }

  async findOneVehicle(conditions: FindConditions<Vehicles>) {
    return createQueryBuilder(Vehicles, 'vehicles')
      .select([
        'vehicles.id',
        'vehicles.name',
        'vehicles.year',
        'vehicles.passengers',
      ])
      .where(`vehicles.id = ${conditions}`)
      .getOne();
  }

  async createVehicle(data: CreateVehicleDto) {
    const vehicle = this.vehicleRepository.create(data);
    return await this.vehicleRepository.save(vehicle);
  }

  async updateVehicle(id: string, data: UpdateVehicleDto) {
    const vehicle = await this.vehicleRepository.findOneOrFail({ id });
    this.vehicleRepository.merge(vehicle, data);
    return await this.vehicleRepository.save(vehicle);
  }

  async deleteVehicle(id: string) {
    await this.vehicleRepository.findOneOrFail({ id });
    this.vehicleRepository.softDelete({ id });
  }
}
