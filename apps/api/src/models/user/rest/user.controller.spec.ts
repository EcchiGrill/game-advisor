import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../user.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    getProfile: jest.fn(),
    updateUser: jest.fn(),
    changePassword: jest.fn(),
    deleteProfile: jest.fn(),
  };

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    username: 'testuser',
    password: 'testpassword',
    avatarUrl: 'https://example.com/avatar.jpg',
    isEmailConfirmed: true,
    emailConfirmToken: 'testtoken',
    passwordResetToken: 'testtoken',
    passwordResetExpiry: new Date(),
    tokenVersion: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      const expectedResult = {
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

      mockUserService.getProfile.mockResolvedValue(expectedResult);

      const result = await controller.getProfile(mockUser);

      expect(result).toEqual(expectedResult);
      expect(mockUserService.getProfile).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('updateProfile', () => {
    it('should update user profile', async () => {
      const updateDto = {
        username: 'newusername',
      };

      const expectedResult = {
        id: mockUser.id,
        ...updateDto,
        preferences: {
          platforms: [],
          favoriteGames: [],
          completedGames: [],
          chosenGames: [],
          bannedGames: [],
        },
      };

      mockUserService.updateUser.mockResolvedValue(expectedResult);

      const result = await controller.updateProfile(mockUser, updateDto);

      expect(result).toEqual(expectedResult);
      expect(mockUserService.updateUser).toHaveBeenCalledWith(
        mockUser.id,
        updateDto
      );
    });
  });

  describe('changePassword', () => {
    it('should change password', async () => {
      const changePasswordDto = {
        currentPassword: 'oldpassword',
        newPassword: 'newpassword',
      };

      const expectedResult = {
        message: 'Password changed successfully',
      };

      mockUserService.changePassword.mockResolvedValue(expectedResult);

      const result = await controller.changePassword(
        mockUser,
        changePasswordDto
      );

      expect(result).toEqual(expectedResult);
      expect(mockUserService.changePassword).toHaveBeenCalledWith(
        mockUser.id,
        changePasswordDto
      );
    });
  });

  describe('deleteProfile', () => {
    it('should delete user profile', async () => {
      const expectedResult = {
        message: 'Profile deleted successfully',
      };

      mockUserService.deleteProfile.mockResolvedValue(expectedResult);

      const result = await controller.deleteProfile(mockUser);

      expect(result).toEqual(expectedResult);
      expect(mockUserService.deleteProfile).toHaveBeenCalledWith(mockUser.id);
    });
  });
});
