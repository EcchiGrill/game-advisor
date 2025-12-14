import { Game } from '../models/game/rest/entities/game.entity';

export type GameResponse = Omit<Game, 'embedding'>;
