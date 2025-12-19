import { Test, TestingModule } from '@nestjs/testing';
import {
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
  let service: UserService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    preference: {
      upsert: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      const userId = '1';
      const user = {
        id: userId,
        username: 'testuser',
        email: 'test@example.com',
        isEmailConfirmed: true,
        preferences: {
          platforms: [],
          favoriteGames: [],
          completedGames: [],
          chosenGames: [],
          bannedGames: [],
        },
      };

      mockPrismaService.user.findUnique.mockResolvedValue(user);

      const result = await service.getProfile(userId);

      expect(result).toBeDefined();
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        select: expect.any(Object),
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      const userId = '1';

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.getProfile(userId)).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      const userId = '1';
      const updateDto = {
        username: 'newusername',
      };

      const user = {
        id: userId,
        username: 'newusername',
        email: 'test@example.com',
        preferences: {
          platforms: [],
          favoriteGames: [],
          completedGames: [],
          chosenGames: [],
          bannedGames: [],
        },
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.user.update.mockResolvedValue(user);

      const result = await service.updateUser(userId, updateDto);

      expect(result).toBeDefined();
      expect(mockPrismaService.user.update).toHaveBeenCalled();
    });

    it('should throw ConflictException if email already in use', async () => {
      const userId = '1';
      const updateDto = {
        email: 'existing@example.com',
      };

      const existingUser = {
        id: '2',
        email: 'existing@example.com',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(existingUser);

      await expect(service.updateUser(userId, updateDto)).rejects.toThrow(
        ConflictException
      );
    });
  });

  describe('changePassword', () => {
    it('should change password successfully', async () => {
      const userId = '1';
      const changePasswordDto = {
        currentPassword: 'oldpassword',
        newPassword: 'newpassword',
      };

      const hashedPassword = await bcrypt.hash(
        changePasswordDto.currentPassword,
        12
      );
      const user = {
        id: userId,
        password: hashedPassword,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(user);
      mockPrismaService.user.update.mockResolvedValue(user);

      const result = await service.changePassword(userId, changePasswordDto);

      expect(result).toHaveProperty('message');
      expect(mockPrismaService.user.update).toHaveBeenCalled();
    });

    it('should throw NotFoundException if user not found', async () => {
      const userId = '1';
      const changePasswordDto = {
        currentPassword: 'oldpassword',
        newPassword: 'newpassword',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(
        service.changePassword(userId, changePasswordDto)
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException for incorrect current password', async () => {
      const userId = '1';
      const changePasswordDto = {
        currentPassword: 'wrongpassword',
        newPassword: 'newpassword',
      };

      const hashedPassword = await bcrypt.hash('correctpassword', 12);
      const user = {
        id: userId,
        password: hashedPassword,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(user);

      await expect(
        service.changePassword(userId, changePasswordDto)
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteProfile', () => {
    it('should delete user profile successfully', async () => {
      const userId = '1';

      mockPrismaService.user.delete.mockResolvedValue({ id: userId });

      const result = await service.deleteProfile(userId);

      expect(result).toHaveProperty('message');
      expect(mockPrismaService.user.delete).toHaveBeenCalledWith({
        where: { id: userId },
      });
    });
  });
});
