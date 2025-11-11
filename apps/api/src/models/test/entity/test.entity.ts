import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';

export class TestEntity {
  @ApiProperty({
    example: '4e8b9963-f72d-4887-9678-48c3ff26d60e',
  })
  @IsUUID()
  uid: string;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  value: number;
}
