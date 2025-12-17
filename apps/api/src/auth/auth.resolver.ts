import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  AuthResponse,
  RegisterResponse,
  MessageResponse,
} from './entities/auth-response.entity';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ConfirmEmailDto } from './dtos/confirm-email.dto';
import { ResendConfirmationDto } from './dtos/resend-confirmation.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegisterResponse, { name: 'register' })
  async register(@Args('input') input: RegisterDto): Promise<RegisterResponse> {
    return await this.authService.register(input);
  }

  @Mutation(() => MessageResponse, { name: 'confirmEmail' })
  async confirmEmail(
    @Args('input') input: ConfirmEmailDto
  ): Promise<MessageResponse> {
    return await this.authService.confirmEmail(input.token);
  }

  @Mutation(() => MessageResponse, { name: 'resendConfirmation' })
  async resendConfirmation(
    @Args('input') input: ResendConfirmationDto
  ): Promise<MessageResponse> {
    return await this.authService.resendConfirmation(input.email);
  }

  @Mutation(() => AuthResponse, { name: 'login' })
  async login(@Args('input') input: LoginDto): Promise<AuthResponse> {
    return await this.authService.login(input);
  }

  @Mutation(() => MessageResponse, { name: 'forgotPassword' })
  async forgotPassword(
    @Args('input') input: ForgotPasswordDto
  ): Promise<MessageResponse> {
    return await this.authService.forgotPassword(input.email);
  }

  @Mutation(() => MessageResponse, { name: 'resetPassword' })
  async resetPassword(
    @Args('input') input: ResetPasswordDto
  ): Promise<MessageResponse> {
    return await this.authService.resetPassword(input.token, input.newPassword);
  }
}
