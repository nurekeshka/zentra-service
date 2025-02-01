import { SetMetadata } from '@nestjs/common';

export interface OperationsDtosParams<C extends object, U extends object> {
  create: C;
  update: U;
}

export const OperationsDtosParamsTitle = 'operations-dtos';

export const OperationsDtos = <C extends object, U extends object>(
  params: OperationsDtosParams<C, U>,
) => SetMetadata(OperationsDtosParamsTitle, params);
