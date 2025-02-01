import { SetMetadata } from '@nestjs/common';
import { EntityTarget } from 'typeorm';

export interface OperationsEntityParams {
  entity: EntityTarget<never>;
}

export const OperationsEntityParamsTitle = 'operations-entity';

export const OperationsEntity = (params: OperationsEntityParams) =>
  SetMetadata(OperationsEntityParamsTitle, params);
