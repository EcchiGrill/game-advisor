import { Game } from '../rest/entities/game.entity';

export type GameResponse = Omit<Game, 'embedding'>;
