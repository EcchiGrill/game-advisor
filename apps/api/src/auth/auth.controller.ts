import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AuthService, AuthResponse, RegisterResponse } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ConfirmEmailDto } from './dtos/confirm-email.dto';
import { ResendConfirmationDto } from './dtos/resend-confirmation.dto';
import {
  AuthResponse as AuthResponseEntity,
  RegisterResponse as RegisterResponseEntity,
  MessageResponse,
} from './entities/auth-response.entity';

@ApiTags('Auth')
@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({
    description: 'User registered. Confirmation email sent.',
    type: RegisterResponseEntity,
  })
  @ApiConflictResponse({
    description: 'User with this email already exists',
  })
  async register(@Body() dto: RegisterDto): Promise<RegisterResponse> {
    return await this.authService.register(dto);
  }

  @Post('confirm-email')
  @ApiOkResponse({
    description: 'Email confirmed successfully',
    type: MessageResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid or expired confirmation token',
  })
  async confirmEmail(
    @Body() dto: ConfirmEmailDto
  ): Promise<{ message: string }> {
    return await this.authService.confirmEmail(dto.token);
  }

  @Post('resend-confirmation')
  @ApiOkResponse({
    description:
      'Confirmation email resent (if email exists and is unconfirmed)',
    type: MessageResponse,
  })
  async resendConfirmation(
    @Body() dto: ResendConfirmationDto
  ): Promise<{ message: string }> {
    return await this.authService.resendConfirmation(dto.email);
  }

  @Post('login')
  @ApiOkResponse({
    description: 'User successfully logged in',
    type: AuthResponseEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials or email not confirmed',
  })
  async login(@Body() dto: LoginDto): Promise<AuthResponse> {
    return await this.authService.login(dto);
  }

  @Post('forgot-password')
  @ApiOkResponse({
    description: 'Password reset email sent (if user exists)',
    type: MessageResponse,
  })
  async forgotPassword(
    @Body() dto: ForgotPasswordDto
  ): Promise<{ message: string }> {
    return await this.authService.forgotPassword(dto.email);
  }

  @Post('reset-password')
  @ApiOkResponse({
    description: 'Password successfully reset',
    type: MessageResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid or expired reset token',
  })
  async resetPassword(
    @Body() dto: ResetPasswordDto
  ): Promise<{ message: string }> {
    return await this.authService.resetPassword(dto.token, dto.newPassword);
  }
}
