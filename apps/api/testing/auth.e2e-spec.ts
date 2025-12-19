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
import * as bcrypt from 'bcrypt';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

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
  });

  afterAll(async () => {
    await teardownTestDatabase();
    await app.close();
  });

  beforeEach(async () => {
    await cleanupTestDatabase();
  });

  describe('/api/auth/register (POST)', () => {
    it('should register a new user', () => {
      return request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
          expect(res.body).toHaveProperty('email', 'test@example.com');
        });
    });

    it('should return 409 if user already exists', async () => {
      await createTestUser(prisma, {
        email: 'existing@example.com',
        username: 'existinguser',
      });

      return request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          username: 'newuser',
          email: 'existing@example.com',
          password: 'password123',
        })
        .expect(409);
    });

    it('should return 400 for invalid input', () => {
      return request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          username: 'ab',
          email: 'invalid-email',
          password: '123',
        })
        .expect(400);
    });
  });

  describe('/api/auth/login (POST)', () => {
    it('should login successfully with valid credentials', async () => {
      await createTestUser(prisma, {
        email: 'test@example.com',
        username: 'testuser',
        isEmailConfirmed: true,
      });

      return request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body).toHaveProperty('user');
          expect(res.body.user.email).toBe('test@example.com');
        });
    });

    it('should return 401 for invalid credentials', async () => {
      await createTestUser(prisma, {
        email: 'test@example.com',
        username: 'testuser',
        isEmailConfirmed: true,
      });

      return request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        })
        .expect(401);
    });

    it('should return 401 if email not confirmed', async () => {
      await createTestUser(prisma, {
        email: 'test@example.com',
        username: 'testuser',
        isEmailConfirmed: false,
      });

      return request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(401);
    });
  });

  describe('/api/auth/confirm-email (POST)', () => {
    it('should confirm email with valid token', async () => {
      const user = await createTestUser(prisma, {
        email: 'test@example.com',
        username: 'testuser',
        isEmailConfirmed: false,
      });

      const token = 'test-token';
      const hashedToken = await bcrypt.hash(token, 12);

      await prisma.user.update({
        where: { id: user.id },
        data: { emailConfirmToken: hashedToken },
      });

      return request(app.getHttpServer())
        .post('/api/auth/confirm-email')
        .send({
          token,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
        });
    });

    it('should return 400 for invalid token', () => {
      return request(app.getHttpServer())
        .post('/api/auth/confirm-email')
        .send({
          token: 'invalid-token',
        })
        .expect(400);
    });
  });

  describe('/api/auth/forgot-password (POST)', () => {
    it('should send password reset email', async () => {
      await createTestUser(prisma, {
        email: 'test@example.com',
        username: 'testuser',
        isEmailConfirmed: true,
      });

      return request(app.getHttpServer())
        .post('/api/auth/forgot-password')
        .send({
          email: 'test@example.com',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
        });
    });

    it('should return 200 even if user does not exist', () => {
      return request(app.getHttpServer())
        .post('/api/auth/forgot-password')
        .send({
          email: 'nonexistent@example.com',
        })
        .expect(200);
    });
  });

  describe('/api/auth/reset-password (POST)', () => {
    it('should reset password with valid token', async () => {
      const user = await createTestUser(prisma, {
        email: 'test@example.com',
        username: 'testuser',
        isEmailConfirmed: true,
      });

      const token = 'reset-token';
      const hashedToken = await bcrypt.hash(token, 12);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          passwordResetToken: hashedToken,
          passwordResetExpiry: new Date(Date.now() + 3600000),
        },
      });

      return request(app.getHttpServer())
        .post('/api/auth/reset-password')
        .send({
          token,
          newPassword: 'newpassword123',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
        });
    });

    it('should return 400 for invalid token', () => {
      return request(app.getHttpServer())
        .post('/api/auth/reset-password')
        .send({
          token: 'invalid-token',
          newPassword: 'newpassword123',
        })
        .expect(400);
    });
  });
});
