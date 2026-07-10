import type { ReactElement } from 'react';
import { TaskDetailsCloseIcon } from '../shared/task-details-icons';
import type { TaskDetailsPopupDetails } from '../../task-details-popup.types';
import { EditableTaskTitle, useTaskDetailsEditing } from '../editable';

type TaskDetailsTabletHeaderProps = {
  details: TaskDetailsPopupDetails;
  onClose: () => void;
};

export function TaskDetailsTabletHeader({
  details,
  onClose,
}: TaskDetailsTabletHeaderProps): ReactElement {
  const { isFieldPending, reportInvalid, saveField } = useTaskDetailsEditing();
  return (
    <header className="border-surface-muted flex shrink-0 flex-col gap-4 border-b px-8 py-6">
      <div className="flex items-start justify-between gap-6">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <span className="bg-surface-highest text-label-md tracking-label text-primary rounded-xs px-2 py-0.5 leading-tight font-bold">
            {details.taskKey}
          </span>
        </div>
        <button
          aria-label="Close task details"
          className="text-text-secondary focus-visible:outline-primary flex size-[var(--control-height-xs)] shrink-0 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={onClose}
          type="button"
        >
          <TaskDetailsCloseIcon />
        </button>
      </div>
      <EditableTaskTitle
        className="text-headline-md leading-section text-text-primary max-w-[560px] font-semibold"
        headingId="task-details-tablet-title"
        isSaving={isFieldPending('title')}
        onInvalid={reportInvalid}
        onSave={(title) => saveField({ title })}
        title={details.title}
      />
    </header>
  );
}
