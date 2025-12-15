import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResolver } from './graphql/game.resolver';
import { GameController } from './rest/game.controller';

@Module({
  controllers: [GameController],
  providers: [GameResolver, GameService],
})
export class GameModule {}
