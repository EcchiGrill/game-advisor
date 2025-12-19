import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockMailService = {
    sendEmailConfirmation: jest.fn(),
    sendWelcomeEmail: jest.fn(),
    sendPasswordResetEmail: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const registerDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.user.create.mockResolvedValue({
        id: '1',
        ...registerDto,
      });
      mockMailService.sendEmailConfirmation.mockResolvedValue(undefined);

      const result = await service.register(registerDto);

      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('email', registerDto.email);
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: registerDto.email },
      });
      expect(mockPrismaService.user.create).toHaveBeenCalled();
      expect(mockMailService.sendEmailConfirmation).toHaveBeenCalled();
    });

    it('should throw ConflictException if user already exists', async () => {
      const registerDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      mockPrismaService.user.findUnique.mockResolvedValue({
        id: '1',
        email: registerDto.email,
      });

      await expect(service.register(registerDto)).rejects.toThrow(
        ConflictException
      );
      expect(mockPrismaService.user.create).not.toHaveBeenCalled();
    });
  });

  describe('confirmEmail', () => {
    it('should confirm email successfully', async () => {
      const token = 'valid-token';
      const hashedToken = await bcrypt.hash(token, 12);
      const user = {
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
        emailConfirmToken: hashedToken,
        isEmailConfirmed: false,
      };

      mockPrismaService.user.findMany.mockResolvedValue([user]);
      mockPrismaService.user.update.mockResolvedValue({
        ...user,
        isEmailConfirmed: true,
        emailConfirmToken: null,
      });
      mockMailService.sendWelcomeEmail.mockResolvedValue(undefined);

      const result = await service.confirmEmail(token);

      expect(result).toHaveProperty('message');
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: user.id },
        data: {
          isEmailConfirmed: true,
          emailConfirmToken: null,
        },
      });
    });

    it('should throw BadRequestException for invalid token', async () => {
      const token = 'invalid-token';

      mockPrismaService.user.findMany.mockResolvedValue([]);

      await expect(service.confirmEmail(token)).rejects.toThrow(
        BadRequestException
      );
    });
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const hashedPassword = await bcrypt.hash(loginDto.password, 12);
      const user = {
        id: '1',
        email: loginDto.email,
        password: hashedPassword,
        isEmailConfirmed: true,
        tokenVersion: 0,
        username: 'testuser',
        preferences: {
          platforms: [],
          favoriteGames: [],
          completedGames: [],
          chosenGames: [],
          bannedGames: [],
        },
      };

      mockPrismaService.user.findUnique.mockResolvedValue(user);
      mockJwtService.sign.mockReturnValue('jwt-token');

      const result = await service.login(loginDto);

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('user');
      expect(mockJwtService.sign).toHaveBeenCalled();
    });

    it('should throw UnauthorizedException for invalid email', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException
      );
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      const hashedPassword = await bcrypt.hash('password123', 12);
      const user = {
        id: '1',
        email: loginDto.email,
        password: hashedPassword,
        isEmailConfirmed: true,
        tokenVersion: 0,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(user);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException
      );
    });

    it('should throw UnauthorizedException if email not confirmed', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const hashedPassword = await bcrypt.hash(loginDto.password, 12);
      const user = {
        id: '1',
        email: loginDto.email,
        password: hashedPassword,
        isEmailConfirmed: false,
        tokenVersion: 0,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(user);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException
      );
    });
  });

  describe('forgotPassword', () => {
    it('should send password reset email for existing user', async () => {
      const email = 'test@example.com';
      const user = {
        id: '1',
        email,
        isEmailConfirmed: true,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(user);
      mockPrismaService.user.update.mockResolvedValue(user);
      mockMailService.sendPasswordResetEmail.mockResolvedValue(undefined);

      const result = await service.forgotPassword(email);

      expect(result).toHaveProperty('message');
      expect(mockMailService.sendPasswordResetEmail).toHaveBeenCalled();
    });

    it('should return message even if user does not exist', async () => {
      const email = 'nonexistent@example.com';

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      const result = await service.forgotPassword(email);

      expect(result).toHaveProperty('message');
      expect(mockMailService.sendPasswordResetEmail).not.toHaveBeenCalled();
    });
  });

  describe('resetPassword', () => {
    it('should reset password successfully', async () => {
      const token = 'valid-token';
      const newPassword = 'newpassword123';
      const hashedToken = await bcrypt.hash(token, 12);
      const user = {
        id: '1',
        email: 'test@example.com',
        passwordResetToken: hashedToken,
        passwordResetExpiry: new Date(Date.now() + 3600000),
      };

      mockPrismaService.user.findMany.mockResolvedValue([user]);
      mockPrismaService.user.update.mockResolvedValue({
        ...user,
        passwordResetToken: null,
        passwordResetExpiry: null,
      });

      const result = await service.resetPassword(token, newPassword);

      expect(result).toHaveProperty('message');
      expect(mockPrismaService.user.update).toHaveBeenCalled();
    });

    it('should throw BadRequestException for invalid token', async () => {
      const token = 'invalid-token';
      const newPassword = 'newpassword123';

      mockPrismaService.user.findMany.mockResolvedValue([]);

      await expect(service.resetPassword(token, newPassword)).rejects.toThrow(
        BadRequestException
      );
    });
  });

  describe('validateUser', () => {
    it('should return user for valid payload', async () => {
      const payload = {
        sub: '1',
        email: 'test@example.com',
        tokenVersion: 0,
      };

      const user = {
        id: '1',
        email: 'test@example.com',
        isEmailConfirmed: true,
        tokenVersion: 0,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(user);

      const result = await service.validateUser(payload);

      expect(result).toEqual(user);
    });

    it('should return null for non-existent user', async () => {
      const payload = {
        sub: '1',
        email: 'test@example.com',
        tokenVersion: 0,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      const result = await service.validateUser(payload);

      expect(result).toBeNull();
    });
  });
});
