import { Module } from '@nestjs/common';
import { CustomersModule } from './app/customers/customers.module';

@Module({
  imports: [CustomersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
