import type { ReactElement } from 'react';
import type { TaskDetailsPersonInfo } from '../../../task-details-popup.types';
import { TaskDetailsPerson } from '../task-details-person';

type TaskDetailsPeopleSectionProps = {
  assignee: TaskDetailsPersonInfo;
  reporter: TaskDetailsPersonInfo;
};

export function TaskDetailsPeopleSection({
  assignee,
  reporter,
}: TaskDetailsPeopleSectionProps): ReactElement {
  return (
    <div className="flex flex-col gap-6">
      <TaskDetailsPerson label="Assignee" person={assignee} variant="card" />
      <TaskDetailsPerson label="Reporter" person={reporter} />
    </div>
  );
}
