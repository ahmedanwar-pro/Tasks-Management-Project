import { z } from 'zod';
import {
  epicDeadlinePastDateMessage,
  isEpicDeadlineTodayOrFuture,
} from '../shared/utils';

export const addNewEpicFormSchema = z.object({
  assigneeId: z.string(),
  deadline: z
    .string()
    .refine(isEpicDeadlineTodayOrFuture, epicDeadlinePastDateMessage),
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
