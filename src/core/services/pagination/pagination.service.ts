import { Injectable } from '@nestjs/common';
import {
  paginate,
  PaginateConfig,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { ObjectLiteral, Repository } from 'typeorm';

import * as pagination from '../../../configs/modules/pagination.json';

@Injectable()
export class PaginationService {
  paginate<T extends ObjectLiteral>(
    query: PaginateQuery,
    repository: Repository<T>,
    configuration: PaginateConfig<T>,
  ): Promise<Paginated<T>> {
    const settings = {
      ...pagination,
      ...configuration,
    } as never;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return paginate<T>(query, repository, settings) as Promise<Paginated<T>>;
  }
}
