import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResolver } from './graphql/game.resolver';
import { GameController } from './rest/game.controller';
import { Game } from './graphql/entities/game.entity';

@Module({
  controllers: [GameController],
  providers: [GameResolver, GameService, Game],
  exports: [GameService, Game],
})
export class GameModule {}
