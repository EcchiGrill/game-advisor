import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

describe('AuthResolver', () => {
  let resolver: AuthResolver;

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
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const input = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      const expectedResult = {
        message: 'Registration successful',
        email: input.email,
      };

      mockAuthService.register.mockResolvedValue(expectedResult);

      const result = await resolver.register(input);

      expect(result).toEqual(expectedResult);
      expect(mockAuthService.register).toHaveBeenCalledWith(input);
    });
  });

  describe('login', () => {
    it('should login user', async () => {
      const input = {
        email: 'test@example.com',
        password: 'password123',
      };

      const expectedResult = {
        accessToken: 'jwt-token',
        user: {
          id: '1',
          email: input.email,
        },
      };

      mockAuthService.login.mockResolvedValue(expectedResult);

      const result = await resolver.login(input);

      expect(result).toEqual(expectedResult);
      expect(mockAuthService.login).toHaveBeenCalledWith(input);
    });
  });

  describe('confirmEmail', () => {
    it('should confirm email', async () => {
      const input = {
        token: 'valid-token',
      };

      const expectedResult = {
        message: 'Email confirmed successfully',
      };

      mockAuthService.confirmEmail.mockResolvedValue(expectedResult);

      const result = await resolver.confirmEmail(input);

      expect(result).toEqual(expectedResult);
      expect(mockAuthService.confirmEmail).toHaveBeenCalledWith(input.token);
    });
  });
});
