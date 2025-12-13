import OpenAI from 'openai';
import { delay } from '../delay';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateGameGameplay = async (name: string, genres: string[]) => {
  const prompt = `
    You are generating a factual GAMEPLAY description of a video game for use
    in semantic search and vector embeddings.

    RULES:
    - Technical, system-oriented language
    - No story, lore, or narrative focus
    - No marketing or emotional wording
    - No bullet points
    - No emojis
    - 2–4 sentences only
    - Describe how the game is played, not what it feels like

    FOCUS ON:
    - Player perspective (first-person, third-person, isometric, etc.)
    - Core player actions
    - Combat or interaction style (real-time, turn-based, stamina-based, etc.)
    - Progression systems and core gameplay loop

    INPUT:
    Title: ${name}
    Genres: ${genres.join(', ')}
  `;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 150,
    response_format: { type: 'text' },
  });

  const gameplay = completion.choices[0].message.content?.trim();

  await delay(1000);

  return gameplay;
};
