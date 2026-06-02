import { z } from 'zod';

function getTodayDateInputValue(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const addNewEpicFormSchema = z.object({
  assigneeId: z.string(),
  deadline: z
    .string()
    .refine(
      (value) => !value || value >= getTodayDateInputValue(),
      'Deadline must be today or a future date.',
    ),
  description: z
    .string()
    .refine(
      (value) => Array.from(value).length <= 500,
      'Description must be 500 characters or fewer.',
    ),
  title: z
    .string()
    .trim()
    .min(1, 'Title is required.')
    .refine(
      (value) => Array.from(value).length >= 3,
      'Title must be at least 3 characters.',
    )
    .refine(
      (value) => Array.from(value).length <= 100,
      'Title must be 100 characters or fewer.',
    ),
});

export type AddNewEpicFormValues = z.input<typeof addNewEpicFormSchema>;
