import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TestEntity } from 'src/models/test/entity/test.entity';

describe('TestController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/test (POST)', () => {
    return request(app.getHttpServer())
      .post('/test')
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('uid');
        expect(res.body).toHaveProperty('value');
      });
  });

  it('/test (GET)', () => {
    return request(app.getHttpServer())
      .get('/test')
      .expect(200)
      .expect((res) => {
        // Check if response is an array
        expect(Array.isArray(res.body)).toBe(true);

        // Check structure of each item in array
        res.body.forEach((item: TestEntity) => {
          expect(item).toMatchObject({
            uid: expect.any(String),
            value: expect.any(Number),
          });
        });
      });
  });
});
