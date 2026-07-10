import type { ReactElement } from 'react';
import type { TaskDetailsPopupDetails } from '../../task-details-popup.types';
import { EditableTaskAssignee, useTaskDetailsEditing } from '../editable';

type TaskDetailsMobileAssigneeCardProps = {
  assigneeId: TaskDetailsPopupDetails['assigneeId'];
  person: TaskDetailsPopupDetails['assignee'];
};

export function TaskDetailsMobileAssigneeCard({
  assigneeId,
  person,
}: TaskDetailsMobileAssigneeCardProps): ReactElement {
  const { isFieldPending, projectId, saveField } = useTaskDetailsEditing();

  return (
    <article className="bg-surface-low flex h-20 flex-col gap-1 rounded-md p-4">
      <p className="text-text-muted text-[11px] leading-[16.5px] font-bold uppercase">
        Assignee
      </p>
      <EditableTaskAssignee
        assigneeId={assigneeId}
        className="text-body-sm text-text-primary w-full pt-1 font-medium"
        isSaving={isFieldPending('assignee_id')}
        onSave={(value) => saveField({ assignee_id: value })}
        person={person}
        projectId={projectId}
        variant="mobile"
      />
    </article>
  );
}
