import { UsersEntities } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

export type DatabaseTypeOptions = 'postgres' | 'sqlite';

export const entities = [...UsersEntities];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configs: ConfigService): TypeOrmModuleOptions => {
        return {
          type: configs.get<DatabaseTypeOptions>('database.type'),
          host: configs.get<string>('database.host'),
          port: configs.get<number>('database.port'),
          username: configs.get<string>('database.username'),
          password: configs.get<string>('database.password'),
          database: configs.get<string>('database.name'),
          entities: entities,
          migrations: ['src/database/migrations/*{.ts,.js}'],
          synchronize: configs.get<boolean>('database.synchronize'),
          dropSchema: configs.get<boolean>('database.dropSchema'),
          logging: configs.get<boolean>('database.logging'),
        };
      },
    }),
  ],
})
export class DatabaseModule {}
