import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class ResendConfirmationDto {
  @ApiProperty({
    description: 'Email address to resend confirmation to',
    example: 'john@example.com',
  })
  @Field()
  @IsEmail()
  email: string;
}
