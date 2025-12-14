import { Module } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { PlatformController } from './rest/platform.controller';
import { PlatformResolver } from './graphql/platform.resolver';

@Module({
  controllers: [PlatformController],
  providers: [PlatformResolver, PlatformService],
})
export class PlatformModule {}
