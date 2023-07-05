import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Login', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('sends login request', () => {
    return request(app.getHttpServer())
      .post('/api/v1/users/login')
      .send({
        "email":"luciano@email.com",
        "password":"123"
      })
      .expect(201)
  });
});