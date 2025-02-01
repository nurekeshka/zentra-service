import { DataSource } from 'typeorm';

import { database } from '../configs/production.json';

import { entities } from './database.module';

export const AppDataSource = new DataSource({
  type: database.type as 'postgres',
  host: database.host,
  port: database.port,
  username: database.username,
  password: database.password,
  database: database.name,
  entities: entities,
  migrations: [__dirname + '/../dist/migrations/*.js'],
  synchronize: false,
  logging: true,
  cache: database.cache,
});
