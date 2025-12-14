import { Field, ObjectType } from '@nestjs/graphql';
import { IsDate, IsString, IsUUID } from 'class-validator';
import { Platform as PlatformType } from '@prisma/client';

@ObjectType()
export class Platform implements PlatformType {
  @Field()
  @IsUUID()
  @IsString()
  id: string;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsDate()
  createdAt: Date;

  @Field()
  @IsDate()
  updatedAt: Date;
}
