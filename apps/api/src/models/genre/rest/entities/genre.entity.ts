import { ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Genre as GenreType } from '@prisma/client';
import { IsDate, IsString, IsUUID } from 'class-validator';

@ObjectType()
export class Genre implements GenreType {
  @ApiProperty({
    example: '4e8b9963-f72d-4887-9678-48c3ff26d60e',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'Action',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '2025-12-14',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    example: '2025-12-14',
  })
  @IsDate()
  updatedAt: Date;
}
