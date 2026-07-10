import type { ReactElement } from 'react';
import {
  TaskDetailsCheckIcon,
  TaskDetailsEpicIcon,
} from '../shared/task-details-icons';
import type { TaskDetailsPopupDetails } from '../../task-details-popup.types';
import { getTaskDetailsStatusClassName } from '../../utils';
import {
  EditableTaskEpic,
  EditableTaskStatus,
  useTaskDetailsEditing,
} from '../editable';

type TaskDetailsTabletStatusRowProps = {
  details: TaskDetailsPopupDetails;
};

export function TaskDetailsTabletStatusRow({
  details,
}: TaskDetailsTabletStatusRowProps): ReactElement {
  const { clearStaleEpic, isFieldPending, projectId, saveField } =
    useTaskDetailsEditing();
  const statusClassName = getTaskDetailsStatusClassName(
    details.status ?? details.statusLabel,
  );

  return (
    <section
      aria-label="Task status"
      className="flex flex-wrap items-center gap-3"
    >
      <EditableTaskStatus
        className={`${statusClassName} text-label-md px-3 py-1.5 font-semibold`}
        isSaving={isFieldPending('status')}
        leadingIcon={<TaskDetailsCheckIcon />}
        onSave={(status) => saveField({ status })}
        status={details.status}
        statusLabel={details.statusLabel}
      />
      <EditableTaskEpic
        className="bg-primary-container-muted text-label-md text-text-primary rounded-full px-3 py-1.5 font-semibold"
        currentLabel={details.epicLabel}
        epicId={details.epicId}
        isSaving={isFieldPending('epic_id')}
        leadingIcon={<TaskDetailsEpicIcon className="mix-blend-multiply" />}
        onSave={(epicId) => saveField({ epic_id: epicId })}
        onStaleEpic={clearStaleEpic}
        projectId={projectId}
      />
    </section>
  );
}
