import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrders1647197218360 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE payment_options AS ENUM ('cash', 'credit_card', 'debit_card', 'pix');
      CREATE TABLE orders (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        payment payment_options NOT NULL,
        total_quantity int NOT NULL,
        customer_id UUID,
        vehicle_id UUID,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp,
        FOREIGN KEY (customer_id) REFERENCES customers(id),
        FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) 
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE orders; DROP TYPE payment_options');
  }
}
