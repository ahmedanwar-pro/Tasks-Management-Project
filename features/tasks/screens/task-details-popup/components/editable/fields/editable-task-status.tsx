'use client';

import type { ReactElement, ReactNode } from 'react';
import {
  taskStatusValues,
  type TaskStatus,
} from '@/features/tasks/screens/add-new-task-screen/add-new-task-form-schema';
import { getTaskStatusLabel } from '@/features/tasks/screens/add-new-task-screen/utils';
import { EditableTaskSelect } from '../select/editable-task-select';

type EditableTaskStatusProps = {
  className?: string;
  isSaving: boolean;
  leadingIcon?: ReactNode;
  onSave: (status: TaskStatus) => Promise<void>;
  status: TaskStatus | null;
  statusLabel: string;
};

export function EditableTaskStatus({
  className,
  isSaving,
  leadingIcon,
  onSave,
  status,
  statusLabel,
}: EditableTaskStatusProps): ReactElement {
  if (!status) {
    return (
      <button
        aria-label={`Task status: ${statusLabel}`}
        className={`${className ?? ''} flex min-w-0 items-center gap-1.5 rounded-sm text-left opacity-70`}
        disabled
        type="button"
      >
        {leadingIcon}
        <span className="truncate">{statusLabel}</span>
      </button>
    );
  }

  return (
    <EditableTaskSelect
      ariaLabel="Task status"
      className={className}
      currentLabel={statusLabel}
      currentValue={status}
      hoverClassName="enabled:hover:brightness-[0.97]"
      isSaving={isSaving}
      leadingIcon={leadingIcon}
      onSave={(value) => onSave(value as TaskStatus)}
      options={taskStatusValues.map((value) => ({
        label: getTaskStatusLabel(value),
        value,
      }))}
    />
  );
}
