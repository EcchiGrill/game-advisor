import { z } from 'zod';

export const signUpSchema = z
  .object({
    username: z.string().min(3),
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpData = z.infer<typeof signUpSchema>;
