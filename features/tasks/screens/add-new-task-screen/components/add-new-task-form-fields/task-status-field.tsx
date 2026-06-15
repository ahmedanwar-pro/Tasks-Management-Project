import type { ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import {
  taskStatusValues,
  type TaskStatus,
} from '../../add-new-task-form-schema';
import { getTaskStatusLabel } from '../../utils';
import { TaskSelectField } from './task-select-field';

type TaskStatusFieldProps = {
  disabled?: boolean;
  error?: string;
  registration: UseFormRegisterReturn;
};

export function TaskStatusField({
  disabled = false,
  error,
  registration,
}: TaskStatusFieldProps): ReactElement {
  return (
    <TaskSelectField
      disabled={disabled}
      error={error}
      label="Status"
      registration={registration}
      required
      selectClassName="text-body-sm lg:text-body-md"
    >
      {taskStatusValues.map((status: TaskStatus) => (
        <option key={status} value={status}>
          {getTaskStatusLabel(status)}
        </option>
      ))}
    </TaskSelectField>
  );
}
