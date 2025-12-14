import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { Platform } from '../entities/platform.entity';

@InputType()
export class UpdatePlatformInput extends PartialType(
  PickType(Platform, ['name'], InputType)
) {}
