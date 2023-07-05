import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Teste de protecao de rota', () => {
    let app: INestApplication;
  
    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
  
      app = moduleFixture.createNestApplication();
      await app.init();
    });
  
    it('tenta apagar um produto de testes que não eh dono', async () => {
      const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkY2E3MmQxOC1lOTQ3LTRhNTMtOWY1MC00OTNiNTVlMDQzNDkiLCJlbWFpbCI6Imx1Y2FzQGVtYWlsLmNvbSIsImZ1bGxfbmFtZSI6Ikx1Y2FzIiwiaWF0IjoxNjg4NTY3NjcxfQ.mPPo017eZ9N2jzXG1r6zgYsu16aZrzrVJRUbA8gMPVg"
      const productId = "be564a94-5a2b-4ddf-bba9-371c4a715105"
      const ownerId = "949f65bc-f9c9-4252-b0fd-4819569f8447"
      
      return request(app.getHttpServer())
        .delete(`/api/v1/products/${productId}/owner/${ownerId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(401);
    });
  });
  
  