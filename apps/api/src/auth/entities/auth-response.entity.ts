import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from '@nestjs/graphql';
import { User as UserGraphql } from '../../models/user/graphql/entities/user.entity';
import { User as UserRest } from '../../models/user/rest/entities/user.entity';

@ObjectType()
export class AuthResponse {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @Field()
  accessToken: string;

  @ApiProperty({
    description: 'User information',
    type: () => UserRest,
  })
  @Field(() => UserGraphql)
  user: UserGraphql;
}

@ObjectType()
export class RegisterResponse {
  @ApiProperty({
    description: 'Success message',
    example:
      'Registration successful. Please check your email to confirm your account.',
  })
  @Field()
  message: string;

  @ApiProperty({
    description: 'Email address the confirmation was sent to',
    example: 'john@example.com',
  })
  @Field()
  email: string;
}

@ObjectType()
export class MessageResponse {
  @ApiProperty({
    description: 'Response message',
    example: 'Operation completed successfully',
  })
  @Field()
  message: string;
}
