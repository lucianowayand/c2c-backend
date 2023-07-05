import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('DB test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Creates user', () => {
    return request(app.getHttpServer())
      .post('/api/v1/users')
      .send({
        "full_name":"Teste",
        "email": "teste@email.com",
        "city":"Joinville",
        "state":"SC",
        "password":"123"
      })
      .expect(201)
      .expect({ message: 'User created successfully' });
  });
});