import { Query, Resolver } from '@nestjs/graphql';
import { PlatformService } from '../platform.service';
import { Platform } from './entities/platform.entity';

@Resolver(() => Platform)
export class PlatformResolver {
  constructor(private readonly platformService: PlatformService) {}

  @Query(() => [Platform], { name: 'platforms' })
  async getPlatforms() {
    return this.platformService.getPlatforms();
  }
}
