import { z } from 'zod';
import { AiValue } from 'game-advisor_network';

export const aiAdvisorSchema = z.object({
  prompt: z
    .string()
    .min(3, { message: 'Prompt must be at least 3 characters' })
    .max(1000, { message: 'Prompt must be less than 1000 characters' }),
  model: z.enum(AiValue),
});

export type AiAdvisorData = z.infer<typeof aiAdvisorSchema>;
