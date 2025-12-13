import OpenAI from 'openai';
import { generateGameGameplay } from './generateGameGameplay';

interface GenerateGameEmbeddingArgs {
  name: string;
  genres: string[];
  description: string;
  platforms: string[];
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateGameEmbedding = async ({
  name,
  genres,
  description,
  platforms,
}: GenerateGameEmbeddingArgs) => {
  const gameplay = await generateGameGameplay(name, genres);

  const text = `
        Title: ${name}
        Genres: ${genres.join(', ')}
        Description: ${description}
        Gameplay: ${gameplay}
        Platforms: ${platforms.join(', ')}
    `;

  const embedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });

  return embedding;
};
