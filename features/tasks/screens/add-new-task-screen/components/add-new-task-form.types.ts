import type { AddNewTaskFormValues } from '../add-new-task-form-schema';
import type { TaskStatus } from '../add-new-task-form-schema';
import type { TaskAssigneeOption, TaskEpicSelectOption } from '../utils';

export type AddNewTaskFormProps = {
  projectId: string;
  assigneeOptions?: TaskAssigneeOption[];
  assigneeOptionsError?: Error | null;
  epicOptions?: TaskEpicSelectOption[];
  epicOptionsError?: Error | null;
  initialEpicId?: string;
  initialStatus?: TaskStatus;
  isAssigneeOptionsLoading?: boolean;
  isCreating?: boolean;
  isEpicOptionsLoading?: boolean;
  createError?: Error | null;
  createSuccess?: boolean;
  onChange?: () => void;
  onRetryAssigneeOptions?: () => void;
  onRetryEpicOptions?: () => void;
  onSubmit?: (values: AddNewTaskFormValues) => void;
};
