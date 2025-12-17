import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class ForgotPasswordDto {
  @ApiProperty({
    description: 'User email address',
    example: 'john@example.com',
  })
  @Field()
  @IsEmail()
  email: string;
}
