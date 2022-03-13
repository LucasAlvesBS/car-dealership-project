import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrdersVehicles1647197565443 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE orders_vehicles (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        order_id UUID,
        vehicle_id UUID,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) 
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE orders_vehicles');
  }
}
