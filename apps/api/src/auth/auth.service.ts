import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { User } from '@prisma/client';
import { UserWithPreferences } from 'src/types/user/user';
import { SELECTED_GAME_FIELDS } from 'src/const/selectedGameFields';
import { normalizeUser } from 'src/lib/utils/user/normalizeUser';

export interface JwtPayload {
  sub: string;
  email: string;
  tokenVersion: number;
}

export interface AuthResponse {
  accessToken: string;
  user: UserWithPreferences;
}

export interface RegisterResponse {
  message: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async register(dto: RegisterDto): Promise<RegisterResponse> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const confirmToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(confirmToken, 12);

    await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hashedPassword,
        emailConfirmToken: hashedToken,
        isEmailConfirmed: false,
        preferences: {
          create: {},
        },
      },
    });

    await this.mailService.sendEmailConfirmation(
      dto.email,
      dto.username,
      confirmToken
    );

    return {
      message:
        'Registration successful. Please check your email to confirm your account.',
      email: dto.email,
    };
  }

  async confirmEmail(token: string): Promise<{ message: string }> {
    const users = await this.prisma.user.findMany({
      where: {
        isEmailConfirmed: false,
        emailConfirmToken: { not: null },
      },
    });

    let matchedUser: User | null = null;
    for (const user of users) {
      if (user.emailConfirmToken) {
        const isTokenValid = await bcrypt.compare(
          token,
          user.emailConfirmToken
        );
        if (isTokenValid) {
          matchedUser = user;
          break;
        }
      }
    }

    if (!matchedUser) {
      throw new BadRequestException('Invalid or expired confirmation token');
    }

    await this.prisma.user.update({
      where: { id: matchedUser.id },
      data: {
        isEmailConfirmed: true,
        emailConfirmToken: null,
      },
    });

    this.mailService
      .sendWelcomeEmail(matchedUser.email, matchedUser.username)
      .catch((err) => {
        console.error('Failed to send welcome email:', err);
      });

    return { message: 'Email confirmed successfully. You can now login.' };
  }

  async resendConfirmation(email: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        message:
          'If the email exists and is unconfirmed, a new confirmation link has been sent.',
      };
    }

    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email is already confirmed');
    }

    const confirmToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(confirmToken, 12);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { emailConfirmToken: hashedToken },
    });

    await this.mailService.sendEmailConfirmation(
      user.email,
      user.username,
      confirmToken
    );

    return {
      message:
        'If the email exists and is unconfirmed, a new confirmation link has been sent.',
    };
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: {
        preferences: {
          include: {
            platforms: true,
            favoriteGames: {
              select: SELECTED_GAME_FIELDS,
            },
            completedGames: {
              select: SELECTED_GAME_FIELDS,
            },
            chosenGames: {
              select: SELECTED_GAME_FIELDS,
            },
            bannedGames: {
              select: SELECTED_GAME_FIELDS,
            },
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isEmailConfirmed) {
      throw new UnauthorizedException(
        'Please confirm your email before logging in. Check your inbox or request a new confirmation email.'
      );
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      tokenVersion: user.tokenVersion,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: normalizeUser(user),
    };
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        message: 'If the email exists, a password reset link has been sent',
      };
    }

    if (!user.isEmailConfirmed) {
      throw new BadRequestException(
        'Please confirm your email first before requesting a password reset'
      );
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(resetToken, 12);
    const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: hashedToken,
        passwordResetExpiry: expiryDate,
      },
    });

    await this.mailService.sendPasswordResetEmail(email, resetToken);

    return {
      message: 'If the email exists, a password reset link has been sent',
    };
  }

  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<{ message: string }> {
    const users = await this.prisma.user.findMany({
      where: {
        passwordResetToken: { not: null },
        passwordResetExpiry: { gt: new Date() },
      },
    });

    let matchedUser: User | null = null;
    for (const user of users) {
      if (user.passwordResetToken) {
        const isTokenValid = await bcrypt.compare(
          token,
          user.passwordResetToken
        );
        if (isTokenValid) {
          matchedUser = user;
          break;
        }
      }
    }

    if (!matchedUser) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await this.prisma.user.update({
      where: { id: matchedUser.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpiry: null,
        tokenVersion: { increment: 1 },
      },
    });

    return { message: 'Password has been reset successfully' };
  }

  async validateUser(payload: JwtPayload): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      return null;
    }

    if (!user.isEmailConfirmed) {
      return null;
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return null;
    }

    return user;
  }
}
