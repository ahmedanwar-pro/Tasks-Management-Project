import type { ReactElement } from 'react';
import type { TaskDetailsPopupDetails } from '../../task-details-popup.types';
import { EditableTaskAssignee, useTaskDetailsEditing } from '../editable';

type TaskDetailsTabletAssigneeCardProps = {
  assigneeId: TaskDetailsPopupDetails['assigneeId'];
  person: TaskDetailsPopupDetails['assignee'];
};

export function TaskDetailsTabletAssigneeCard({
  assigneeId,
  person,
}: TaskDetailsTabletAssigneeCardProps): ReactElement {
  const { isFieldPending, projectId, saveField } = useTaskDetailsEditing();

  return (
    <article className="bg-surface-low flex min-h-[92px] flex-col gap-3 rounded-md p-4">
      <p className="text-label-sm leading-compact text-text-muted font-bold uppercase">
        Assignee
      </p>
      <EditableTaskAssignee
        assigneeId={assigneeId}
        className="text-body-sm text-text-primary w-full font-medium"
        isSaving={isFieldPending('assignee_id')}
        onSave={(value) => saveField({ assignee_id: value })}
        person={person}
        projectId={projectId}
        variant="tablet"
      />
    </article>
  );
}
