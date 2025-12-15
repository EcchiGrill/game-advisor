import { IntersectionType } from '@nestjs/swagger';
import { GameFilterDto } from './filter.dto';
import { GameOrderingDto } from './ordering.dto';

export class GameQueryDto extends IntersectionType(
  GameFilterDto,
  GameOrderingDto
) {}
