import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.email(),
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
