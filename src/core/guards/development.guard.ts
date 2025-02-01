import { BootstrapperService } from '@core/services/bootstrap/bootstrapper.service';
import { MaybeAsync } from '@core/types';
import { CanActivate } from '@nestjs/common';

export class DevelopmentOnly implements CanActivate {
  canActivate(): MaybeAsync<boolean> {
    return ['development', 'test'].some(
      (value) => BootstrapperService.env === value,
    );
  }
}
