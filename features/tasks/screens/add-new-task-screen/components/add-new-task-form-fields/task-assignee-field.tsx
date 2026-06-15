import type { ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { projectMembersFetchErrorMessage } from '@/features/epics/screens/shared/utils';
import type { TaskAssigneeOption } from '../../utils';
import { TaskSelectField } from './task-select-field';

type TaskAssigneeFieldProps = {
  assigneeOptions: TaskAssigneeOption[];
  disabled?: boolean;
  error?: Error | null;
  hasNoOptions: boolean;
  isLoading?: boolean;
  onRetry?: () => void;
  registration: UseFormRegisterReturn;
};

export function TaskAssigneeField({
  assigneeOptions,
  disabled = false,
  error,
  hasNoOptions,
  isLoading = false,
  onRetry,
  registration,
}: TaskAssigneeFieldProps): ReactElement {
  return (
    <TaskSelectField
      disabled={disabled || isLoading}
      error={error ? projectMembersFetchErrorMessage : undefined}
      isLoading={isLoading}
      label="Assignee"
      onFocus={() => {
        if (error) {
          onRetry?.();
        }
      }}
      registration={registration}
    >
      <option value="">
        {isLoading
          ? 'Loading members...'
          : error
            ? 'Could not load members'
            : hasNoOptions
              ? 'No members available'
              : 'Select Team Member'}
      </option>
      {assigneeOptions.map((assignee) => (
        <option key={assignee.id} value={assignee.id}>
          {assignee.label}
        </option>
      ))}
    </TaskSelectField>
  );
}
