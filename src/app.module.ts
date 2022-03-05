import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './app/customers/customers.module';

@Module({
  imports: [CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
