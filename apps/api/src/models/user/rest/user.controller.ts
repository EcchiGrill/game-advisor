import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from '../user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { User as UserEntity } from './entities/user.entity';
import { MessageResponse } from 'src/auth/entities/auth-response.entity';
import { UserWithPreferences } from 'src/types/user/user';

@ApiTags('User')
@Controller('user')
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({
    description: 'Get current user profile',
    type: UserEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async getProfile(@CurrentUser() user: User): Promise<UserWithPreferences> {
    return await this.userService.getProfile(user.id);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({
    description: 'Update current user profile',
    type: UserEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async updateProfile(
    @CurrentUser() user: User,
    @Body() dto: UpdateUserDto
  ): Promise<UserWithPreferences> {
    return await this.userService.updateUser(user.id, dto);
  }

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({
    description: 'Password changed successfully',
    type: MessageResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async changePassword(
    @CurrentUser() user: User,
    @Body() dto: ChangePasswordDto
  ): Promise<{ message: string }> {
    return await this.userService.changePassword(user.id, dto);
  }

  @Delete('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({
    description: 'User deleted successfully',
    type: MessageResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async deleteProfile(@CurrentUser() user: User): Promise<{ message: string }> {
    return await this.userService.deleteProfile(user.id);
  }
}
