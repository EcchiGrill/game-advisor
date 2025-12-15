import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { PlatformService } from '../platform.service';
import { Platform } from './entities/platform.entity';
import { CreatePlatformInput } from './inputs/create-platform.input';
import { UpdatePlatformInput } from './inputs/update-platform.input';

@Resolver(() => Platform)
export class PlatformResolver {
  constructor(private readonly platformService: PlatformService) {}

  @Query(() => [Platform], { name: 'platforms' })
  async getPlatforms() {
    return this.platformService.getPlatforms();
  }

  @Mutation(() => Platform)
  async createPlatform(@Args('input') input: CreatePlatformInput) {
    return this.platformService.createPlatform(input);
  }

  @Mutation(() => Platform)
  async updatePlatform(
    @Args('id') id: string,
    @Args('input') input: UpdatePlatformInput
  ) {
    return this.platformService.updatePlatform(id, input);
  }

  @Mutation(() => Platform)
  async removePlatform(@Args('id') id: string) {
    return this.platformService.removePlatform(id);
  }
}
