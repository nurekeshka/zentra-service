import { BootstrapperService } from '@core/services/bootstrap/bootstrapper.service';
import { AppModule } from '@modules/app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const application = await NestFactory.create(AppModule);
  const bootstraper = application.get(BootstrapperService);
  bootstraper.setup(application);
  await application.listen(8080);
}

void bootstrap();
