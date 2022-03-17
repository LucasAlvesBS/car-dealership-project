require('dotenv/config');

module.exports = {
  type: process.env.DB_TYPE,
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  ssl: true,
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
