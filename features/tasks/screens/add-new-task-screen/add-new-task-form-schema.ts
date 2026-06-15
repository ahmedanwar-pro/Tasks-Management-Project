import { z } from 'zod';
import {
  epicDeadlinePastDateMessage,
  isEpicDeadlineTodayOrFuture,
} from '@/features/epics/screens/shared/utils';

export const taskStatusValues = [
  'TO_DO',
  'IN_PROGRESS',
  'BLOCKED',
  'IN_REVIEW',
  'READY_FOR_QA',
  'REOPENED',
  'READY_FOR_PRODUCTION',
  'DONE',
] as const;

export const addNewTaskFormSchema = z.object({
  assigneeId: z.string(),
  description: z.string(),
  dueDate: z
    .string()
    .refine(isEpicDeadlineTodayOrFuture, epicDeadlinePastDateMessage),
  epicId: z.string(),
  status: z.enum(taskStatusValues),
  title: z
    .string()
    .trim()
    .min(1, 'Title is required.')
    .refine(
      (value) => Array.from(value).length <= 100,
      'Title must be 100 characters or fewer.',
    ),
});

export type TaskStatus = (typeof taskStatusValues)[number];
export type AddNewTaskFormValues = z.input<typeof addNewTaskFormSchema>;
