import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '../database/database.module';

import { BootstrapperService } from '@core/services/bootstrap/bootstrapper.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => {
          return BootstrapperService.setupConfiguration();
        },
      ],
    }),
    DatabaseModule,
    UsersModule,
  ],
})
export class AppModule {}
