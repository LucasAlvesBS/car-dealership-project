require('dotenv/config');

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ['dist/shared/entities/*.entity.js'],
  migrations: ['dist/configs/typeorm/migrations/*.js'],
  cli: {
    entitiesDir: 'src/shared/entities/',
    migrationsDir: 'src/configs/typeorm/migrations',
  },
};
