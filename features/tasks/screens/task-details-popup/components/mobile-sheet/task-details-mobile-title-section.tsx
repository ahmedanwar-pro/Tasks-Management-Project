import type { ReactElement } from 'react';
import {
  TaskDetailsCheckIcon,
  TaskDetailsEpicIcon,
} from '../shared/task-details-icons';
import { getTaskDetailsStatusClassName } from '../../utils';
import type { TaskDetailsPopupDetails } from '../../task-details-popup.types';
import {
  EditableTaskEpic,
  EditableTaskStatus,
  EditableTaskTitle,
  useTaskDetailsEditing,
} from '../editable';

type TaskDetailsMobileTitleSectionProps = {
  details: TaskDetailsPopupDetails;
};

export function TaskDetailsMobileTitleSection({
  details,
}: TaskDetailsMobileTitleSectionProps): ReactElement {
  const {
    clearStaleEpic,
    isFieldPending,
    projectId,
    reportInvalid,
    saveField,
  } = useTaskDetailsEditing();

  return (
    <section className="flex flex-col gap-4">
      <EditableTaskTitle
        className="text-headline-md text-text-primary leading-[30px] font-semibold tracking-normal"
        headingId="task-details-mobile-title"
        isSaving={isFieldPending('title')}
        onInvalid={reportInvalid}
        onSave={(title) => saveField({ title })}
        title={details.title}
      />
      <div className="flex min-w-0 flex-wrap items-start gap-2">
        <EditableTaskStatus
          className={`${getTaskDetailsStatusClassName(details.status ?? details.statusLabel)} text-label-sm rounded-full px-2.5 py-1 font-semibold`}
          isSaving={isFieldPending('status')}
          leadingIcon={<TaskDetailsCheckIcon />}
          onSave={(status) => saveField({ status })}
          status={details.status}
          statusLabel={details.statusLabel}
        />
        <EditableTaskEpic
          className="bg-primary-container-muted text-label-sm text-text-primary rounded-full px-2.5 py-1 font-semibold"
          currentLabel={details.epicLabel}
          epicId={details.epicId}
          isSaving={isFieldPending('epic_id')}
          leadingIcon={
            <TaskDetailsEpicIcon className="h-[11.113px] w-[10.5px] mix-blend-multiply" />
          }
          onSave={(epicId) => saveField({ epic_id: epicId })}
          onStaleEpic={clearStaleEpic}
          projectId={projectId}
        />
      </div>
    </section>
  );
}
