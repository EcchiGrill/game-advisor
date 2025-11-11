import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Game Advisor')
  .setDescription(`<h2>REST API Game Advisor</h2>`)
  .setVersion('1.0')
  .build();
