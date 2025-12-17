import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from '../user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User as PrismaUser } from '@prisma/client';
import { UpdateUserInput } from './inputs/update-user.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { MessageResponse } from 'src/auth/entities/auth-response.entity';
import { UserWithPreferences } from 'src/types/user/user';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'profile' })
  @UseGuards(JwtAuthGuard)
  async getProfile(
    @CurrentUser() user: PrismaUser
  ): Promise<UserWithPreferences> {
    return await this.userService.getProfile(user.id);
  }

  @Mutation(() => User, { name: 'updateProfile' })
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @CurrentUser() user: PrismaUser,
    @Args('input') input: UpdateUserInput
  ): Promise<UserWithPreferences> {
    return await this.userService.updateUser(user.id, input);
  }

  @Mutation(() => MessageResponse, { name: 'changePassword' })
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @CurrentUser() user: PrismaUser,
    @Args('input') input: ChangePasswordInput
  ): Promise<MessageResponse> {
    return await this.userService.changePassword(user.id, input);
  }

  @Mutation(() => MessageResponse, { name: 'deleteProfile' })
  @UseGuards(JwtAuthGuard)
  async deleteProfile(
    @CurrentUser() user: PrismaUser
  ): Promise<MessageResponse> {
    return await this.userService.deleteProfile(user.id);
  }
}
