import type { ReactElement } from 'react';
import { TaskDetailsEpicIcon } from '../shared/task-details-icons';
import type { TaskDetailsPopupDetails } from '../../task-details-popup.types';
import {
  EditableTaskEpic,
  EditableTaskTitle,
  useTaskDetailsEditing,
} from '../editable';

type TaskDetailsTitleBlockProps = {
  details: TaskDetailsPopupDetails;
};

export function TaskDetailsTitleBlock({
  details,
}: TaskDetailsTitleBlockProps): ReactElement {
  const {
    clearStaleEpic,
    isFieldPending,
    projectId,
    reportInvalid,
    saveField,
  } = useTaskDetailsEditing();

  return (
    <header className="border-surface-muted flex h-[149px] shrink-0 flex-col gap-2 border-b px-8 py-6">
      <div className="flex items-center gap-3">
        <span className="bg-surface-highest text-primary text-label-md tracking-label rounded-xs px-2 py-0.5 leading-tight font-bold">
          {details.taskKey}
        </span>
        <EditableTaskEpic
          className="text-body-sm text-text-secondary leading-base font-medium"
          currentLabel={details.epicLabel}
          epicId={details.epicId}
          isSaving={isFieldPending('epic_id')}
          leadingIcon={<TaskDetailsEpicIcon />}
          onSave={(epicId) => saveField({ epic_id: epicId })}
          onStaleEpic={clearStaleEpic}
          projectId={projectId}
        />
      </div>
      <EditableTaskTitle
        className="text-text-primary max-w-[512px] text-[30px] leading-9 font-bold tracking-normal"
        headingId="task-details-dialog-title"
        isSaving={isFieldPending('title')}
        onInvalid={reportInvalid}
        onSave={(title) => saveField({ title })}
        title={details.title}
      />
    </header>
  );
}
