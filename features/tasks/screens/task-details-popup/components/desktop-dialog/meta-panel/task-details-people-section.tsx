import type { ReactElement } from 'react';
import type { TaskDetailsPersonInfo } from '../../../task-details-popup.types';
import { TaskDetailsPerson } from '../task-details-person';
import { EditableTaskAssignee, useTaskDetailsEditing } from '../../editable';

type TaskDetailsPeopleSectionProps = {
  assignee: TaskDetailsPersonInfo;
  assigneeId: string | null;
  reporter: TaskDetailsPersonInfo;
};

export function TaskDetailsPeopleSection({
  assignee,
  assigneeId,
  reporter,
}: TaskDetailsPeopleSectionProps): ReactElement {
  const { isFieldPending, projectId, saveField } = useTaskDetailsEditing();

  return (
    <div className="flex flex-col gap-6">
      <article className="flex flex-col gap-3">
        <p className="text-label-sm text-text-secondary leading-compact font-bold tracking-[0.5px] uppercase">
          Assignee
        </p>
        <EditableTaskAssignee
          assigneeId={assigneeId}
          className="bg-surface text-body-sm text-text-primary w-full rounded-md p-2 font-semibold shadow-sm"
          isSaving={isFieldPending('assignee_id')}
          onSave={(value) => saveField({ assignee_id: value })}
          person={assignee}
          projectId={projectId}
          variant="desktop"
        />
      </article>
      <TaskDetailsPerson label="Reporter" person={reporter} />
    </div>
  );
}
