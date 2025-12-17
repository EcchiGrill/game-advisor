import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The recipient email address',
  })
  @IsNotEmpty()
  @IsEmail()
  recipient: string;

  @ApiProperty({
    example: 'This is a feedback message from the user.',
    description: 'The content of the feedback message',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  content: string;
}
