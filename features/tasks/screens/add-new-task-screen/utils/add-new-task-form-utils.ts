import type {
  AddNewTaskFormValues,
  TaskStatus,
} from '../add-new-task-form-schema';
import type { CreateTaskRequest } from '../api';

export const addNewTaskDefaultStatus: TaskStatus = 'TO_DO';

type AddNewTaskDefaultValuesOptions = {
  initialEpicId?: string;
  initialStatus?: TaskStatus;
};

export function getAddNewTaskDefaultValues({
  initialEpicId,
  initialStatus,
}: AddNewTaskDefaultValuesOptions = {}): AddNewTaskFormValues {
  return {
    assigneeId: '',
    description: '',
    dueDate: '',
    epicId: initialEpicId ?? '',
    status: initialStatus ?? addNewTaskDefaultStatus,
    title: '',
  };
}

export function getTaskStatusLabel(status: TaskStatus): string {
  return status.replaceAll('_', ' ');
}

function getDueDateRequestValue(value: string): string | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

export function mapAddNewTaskFormToRequest(
  values: AddNewTaskFormValues,
  projectId: string,
): CreateTaskRequest {
  const trimmedDescription = values.description.trim();
  const trimmedTitle = values.title.trim();

  return {
    assignee_id: values.assigneeId || null,
    description: trimmedDescription || null,
    due_date: getDueDateRequestValue(values.dueDate),
    epic_id: values.epicId || null,
    project_id: projectId,
    status: values.status,
    title: trimmedTitle,
  };
}
