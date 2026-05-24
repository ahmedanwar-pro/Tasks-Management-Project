import { z } from 'zod';
import { createPasswordSchema, emailSchema } from '@/features/auth/utils';

const confirmPasswordRequiredMessage = 'Confirm password is required.';
const jobTitlePattern = /^[\p{L}\p{N}]+(?:[ '.&/-][\p{L}\p{N}]+)*$/u;
const namePattern = /^\p{L}+(?: \p{L}+)*$/u;

export const signUpSchema = z
  .object({
    confirmPassword: z.string().min(1, confirmPasswordRequiredMessage),
    email: emailSchema,
    jobTitle: z
      .string()
      .trim()
      .refine(
        (value) => !value || Array.from(value).length <= 100,
        'Job title must be 100 characters or fewer.',
      )
      .refine(
        (value) => !value || jobTitlePattern.test(value),
        'Use letters, numbers, and common title punctuation only.',
      ),
    name: z
      .string()
      .trim()
      .min(1, 'Name is required.')
      .refine(
        (value) => Array.from(value).length >= 3,
        'Name must be at least 3 characters.',
      )
      .refine(
        (value) => Array.from(value).length <= 50,
        'Name must be 50 characters or fewer.',
      )
      .refine(
        (value) => namePattern.test(value),
        'Use letters only with single spaces between name parts.',
      ),
    password: createPasswordSchema({
      digit: 'Password must include a number.',
      lowercase: 'Password must include a lowercase letter.',
      maximumLength: 'Password must be 64 characters or fewer.',
      minimumLength: 'Password must be at least 8 characters.',
      required: 'Password is required.',
      specialCharacter: 'Password must include a special character.',
      uppercase: 'Password must include an uppercase letter.',
      whitespace: 'Password cannot contain spaces.',
    }),
  })
  .superRefine((values, context) => {
    if (!values.confirmPassword) {
      return;
    }

    if (values.confirmPassword !== values.password) {
      context.addIssue({
        code: 'custom',
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
      });
    }
  });

export type SignUpFormValues = z.input<typeof signUpSchema>;
