import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVehicles1647196971942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE vehicles (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        brand varchar(100) NOT NULL,
        model varchar(100) NOT NULL,
        color varchar(255) NOT NULL,
        year int NOT NULL,
        unit_quantity int NOT NULL,
        unit_price decimal(10, 2) NOT NULL,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp 
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE vehicles');
  }
}
