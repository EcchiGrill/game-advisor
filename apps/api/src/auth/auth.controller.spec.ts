import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    register: jest.fn(),
    confirmEmail: jest.fn(),
    resendConfirmation: jest.fn(),
    login: jest.fn(),
    forgotPassword: jest.fn(),
    resetPassword: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      const expectedResult = {
        message: 'Registration successful',
        email: registerDto.email,
      };

      mockAuthService.register.mockResolvedValue(expectedResult);

      const result = await controller.register(registerDto);

      expect(result).toEqual(expectedResult);
      expect(mockAuthService.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('confirmEmail', () => {
    it('should confirm email', async () => {
      const confirmEmailDto = {
        token: 'valid-token',
      };

      const expectedResult = {
        message: 'Email confirmed successfully',
      };

      mockAuthService.confirmEmail.mockResolvedValue(expectedResult);

      const result = await controller.confirmEmail(confirmEmailDto);

      expect(result).toEqual(expectedResult);
      expect(mockAuthService.confirmEmail).toHaveBeenCalledWith(
        confirmEmailDto.token
      );
    });
  });

  describe('login', () => {
    it('should login user', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const expectedResult = {
        accessToken: 'jwt-token',
        user: {
          id: '1',
          email: loginDto.email,
          username: 'testuser',
        },
      };

      mockAuthService.login.mockResolvedValue(expectedResult);

      const result = await controller.login(loginDto);

      expect(result).toEqual(expectedResult);
      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('forgotPassword', () => {
    it('should send password reset email', async () => {
      const forgotPasswordDto = {
        email: 'test@example.com',
      };

      const expectedResult = {
        message: 'Password reset email sent',
      };

      mockAuthService.forgotPassword.mockResolvedValue(expectedResult);

      const result = await controller.forgotPassword(forgotPasswordDto);

      expect(result).toEqual(expectedResult);
      expect(mockAuthService.forgotPassword).toHaveBeenCalledWith(
        forgotPasswordDto.email
      );
    });
  });

  describe('resetPassword', () => {
    it('should reset password', async () => {
      const resetPasswordDto = {
        token: 'valid-token',
        newPassword: 'newpassword123',
      };

      const expectedResult = {
        message: 'Password reset successfully',
      };

      mockAuthService.resetPassword.mockResolvedValue(expectedResult);

      const result = await controller.resetPassword(resetPasswordDto);

      expect(result).toEqual(expectedResult);
      expect(mockAuthService.resetPassword).toHaveBeenCalledWith(
        resetPasswordDto.token,
        resetPasswordDto.newPassword
      );
    });
  });
});
