import { z } from 'zod';
import { emailSchema } from '@/features/auth/utils';

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required.'),
  rememberMe: z.boolean(),
});

export type LoginFormValues = z.input<typeof loginSchema>;
