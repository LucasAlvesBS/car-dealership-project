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
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      logging: false,
      ssl: {
        rejectUnauthorized: false,
      },
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
