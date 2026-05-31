import { z } from 'zod';

export const projectFormSchema = z.object({
  description: z
    .string()
    .refine(
      (value) => Array.from(value).length <= 500,
      'Description must be 500 characters or fewer.',
    ),
  name: z
    .string()
    .trim()
    .min(1, 'Project title is required.')
    .refine(
      (value) => Array.from(value).length >= 3,
      'Project title must be at least 3 characters.',
    )
    .refine(
      (value) => Array.from(value).length <= 100,
      'Project title must be 100 characters or fewer.',
    ),
});

export type ProjectFormValues = z.input<typeof projectFormSchema>;
