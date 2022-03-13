import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomers1647196669348 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE role_options AS ENUM ('user', 'admin');
      CREATE TABLE customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        full_name varchar(255) NOT NULL,
        email varchar(255) NOT NULL UNIQUE,
        password varchar(255) NOT NULL,
        role role_options DEFAULT 'user',
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp 
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE customers; DROP TYPE role_options');
  }
}
