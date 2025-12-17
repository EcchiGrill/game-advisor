import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './rest/dtos/update-user.dto';
import { ChangePasswordDto } from './rest/dtos/change-password.dto';
import * as bcrypt from 'bcrypt';
import { SELECTED_USER_FIELDS } from 'src/const/selectedUserFields';
import { UserWithPreferences } from 'src/types/user/user';
import { normalizeUser } from 'src/lib/utils/user/normalizeUser';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<UserWithPreferences[]> {
    const users = await this.prisma.user.findMany({
      select: SELECTED_USER_FIELDS,
    });

    return users.map(normalizeUser);
  }

  async getUserById(id: string): Promise<UserWithPreferences> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: SELECTED_USER_FIELDS,
    });

    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }

    return normalizeUser(user);
  }

  async getUserByEmail(email: string): Promise<UserWithPreferences> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: SELECTED_USER_FIELDS,
    });

    if (!user) {
      throw new NotFoundException(`User with email "${email}" not found`);
    }

    return normalizeUser(user);
  }

  async getProfile(userId: string): Promise<UserWithPreferences> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: SELECTED_USER_FIELDS,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return normalizeUser(user);
  }

  async updateUser(
    userId: string,
    dto: UpdateUserDto
  ): Promise<UserWithPreferences> {
    if (dto.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existingUser && existingUser.id !== userId) {
        throw new ConflictException('Email is already in use');
      }
    }

    if (dto.preferences) {
      const {
        platforms,
        favoriteGameIds,
        completedGameIds,
        chosenGameIds,
        bannedGameIds,
      } = dto.preferences;

      await this.prisma.preference.upsert({
        where: { userId },
        create: {
          userId,
          ...(platforms && {
            platforms: {
              connectOrCreate: platforms.map((name) => ({
                where: { name },
                create: { name },
              })),
            },
          }),
          ...(favoriteGameIds && {
            favoriteGames: { connect: favoriteGameIds.map((id) => ({ id })) },
          }),
          ...(completedGameIds && {
            completedGames: { connect: completedGameIds.map((id) => ({ id })) },
          }),
          ...(chosenGameIds && {
            chosenGames: { connect: chosenGameIds.map((id) => ({ id })) },
          }),
          ...(bannedGameIds && {
            bannedGames: { connect: bannedGameIds.map((id) => ({ id })) },
          }),
        },
        update: {
          ...(platforms && {
            platforms: {
              set: [],
              connectOrCreate: platforms.map((name) => ({
                where: { name },
                create: { name },
              })),
            },
          }),
          ...(favoriteGameIds && {
            favoriteGames: {
              set: [],
              connect: favoriteGameIds.map((id) => ({ id })),
            },
          }),
          ...(completedGameIds && {
            completedGames: {
              set: [],
              connect: completedGameIds.map((id) => ({ id })),
            },
          }),
          ...(chosenGameIds && {
            chosenGames: {
              set: [],
              connect: chosenGameIds.map((id) => ({ id })),
            },
          }),
          ...(bannedGameIds && {
            bannedGames: {
              set: [],
              connect: bannedGameIds.map((id) => ({ id })),
            },
          }),
        },
      });
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(dto.username && { username: dto.username }),
        ...(dto.email && { email: dto.email }),
        ...(dto.avatarUrl !== undefined && { avatarUrl: dto.avatarUrl }),
      },
      select: SELECTED_USER_FIELDS,
    });

    return normalizeUser(user);
  }

  async changePassword(
    userId: string,
    dto: ChangePasswordDto
  ): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      dto.currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 12);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        tokenVersion: { increment: 1 },
      },
    });

    return { message: 'Password changed successfully' };
  }

  async deleteProfile(userId: string): Promise<{ message: string }> {
    await this.prisma.user.delete({
      where: { id: userId },
    });

    return { message: 'Profile deleted successfully' };
  }
}
