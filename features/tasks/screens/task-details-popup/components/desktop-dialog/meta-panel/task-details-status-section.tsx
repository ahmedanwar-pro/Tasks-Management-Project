import type { ReactElement } from 'react';
import { joinClasses } from '@/components/ui/utils';
import { getTaskDetailsStatusClassName } from '../../../utils';
import type { TaskStatus } from '@/features/tasks/screens/add-new-task-screen/add-new-task-form-schema';
import { EditableTaskStatus, useTaskDetailsEditing } from '../../editable';

type TaskDetailsStatusSectionProps = {
  status: TaskStatus | null;
  statusLabel: string;
};

export function TaskDetailsStatusSection({
  status,
  statusLabel,
}: TaskDetailsStatusSectionProps): ReactElement {
  const { isFieldPending, saveField } = useTaskDetailsEditing();
  const statusClassName = getTaskDetailsStatusClassName(status ?? statusLabel);

  return (
    <section
      aria-labelledby="task-details-status"
      className="flex flex-col gap-4"
    >
      <h3
        className="text-label-sm text-text-secondary leading-compact font-bold tracking-[0.5px] uppercase"
        id="task-details-status"
      >
        Status
      </h3>
      <EditableTaskStatus
        className={joinClasses(
          statusClassName,
          'text-label-md focus-visible:outline-primary flex h-[var(--control-height-sm)] w-full items-center justify-between rounded-sm px-4 py-2.5 leading-tight font-bold focus-visible:outline-2 focus-visible:outline-offset-2',
        )}
        isSaving={isFieldPending('status')}
        onSave={(value) => saveField({ status: value })}
        status={status}
        statusLabel={statusLabel}
      />
    </section>
  );
}
