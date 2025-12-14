import { ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Platform as PlatformType } from '@prisma/client';
import { IsDate, IsString, IsUUID } from 'class-validator';

@ObjectType()
export class Platform implements PlatformType {
  @ApiProperty({
    example: '4e8b9963-f72d-4887-9678-48c3ff26d60e',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'PC',
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
