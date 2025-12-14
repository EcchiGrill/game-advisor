import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePlatformDto {
  @ApiProperty({
    example: 'PC',
    description: 'The name of the platform',
  })
  @IsString()
  name: string;
}
