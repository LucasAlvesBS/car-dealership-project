import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CustomersModule } from './app/customers/customers.module';
import { VehiclesModule } from './app/vehicles/vehicles.module';
import { OrdersModule } from './app/orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE,
      url: process.env.DATABASE_URL,
      synchronize: false,
      logging: false,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
    } as TypeOrmModuleOptions),
    CustomersModule,
    VehiclesModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
