import type { ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import type { TaskEpicSelectOption } from '../../utils';
import { TaskSelectField } from './task-select-field';

type TaskEpicFieldProps = {
  disabled?: boolean;
  error?: Error | null;
  epicOptions: TaskEpicSelectOption[];
  hasNoOptions: boolean;
  isLoading?: boolean;
  onRetry?: () => void;
  registration: UseFormRegisterReturn;
};

export function TaskEpicField({
  disabled = false,
  error,
  epicOptions,
  hasNoOptions,
  isLoading = false,
  onRetry,
  registration,
}: TaskEpicFieldProps): ReactElement {
  return (
    <TaskSelectField
      disabled={disabled || isLoading}
      error={error ? 'Could not load project epics.' : undefined}
      isLoading={isLoading}
      label="Epic"
      onFocus={() => {
        if (error) {
          onRetry?.();
        }
      }}
      registration={registration}
      selectClassName="text-body-sm lg:text-body-md"
    >
      <option value="">
        {isLoading
          ? 'Loading epics...'
          : error
            ? 'Could not load epics'
            : hasNoOptions
              ? 'No epics available'
              : 'Select an Epic'}
      </option>
      {epicOptions.map((epic) => (
        <option key={epic.id} value={epic.id}>
          {epic.label}
        </option>
      ))}
    </TaskSelectField>
  );
}
