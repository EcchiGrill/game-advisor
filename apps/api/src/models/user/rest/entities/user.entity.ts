import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Preferences } from './preferences.entity';
import { UserWithPreferences } from 'src/types/user/user';

@ObjectType()
export class User implements UserWithPreferences {
  @ApiProperty({
    description: 'User ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Field(() => ID)
  id: string;

  @ApiProperty({
    description: 'Username',
    example: 'johndoe',
  })
  @Field()
  username: string;

  @ApiProperty({
    description: 'User email',
    example: 'john@example.com',
  })
  @Field()
  email: string;

  @ApiPropertyOptional({
    description: 'User avatar URL',
    example: 'https://example.com/avatar.jpg',
  })
  @Field({ nullable: true })
  avatarUrl?: string;

  @ApiProperty({
    description: 'Whether email is confirmed',
    example: true,
  })
  @Field()
  isEmailConfirmed: boolean;

  @ApiProperty({
    description: 'User preferences',
    type: () => Preferences,
  })
  @Field(() => Preferences)
  preferences: Preferences;

  @ApiProperty({
    description: 'Account creation date',
  })
  @Field()
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date',
  })
  @Field()
  updatedAt: Date;
}
