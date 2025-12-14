import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdatePlatformDto {
  @ApiProperty({
    example: 'PC',
    description: 'The name of the platform',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;
}
