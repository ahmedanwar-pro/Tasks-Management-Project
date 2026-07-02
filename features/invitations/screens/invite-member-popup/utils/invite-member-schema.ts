import { z } from 'zod';
import { emailSchema } from '@/features/auth/utils';

export const inviteMemberSchema = z.object({
  email: emailSchema,
});

export type InviteMemberFormValues = z.input<typeof inviteMemberSchema>;
