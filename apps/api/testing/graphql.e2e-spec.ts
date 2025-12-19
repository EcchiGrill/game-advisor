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
import { generateJwtToken } from './utils/generateJwtToken';
import { createTestUser } from './utils/createTestUser';
import { createTestGame } from './utils/createTestGame';
import { createTestPlatform } from './utils/createTestPlatform';
import { createTestGenre } from './utils/createTestGenre';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

describe('GraphQL (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  beforeAll(async () => {
    await setupTestDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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

  const graphqlRequest = (query: string, token?: string) => {
    const req = request(app.getHttpServer()).post('/graphql').send({ query });

    if (token) {
      req.set('Authorization', `Bearer ${token}`);
    }

    return req;
  };

  describe('Auth Mutations', () => {
    describe('register', () => {
      it('should register a new user', () => {
        const mutation = `
          mutation {
            register(input: {
              username: "testuser"
              email: "test@example.com"
              password: "password123"
            }) {
              message
              email
            }
          }
        `;

        return graphqlRequest(mutation)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(res.body.data.register).toHaveProperty('message');
            expect(res.body.data.register).toHaveProperty(
              'email',
              'test@example.com'
            );
          });
      });

      it('should return error for duplicate email', async () => {
        await createTestUser(prisma, {
          email: 'existing@example.com',
          username: 'existinguser',
        });

        const mutation = `
          mutation {
            register(input: {
              username: "newuser"
              email: "existing@example.com"
              password: "password123"
            }) {
              message
              email
            }
          }
        `;

        return graphqlRequest(mutation)
          .expect(200)
          .expect((res) => {
            expect(res.body.errors).toBeDefined();
          });
      });
    });

    describe('login', () => {
      it('should login successfully', async () => {
        await createTestUser(prisma, {
          email: 'test@example.com',
          username: 'testuser',
          isEmailConfirmed: true,
        });

        const mutation = `
          mutation {
            login(input: {
              email: "test@example.com"
              password: "password123"
            }) {
              accessToken
              user {
                id
                email
                username
              }
            }
          }
        `;

        return graphqlRequest(mutation)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(res.body.data.login).toHaveProperty('accessToken');
            expect(res.body.data.login.user.email).toBe('test@example.com');
          });
      });

      it('should return error for invalid credentials', async () => {
        await createTestUser(prisma, {
          email: 'test@example.com',
          username: 'testuser',
          isEmailConfirmed: true,
        });

        const mutation = `
          mutation {
            login(input: {
              email: "test@example.com"
              password: "wrongpassword"
            }) {
              accessToken
              user {
                id
              }
            }
          }
        `;

        return graphqlRequest(mutation)
          .expect(200)
          .expect((res) => {
            expect(res.body.errors).toBeDefined();
          });
      });
    });

    describe('confirmEmail', () => {
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

        const mutation = `
          mutation {
            confirmEmail(input: {
              token: "${token}"
            }) {
              message
            }
          }
        `;

        return graphqlRequest(mutation)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(res.body.data.confirmEmail).toHaveProperty('message');
          });
      });
    });

    describe('forgotPassword', () => {
      it('should send password reset email', async () => {
        await createTestUser(prisma, {
          email: 'test@example.com',
          username: 'testuser',
          isEmailConfirmed: true,
        });

        const mutation = `
          mutation {
            forgotPassword(input: {
              email: "test@example.com"
            }) {
              message
            }
          }
        `;

        return graphqlRequest(mutation)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(res.body.data.forgotPassword).toHaveProperty('message');
          });
      });
    });

    describe('resetPassword', () => {
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

        const mutation = `
          mutation {
            resetPassword(input: {
              token: "${token}"
              newPassword: "newpassword123"
            }) {
              message
            }
          }
        `;

        return graphqlRequest(mutation)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(res.body.data.resetPassword).toHaveProperty('message');
          });
      });
    });
  });

  describe('User Mutations', () => {
    let user: User;
    let token: string;

    beforeEach(async () => {
      user = await createTestUser(prisma, {
        email: 'test@example.com',
        username: 'testuser',
        isEmailConfirmed: true,
      });
      token = generateJwtToken(
        jwtService,
        user.id,
        user.email,
        user.tokenVersion
      );
    });

    describe('updateProfile', () => {
      it('should update user profile', () => {
        const mutation = `
          mutation {
            updateProfile(input: {
              username: "newusername"
            }) {
              id
              username
              email
            }
          }
        `;

        return graphqlRequest(mutation, token)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(res.body.data.updateProfile.username).toBe('newusername');
          });
      });
    });

    describe('changePassword', () => {
      it('should change password successfully', () => {
        const mutation = `
          mutation {
            changePassword(input: {
              currentPassword: "password123"
              newPassword: "newpassword123"
            }) {
              message
            }
          }
        `;

        return graphqlRequest(mutation, token)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(res.body.data.changePassword).toHaveProperty('message');
          });
      });
    });

    describe('deleteProfile', () => {
      it('should delete user profile', () => {
        const mutation = `
          mutation {
            deleteProfile {
              message
            }
          }
        `;

        return graphqlRequest(mutation, token)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(res.body.data.deleteProfile).toHaveProperty('message');
          });
      });
    });

    describe('profile Query', () => {
      it('should return user profile', () => {
        const query = `
          query {
            profile {
              id
              email
              username
              preferences {
                platforms
                favoriteGames {
                  id
                  name
                }
              }
            }
          }
        `;

        return graphqlRequest(query, token)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(res.body.data.profile).toHaveProperty('id');
            expect(res.body.data.profile.email).toBe('test@example.com');
          });
      });
    });
  });

  describe('Game Mutations', () => {
    let user: User;
    let token: string;

    beforeEach(async () => {
      user = await createTestUser(prisma, {
        email: 'test@example.com',
        username: 'testuser',
        isEmailConfirmed: true,
      });
      token = generateJwtToken(
        jwtService,
        user.id,
        user.email,
        user.tokenVersion
      );
    });

    describe('createGame', () => {
      it('should create a new game', async () => {
        await createTestGenre(prisma, 'Action');
        await createTestPlatform(prisma, 'PC');

        const mutation = `
          mutation {
            createGame(input: {
              name: "Test Game"
              slug: "test-game"
              description: "A test game"
              playtime: 10
              rating: 4
              metacritic: 85
              coverUrl: "https://example.com/cover.jpg"
              genres: ["Action"]
              platforms: ["PC"]
              releasedAt: "2023-01-01T00:00:00Z"
            }) {
              id
              name
              slug
              genres
              platforms
            }
          }
        `;

        return graphqlRequest(mutation, token)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(res.body.data.createGame).toHaveProperty(
              'name',
              'Test Game'
            );
            expect(res.body.data.createGame).toHaveProperty(
              'slug',
              'test-game'
            );
          });
      });
    });

    describe('updateGame', () => {
      it('should update a game', async () => {
        const game = await createTestGame(prisma);

        const mutation = `
          mutation {
            updateGame(id: "${game.id}", input: {
              name: "Updated Game"
              rating: 5
            }) {
              id
              name
              rating
            }
          }
        `;

        return graphqlRequest(mutation, token)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(res.body.data.updateGame).toHaveProperty(
              'name',
              'Updated Game'
            );
          });
      }, 30000);
    });

    describe('removeGame', () => {
      it('should remove a game', async () => {
        const game = await createTestGame(prisma);

        const mutation = `
          mutation {
            removeGame(id: "${game.id}") {
              id
              name
            }
          }
        `;

        return graphqlRequest(mutation, token)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(res.body.data.removeGame).toHaveProperty('id');
          });
      });
    });

    describe('games Query', () => {
      it('should return list of games', async () => {
        await createTestGame(prisma);

        const query = `
          query {
            games {
              id
              name
              slug
              rating
            }
          }
        `;

        return graphqlRequest(query)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(Array.isArray(res.body.data.games)).toBe(true);
          });
      });
    });

    describe('game Query', () => {
      it('should return a single game by slug', async () => {
        await createTestGame(prisma, {
          name: 'Test Game',
          slug: 'test-game',
          description: 'A test game',
          playtime: 10,
          rating: 4,
          releasedAt: new Date(),
        });

        const query = `
          query {
            game(slug: "test-game") {
              id
              name
              slug
            }
          }
        `;

        return graphqlRequest(query)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(res.body.data.game).toHaveProperty('slug', 'test-game');
          });
      });
    });
  });

  describe('Platform Mutations', () => {
    let user: User;
    let token: string;

    beforeEach(async () => {
      user = await createTestUser(prisma, {
        email: 'test@example.com',
        username: 'testuser',
        isEmailConfirmed: true,
      });
      token = generateJwtToken(
        jwtService,
        user.id,
        user.email,
        user.tokenVersion
      );
    });

    describe('createPlatform', () => {
      it('should create a new platform', () => {
        const mutation = `
          mutation {
            createPlatform(input: {
              name: "PlayStation 5"
            }) {
              id
              name
            }
          }
        `;

        return graphqlRequest(mutation, token)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(res.body.data.createPlatform).toHaveProperty(
              'name',
              'PlayStation 5'
            );
          });
      });
    });

    describe('updatePlatform', () => {
      it('should update a platform', async () => {
        const platform = await createTestPlatform(prisma, 'PC');

        const mutation = `
          mutation {
            updatePlatform(id: "${platform.id}", input: {
              name: "Personal Computer"
            }) {
              id
              name
            }
          }
        `;

        return graphqlRequest(mutation, token)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(res.body.data.updatePlatform).toHaveProperty(
              'name',
              'Personal Computer'
            );
          });
      });
    });

    describe('removePlatform', () => {
      it('should remove a platform', async () => {
        const platform = await createTestPlatform(prisma, 'Xbox');

        const mutation = `
          mutation {
            removePlatform(id: "${platform.id}") {
              id
              name
            }
          }
        `;

        return graphqlRequest(mutation, token)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(res.body.data.removePlatform).toHaveProperty('id');
          });
      });
    });

    describe('platforms Query', () => {
      it('should return list of platforms', async () => {
        await createTestPlatform(prisma, 'PC');
        await createTestPlatform(prisma, 'PlayStation');

        const query = `
          query {
            platforms {
              id
              name
            }
          }
        `;

        return graphqlRequest(query)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(Array.isArray(res.body.data.platforms)).toBe(true);
          });
      });
    });
  });

  describe('Genre Mutations', () => {
    let user: User;
    let token: string;

    beforeEach(async () => {
      user = await createTestUser(prisma, {
        email: 'test@example.com',
        username: 'testuser',
        isEmailConfirmed: true,
      });
      token = generateJwtToken(
        jwtService,
        user.id,
        user.email,
        user.tokenVersion
      );
    });

    describe('createGenre', () => {
      it('should create a new genre', () => {
        const mutation = `
          mutation {
            createGenre(input: {
              name: "RPG"
            }) {
              id
              name
            }
          }
        `;

        return graphqlRequest(mutation, token)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(res.body.data.createGenre).toHaveProperty('name', 'RPG');
          });
      });
    });

    describe('updateGenre', () => {
      it('should update a genre', async () => {
        const genre = await createTestGenre(prisma, 'Action');

        const mutation = `
          mutation {
            updateGenre(id: "${genre.id}", input: {
              name: "Action-Adventure"
            }) {
              id
              name
            }
          }
        `;

        return graphqlRequest(mutation, token)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(res.body.data.updateGenre).toHaveProperty(
              'name',
              'Action-Adventure'
            );
          });
      });
    });

    describe('removeGenre', () => {
      it('should remove a genre', async () => {
        const genre = await createTestGenre(prisma, 'Horror');

        const mutation = `
          mutation {
            removeGenre(id: "${genre.id}") {
              id
              name
            }
          }
        `;

        return graphqlRequest(mutation, token)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(res.body.data.removeGenre).toHaveProperty('id');
          });
      });
    });

    describe('genres Query', () => {
      it('should return list of genres', async () => {
        await createTestGenre(prisma, 'RPG');
        await createTestGenre(prisma, 'Action');

        const query = `
          query {
            genres {
              id
              name
            }
          }
        `;

        return graphqlRequest(query)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(Array.isArray(res.body.data.genres)).toBe(true);
          });
      });
    });
  });

  describe('Feedback Mutations', () => {
    describe('submitFeedback', () => {
      it('should submit feedback', () => {
        const mutation = `
          mutation {
            submitFeedback(input: {
              recipient: "test@example.com"
              content: "This is a test feedback message"
            })
          }
        `;

        return graphqlRequest(mutation)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(res.body.data.submitFeedback).toBeDefined();
          });
      });
    });

    describe('feedbacks Query', () => {
      it('should return list of feedbacks', async () => {
        await prisma.feedback.create({
          data: {
            recipient: 'test@example.com',
            content: 'Test feedback',
          },
        });

        const query = `
          query {
            feedbacks {
              id
              recipient
              content
            }
          }
        `;

        return graphqlRequest(query)
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toBeDefined();
            expect(Array.isArray(res.body.data.feedbacks)).toBe(true);
          });
      });
    });
  });
});
