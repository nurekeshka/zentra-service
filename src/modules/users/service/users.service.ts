import { OperationsEntity } from '@core/services/operations/decorators/operations.entity.decorator';
import { OperationsService } from '@core/services/operations/service/operations.service';
import { Injectable } from '@nestjs/common';
import { Column } from 'nestjs-paginate/lib/helper';

import { User } from '../entities/user.entity';

@OperationsEntity({ entity: User })
@Injectable()
export class UsersService extends OperationsService<User> {
  sortableColumns = ['username'] as Column<User>[];
}
