import { InputType, PickType } from '@nestjs/graphql';
import { Platform } from '../entities/platform.entity';

@InputType()
export class CreatePlatformInput extends PickType(
  Platform,
  ['name'],
  InputType
) {}
