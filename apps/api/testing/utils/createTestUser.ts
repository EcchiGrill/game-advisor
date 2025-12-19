import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function createTestUser(
  prisma: PrismaClient,
  overrides?: Partial<User>
): Promise<User> {
  const hashedPassword = await bcrypt.hash('password123', 12);
  return prisma.user.create({
    data: {
      username: 'testuser',
      email: 'test@example.com',
      password: hashedPassword,
      isEmailConfirmed: true,
      tokenVersion: 0,
      preferences: {
        create: {},
      },
      ...overrides,
    },
  });
}
