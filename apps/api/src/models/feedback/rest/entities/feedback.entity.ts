import { ApiProperty } from '@nestjs/swagger';
import { Feedback as FeedbackType } from '@prisma/client';
import { IsDate, IsString, IsUUID } from 'class-validator';

export class Feedback implements FeedbackType {
  @ApiProperty({
    example: '4e8b9963-f72d-4887-9678-48c3ff26d60e',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The recipient email address',
  })
  @IsString()
  recipient: string;

  @ApiProperty({
    example: 'This is a feedback message from the user.',
    description: 'The content of the feedback',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: '2025-12-14T10:30:00.000Z',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    example: '2025-12-14T10:30:00.000Z',
  })
  @IsDate()
  updatedAt: Date;
}
