import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export enum AIValue {
  gemini = 'gemini',
  openai = 'openai',
}

export class AdviceBodyDto {
  @ApiProperty({
    example: AIValue.openai,
    description: 'AI to use for advice',
    required: false,
    enum: AIValue,
  })
  @IsOptional()
  @IsIn([AIValue.gemini, AIValue.openai])
  ai?: AIValue;

  @ApiProperty({
    example:
      'I am looking for an action game with a good story and a lot of exploration',
    description: 'The prompt to use for the AI advice',
    required: true,
  })
  @IsString()
  @MinLength(3)
  prompt: string;

  @ApiProperty({
    example: ['game-1', 'game-2', 'game-3'],
    description: 'The games to skip from the advice',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skippedGames?: string[];
}
