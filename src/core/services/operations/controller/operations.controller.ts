import { DevelopmentOnly } from '@core/guards/development.guard';
import {
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  OnModuleInit,
  Controller,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

import { ValidationService } from '../../validation/validation.service';
import {
  OperationsDtosParams,
  OperationsDtosParamsTitle,
} from '../decorators/operations.dtos.decorator';
import { OperationsService } from '../service/operations.service';

@Controller()
export abstract class OperationsController<T, D extends object>
  implements OnModuleInit
{
  private dtos: OperationsDtosParams<D, Partial<D>>;
  abstract service: OperationsService<T>;

  constructor(
    private readonly reflector: Reflector,
    private readonly validator: ValidationService,
  ) {}

  onModuleInit() {
    const params = this.reflector.get(
      OperationsDtosParamsTitle,
      this.constructor,
    );

    if (params) {
      this.dtos = params;
    } else {
      throw new Error('Data transfer objects metadata not found.');
    }
  }

  @Post()
  @UseGuards(DevelopmentOnly)
  async create(@Body() dto: typeof this.dtos.create) {
    const errors = await this.validator.validate(this.dtos.create, dto);
    if (errors.message.length > 0) return errors;
    return this.service.create(dto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @UseGuards(DevelopmentOnly)
  async update(@Param('id') id: string, @Body() dto: typeof this.dtos.update) {
    const errors = await this.validator.validate(this.dtos.update, dto);
    if (errors.message.length > 0) return errors;
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(DevelopmentOnly)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
