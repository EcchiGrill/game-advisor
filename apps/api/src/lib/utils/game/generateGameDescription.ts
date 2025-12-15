import OpenAI from 'openai';
import { delay } from '../delay';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateGameDescription = async (
  name: string,
  genres: string[]
) => {
  const prompt = `
    You are generating a factual DESCRIPTION of a video game for use in semantic search and vector embeddings.

      RULES:
      - Neutral, encyclopedic tone
      - No marketing or promotional language
      - No opinions or value judgments
      - No bullet points
      - No emojis
      - 2–4 sentences only
      - Do NOT describe controls or mechanics in detail

      FOCUS ON:
      - What the game is about at a high level
      - Primary genre and subgenre
      - Setting or thematic context
      - Overall player objective

      INPUT:
      Title: ${name}
      Genres: ${genres.join(', ')}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 150,
    response_format: { type: 'text' },
  });

  const description = completion.choices[0].message.content?.trim();

  await delay(1000);

  return description;
};
