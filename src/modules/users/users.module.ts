import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controller/users.controller';
import { User } from './entities/user.entity';
import { UsersService } from './service/users.service';

export const UsersEntities = [User];

@Module({
  imports: [CoreModule, TypeOrmModule.forFeature(UsersEntities)],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
