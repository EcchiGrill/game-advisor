import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class ConfirmEmailDto {
  @ApiProperty({
    description: 'Email confirmation token received via email',
    example: 'abc123...',
  })
  @Field()
  @IsString()
  token: string;
}
