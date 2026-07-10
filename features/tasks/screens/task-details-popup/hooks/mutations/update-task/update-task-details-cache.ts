import type {
  TaskDetailsResponse,
  TaskUpdateField,
  UpdateTaskRequest,
} from '../../../api';

export type TaskFieldSnapshot = Partial<TaskDetailsResponse>;

const taskResponseFields: Record<
  TaskUpdateField,
  readonly (keyof TaskDetailsResponse)[]
> = {
  assignee_id: [
    'assignee_id',
    'assignee',
    'assignee_name',
    'assignee_full_name',
    'assignee_display_name',
    'assignee_email',
  ],
  description: ['description'],
  due_date: ['due_date'],
  epic_id: ['epic_id', 'epic', 'epic_key', 'epic_label', 'epic_title'],
  status: ['status'],
  title: ['title'],
};

export function getTaskFieldSnapshot(
  task: TaskDetailsResponse | undefined,
  field: TaskUpdateField,
): TaskFieldSnapshot {
  if (!task) {
    return {};
  }

  return Object.fromEntries(
    taskResponseFields[field].map((key) => [key, task[key]]),
  ) as TaskFieldSnapshot;
}

export function getOptimisticTaskPatch(
  request: UpdateTaskRequest,
  field: TaskUpdateField,
): TaskFieldSnapshot {
  const value = request.updates[field];

  if (field === 'assignee_id') {
    return { assignee_id: value as string | null };
  }

  if (field === 'epic_id') {
    return { epic_id: value as string | null };
  }

  return { [field]: value } as TaskFieldSnapshot;
}

export function patchTaskDetailsCache(
  current: TaskDetailsResponse[] | undefined,
  patch: TaskFieldSnapshot,
): TaskDetailsResponse[] | undefined {
  if (!current?.[0]) {
    return current;
  }

  return [{ ...current[0], ...patch }, ...current.slice(1)];
}
