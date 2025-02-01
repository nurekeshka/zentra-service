import { ValidationPipe } from '@nestjs/common';
import * as validation from '../../configs/modules/validation.json';

export const validationPipe = new ValidationPipe(validation);
