require('dotenv/config');

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  entities: [process.env.ENTITIES],
  migrations: [process.env.MIGRATIONS],
  cli: {
    entitiesDir: 'src/shared/entities/',
    migrationsDir: 'src/configs/typeorm/migrations',
  },
};
