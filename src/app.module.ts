import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './app/customers/customers.module';
import { VehiclesModule } from './app/vehicles/vehicles.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({}), CustomersModule, VehiclesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
