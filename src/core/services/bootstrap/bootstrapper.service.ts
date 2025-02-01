import * as fs from 'fs';
import * as path from 'path';

import { INestApplication, Injectable, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as swagger from '../../../configs/modules/swagger.json';

import { ErrorsFilter } from '../../filters/errors.filter';
import { validationPipe } from '../../pipes/validation.pipe';
import { ProcessEnv } from '../../types';

@Injectable()
export class BootstrapperService {
  private readonly logger = new Logger(BootstrapperService.name);

  private readonly pipes = [validationPipe];
  private readonly filters = [new ErrorsFilter()];

  public static readonly env = (process.env.NODE_ENV ??
    'development') as ProcessEnv;

  setup(app: INestApplication): void {
    this.setupGlobalFilters(app);
    this.setupGlobalPipes(app);
    this.setupSwagger(app);
    this.setupLogger();
  }

  setupLogger(): void {
    this.logger.log(`Bootstrapping in ${BootstrapperService.env} mode`);
  }

  setupGlobalPipes(app: INestApplication): void {
    app.useGlobalPipes(...this.pipes);
  }

  setupGlobalFilters(app: INestApplication): void {
    app.useGlobalFilters(...this.filters);
  }

  setupSwagger(app: INestApplication): void {
    const configuration = swagger;

    const builder = new DocumentBuilder()
      .setTitle(configuration.title)
      .setDescription(configuration.description)
      .setVersion(configuration.version)
      .addBearerAuth();

    configuration.servers.forEach((server) => {
      builder.addServer(server.link, server.title);
    });

    const config = builder.build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup(configuration.path, app, document);
  }

  static setupConfiguration(): Record<string, any> {
    const filepath = path.resolve(
      __dirname,
      `../configs/application/${this.env}.json`,
    );

    const file = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(file) as Record<string, any>;
  }
}
