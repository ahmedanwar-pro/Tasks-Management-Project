import { z } from 'zod';
import { emailSchema } from '@/features/auth/utils';

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordFormValues = z.input<typeof forgotPasswordSchema>;
