import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from '../user.service';
import { UserWithPreferences } from 'src/types/user/user';
import { User as PrismaUser } from '@prisma/client';
import { MessageResponse } from 'src/auth/entities/auth-response.entity';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let userService: jest.Mocked<UserService>;

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    username: 'testuser',
    password: 'testpassword',
    avatarUrl: 'https://example.com/avatar.jpg',
    isEmailConfirmed: true,
    tokenVersion: 1,
    createdAt: new Date(),
    passwordResetToken: 'testtoken',
    passwordResetExpiry: new Date(),
    emailConfirmToken: 'testtoken',
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            getProfile: jest.fn(),
            updateUser: jest.fn(),
            changePassword: jest.fn(),
            deleteProfile: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    userService = module.get(UserService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getProfile', () => {
    it('returns user profile', async () => {
      const expected = {
        id: mockUser.id,
        email: mockUser.email,
        username: mockUser.username,
        preferences: {
          platforms: [],
          favoriteGames: [],
          completedGames: [],
          chosenGames: [],
          bannedGames: [],
        },
      };

      userService.getProfile.mockResolvedValue(expected as UserWithPreferences);

      const result = await resolver.getProfile(mockUser as PrismaUser);

      expect(result).toEqual(expected as UserWithPreferences);
      expect(userService.getProfile).toHaveBeenCalledTimes(1);
      expect(userService.getProfile).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('updateProfile', () => {
    it('updates username', async () => {
      const input = { username: 'newusername' };

      const updatedUser = {
        id: mockUser.id,
        username: input.username,
        preferences: {
          platforms: [],
          favoriteGames: [],
          completedGames: [],
          chosenGames: [],
          bannedGames: [],
        },
      };

      userService.updateUser.mockResolvedValue(
        updatedUser as UserWithPreferences
      );

      const result = await resolver.updateProfile(mockUser, input);

      expect(result).toEqual(updatedUser as UserWithPreferences);
      expect(userService.updateUser).toHaveBeenCalledWith(mockUser.id, input);
    });
  });

  describe('changePassword', () => {
    it('changes password successfully', async () => {
      const input = {
        currentPassword: 'oldpassword',
        newPassword: 'newpassword',
      };

      const response = { message: 'Password changed successfully' };

      userService.changePassword.mockResolvedValue(response as MessageResponse);

      const result = await resolver.changePassword(mockUser, input);

      expect(result).toEqual(response);
      expect(userService.changePassword).toHaveBeenCalledWith(
        mockUser.id,
        input
      );
    });
  });

  describe('deleteProfile', () => {
    it('deletes user profile', async () => {
      const response = { message: 'Profile deleted successfully' };

      userService.deleteProfile.mockResolvedValue(response as MessageResponse);

      const result = await resolver.deleteProfile(mockUser);

      expect(result).toEqual(response);
      expect(userService.deleteProfile).toHaveBeenCalledWith(mockUser.id);
    });
  });
});
