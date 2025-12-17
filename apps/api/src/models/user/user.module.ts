import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './rest/user.controller';
import { UserResolver } from './graphql/user.resolver';
import { GameModule } from '../game/game.module';
import { PlatformModule } from '../platform/platform.module';
import { User } from './graphql/entities/user.entity';
import { Preferences } from './graphql/entities/preferences.entity';

@Module({
  imports: [GameModule, PlatformModule],
  controllers: [UserController],
  providers: [UserService, UserResolver, User, Preferences],
  exports: [UserService, User, Preferences],
})
export class UserModule {}
