import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  setupTestDatabase,
  teardownTestDatabase,
  cleanupTestDatabase,
  prisma,
} from './setup';
import { createTestUser } from './utils/createTestUser';
import { generateJwtToken } from './utils/generateJwtToken';
import { JwtService } from '@nestjs/jwt';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  beforeAll(async () => {
    await setupTestDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true })
    );
    await app.init();

    jwtService = moduleFixture.get<JwtService>(JwtService);
  });

  afterAll(async () => {
    await teardownTestDatabase();
    await app.close();
  });

  beforeEach(async () => {
    await cleanupTestDatabase();
  });

  describe('/api/user/profile (GET)', () => {
    it('should return user profile with valid token', async () => {
      const user = await createTestUser(prisma, {
        email: 'test@example.com',
        username: 'testuser',
        isEmailConfirmed: true,
      });

      const token = generateJwtToken(
        jwtService,
        user.id,
        user.email,
        user.tokenVersion
      );

      return request(app.getHttpServer())
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('email', user.email);
          expect(res.body).toHaveProperty('username', user.username);
        });
    });

    it('should return 401 without token', () => {
      return request(app.getHttpServer()).get('/api/user/profile').expect(401);
    });

    it('should return 401 with invalid token', () => {
      return request(app.getHttpServer())
        .get('/api/user/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });

  describe('/api/user/profile (PATCH)', () => {
    it('should update user profile', async () => {
      const user = await createTestUser(prisma, {
        email: 'test@example.com',
        username: 'testuser',
        isEmailConfirmed: true,
      });

      const token = generateJwtToken(
        jwtService,
        user.id,
        user.email,
        user.tokenVersion
      );

      return request(app.getHttpServer())
        .patch('/api/user/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: 'newusername',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('username', 'newusername');
        });
    });

    it('should return 401 without token', () => {
      return request(app.getHttpServer())
        .patch('/api/user/profile')
        .send({
          username: 'newusername',
        })
        .expect(401);
    });
  });

  describe('/api/user/change-password (PATCH)', () => {
    it('should change password successfully', async () => {
      const user = await createTestUser(prisma, {
        email: 'test@example.com',
        username: 'testuser',
        isEmailConfirmed: true,
      });

      const token = generateJwtToken(
        jwtService,
        user.id,
        user.email,
        user.tokenVersion
      );

      return request(app.getHttpServer())
        .patch('/api/user/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: 'password123',
          newPassword: 'newpassword123',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
        });
    });

    it('should return 400 for incorrect current password', async () => {
      const user = await createTestUser(prisma, {
        email: 'test@example.com',
        username: 'testuser',
        isEmailConfirmed: true,
      });

      const token = generateJwtToken(
        jwtService,
        user.id,
        user.email,
        user.tokenVersion
      );

      return request(app.getHttpServer())
        .patch('/api/user/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: 'wrongpassword',
          newPassword: 'newpassword123',
        })
        .expect(400);
    });
  });

  describe('/api/user/profile (DELETE)', () => {
    it('should delete user profile', async () => {
      const user = await createTestUser(prisma, {
        email: 'test@example.com',
        username: 'testuser',
        isEmailConfirmed: true,
      });

      const token = generateJwtToken(
        jwtService,
        user.id,
        user.email,
        user.tokenVersion
      );

      return request(app.getHttpServer())
        .delete('/api/user/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
        });
    });
  });
});
