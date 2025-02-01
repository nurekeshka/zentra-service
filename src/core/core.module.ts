import { Module } from '@nestjs/common';

import { BootstrapperService } from './services/bootstrap/bootstrapper.service';
import { PaginationService } from './services/pagination/pagination.service';
import { ValidationService } from './services/validation/validation.service';

const services = [BootstrapperService, PaginationService, ValidationService];

@Module({ providers: services, exports: services })
export class CoreModule {}
