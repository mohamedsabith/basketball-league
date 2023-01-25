import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['./**/*.entity.js'],
  synchronize: false,
  migrations: ['src/database/migrations/*{.ts,.js}'],
  migrationsRun: true,
  ...(process.env.DB_SSL === 'true'
    ? {
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }
    : {}),
});
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
