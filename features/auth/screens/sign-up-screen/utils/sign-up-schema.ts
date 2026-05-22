import { z } from 'zod';

const confirmPasswordRequiredMessage = 'Confirm password is required.';
const emailPattern =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;
const jobTitlePattern = /^[\p{L}\p{N}]+(?:[ '.&/-][\p{L}\p{N}]+)*$/u;
const lowercasePattern = /[a-z]/;
const namePattern = /^\p{L}+(?: \p{L}+)*$/u;
const digitPattern = /\d/;
const specialCharacterPattern = /[!@#$%^&*]/;
const uppercasePattern = /[A-Z]/;
const whitespacePattern = /\s/;

export const signUpSchema = z
  .object({
    confirmPassword: z.string().min(1, confirmPasswordRequiredMessage),
    email: z
      .string()
      .trim()
      .min(1, 'Email is required.')
      .refine(
        (value) => !/\s/.test(value) && emailPattern.test(value),
        'Enter a valid email address.',
      ),
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
    password: z
      .string()
      .min(1, 'Password is required.')
      .min(8, 'Password must be at least 8 characters.')
      .max(64, 'Password must be 64 characters or fewer.')
      .refine(
        (value) => !whitespacePattern.test(value),
        'Password cannot contain spaces.',
      )
      .refine(
        (value) => uppercasePattern.test(value),
        'Password must include an uppercase letter.',
      )
      .refine(
        (value) => lowercasePattern.test(value),
        'Password must include a lowercase letter.',
      )
      .refine(
        (value) => digitPattern.test(value),
        'Password must include a number.',
      )
      .refine(
        (value) => specialCharacterPattern.test(value),
        'Password must include a special character.',
      ),
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
