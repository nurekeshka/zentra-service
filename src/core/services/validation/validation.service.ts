import { Injectable, Type } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as validation from '../../../configs/modules/validation.json';

@Injectable()
export class ValidationService {
  async validate<T extends Type, V extends object>(
    clazz: ClassConstructor<T>,
    body: V,
  ) {
    const instance = plainToInstance(clazz, body);

    const errors: ValidationError[] = await validate(instance, validation);

    const message: string[] = errors.flatMap((error) =>
      error.constraints ? Object.values(error.constraints) : [],
    );

    return { message, error: 'Bad Request', statusCode: 400 };
  }
}
