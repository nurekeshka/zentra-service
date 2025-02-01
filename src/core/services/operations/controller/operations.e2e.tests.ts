import { AppModule } from '@modules/app.module';
import { INestApplication, Type } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import * as supertest from 'supertest';

import { BootstrapperService } from '../../bootstrap/bootstrapper.service';
import { OperationsDtosParams } from '../decorators/operations.dtos.decorator';

import { OperationsController } from './operations.controller';

export const OperationsE2ETestsFactory = <T extends Type, C extends object>(
  ControllerClass: Type<OperationsController<InstanceType<T>, C>>,
  Module: Type<object>,
  mocks: {
    valid: OperationsDtosParams<C, Partial<C>>;
    invalid: C;
  },
) => {
  describe(`${ControllerClass.name} E2E Tests`, () => {
    const reflector = new Reflector();
    const route = `/${reflector.get<string>('path', ControllerClass)}`;

    let entityId: string;

    let app: INestApplication;

    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule, Module],
      }).compile();

      app = moduleFixture.createNestApplication();
      BootstrapperService.setupGlobalPipes(app);
      BootstrapperService.setupGlobalFilters(app);
      await app.init();
    });

    it(`${route} (POST) - should create an entity on valid input`, async () => {
      const response = await supertest(app.getHttpServer())
        .post(route)
        .send(mocks.valid.create)
        .expect(201);

      expect(response.body).toMatchObject({
        id: expect.any(String),
        ...mocks.valid.create,
      });

      entityId = response.body.id;
    });

    it(`${route} (POST) - should reject creating an entity on invalid input`, async () => {
      const response = await supertest(app.getHttpServer())
        .post(route)
        .send(mocks.invalid)
        .expect(201);

      expect(response.body).toMatchObject({
        message: expect.any(Array<string>),
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    it(`${route} (GET) - should return all entities`, async () => {
      const response = await supertest(app.getHttpServer())
        .get(route)
        .send()
        .expect(200);

      expect(response.body).toMatchObject({
        data: expect.any(Array),
        meta: {
          itemsPerPage: 20,
          totalItems: 1,
          currentPage: 1,
          totalPages: 1,
        },
        links: expect.any(Object),
      });
      expect(response.body.data.length).toBe(1);
    });

    it(`${route}/:id (GET) - should return one entity`, async () => {
      const response = await supertest(app.getHttpServer())
        .get(`${route}/${entityId}`)
        .send()
        .expect(200);

      expect(response.body).toMatchObject({
        id: expect.any(String),
      });
    });

    it(`${route}/:id (PATCH) - should update an entity on valid input`, async () => {
      const response = await supertest(app.getHttpServer())
        .patch(`${route}/${entityId}`)
        .send(mocks.valid.update)
        .expect(200);

      expect(response.body).toMatchObject(mocks.valid.update);
    });

    it(`${route}/:id (PATCH) - should reject updating an entity on invalid input`, async () => {
      const response = await supertest(app.getHttpServer())
        .patch(`${route}/${entityId}`)
        .send(mocks.invalid);

      expect(response.body).toMatchObject({
        message: expect.any(Array<string>),
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    it(`${route}/:id (DELETE) - should delete an entity`, async () => {
      const response = await supertest(app.getHttpServer())
        .delete(`${route}/${entityId}`)
        .expect(200);

      expect(response.body).toMatchObject(mocks.valid.update);
    });

    afterAll(async () => {
      await app.close();
    });
  });
};
