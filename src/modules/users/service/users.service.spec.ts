import { OperationsServiceTestsFactory } from '@core/services/operations/service/operations.service.tests';

import { User } from '../entities/user.entity';

import { UsersService } from './users.service';

OperationsServiceTestsFactory(User, UsersService);
