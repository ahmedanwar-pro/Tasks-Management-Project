import { z } from 'zod';
import { createPasswordSchema } from '@/features/auth/utils';

export const resetPasswordSchema = z
  .object({
    confirmPassword: z.string().min(1, 'Confirm password is required.'),
    newPassword: createPasswordSchema({
      digit: 'New password must include a digit.',
      lowercase: 'New password must include a lowercase letter.',
      maximumLength: 'New password must be 64 characters or fewer.',
      minimumLength: 'New password must be at least 8 characters.',
      required: 'New password is required.',
      specialCharacter: 'New password must include a special character.',
      uppercase: 'New password must include an uppercase letter.',
      whitespace: 'New password cannot contain white-space.',
    }),
  })
  .superRefine((values, context) => {
    if (!values.confirmPassword) {
      return;
    }

    if (values.confirmPassword !== values.newPassword) {
      context.addIssue({
        code: 'custom',
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
      });
    }
  });

export type ResetPasswordFormValues = z.input<typeof resetPasswordSchema>;
