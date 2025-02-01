import { OperationsController } from '@core/services/operations/controller/operations.controller';
import { OperationsDtos } from '@core/services/operations/decorators/operations.dtos.decorator';
import { OperationsService } from '@core/services/operations/service/operations.service';
import { Controller, Inject } from '@nestjs/common';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../service/users.service';

@OperationsDtos({ create: CreateUserDto, update: UpdateUserDto })
@Controller('users')
export class UsersController extends OperationsController<User, CreateUserDto> {
  @Inject(UsersService)
  service: OperationsService<User>;
}
