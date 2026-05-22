import { z } from 'zod';

const emailPattern =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required.')
    .refine(
      (value) => !/\s/.test(value) && emailPattern.test(value),
      'Enter a valid email address.',
    ),
  password: z.string().min(1, 'Password is required.'),
  rememberMe: z.boolean(),
});

export type LoginFormValues = z.input<typeof loginSchema>;
