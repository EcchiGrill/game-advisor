import { ApiPropertyOptional } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdatePreferenceDto } from './update-preference.dto';

@InputType()
export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'New username',
    example: 'johndoe_updated',
    minLength: 3,
    maxLength: 30,
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username?: string;

  @ApiPropertyOptional({
    description: 'New email address',
    example: 'newemail@example.com',
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'New avatar URL',
    example: 'https://example.com/new-avatar.jpg',
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @ApiPropertyOptional({
    description: 'User preferences (platforms, favorite games, etc.)',
    type: () => UpdatePreferenceDto,
  })
  @Field(() => UpdatePreferenceDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdatePreferenceDto)
  preferences?: UpdatePreferenceDto;
}
