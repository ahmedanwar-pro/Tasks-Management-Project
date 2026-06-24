import type { ReactElement } from 'react';
import type { TaskDetailsPopupDetails } from '../../task-details-popup.types';
import {
  TaskDetailsDatesSection,
  TaskDetailsPeopleSection,
  TaskDetailsStatusSection,
} from './meta-panel';

type TaskDetailsMetaPanelProps = {
  details: TaskDetailsPopupDetails;
};

export function TaskDetailsMetaPanel({
  details,
}: TaskDetailsMetaPanelProps): ReactElement {
  return (
    <section
      aria-label="Task attributes"
      className="flex flex-col gap-6 px-8 pt-8"
    >
      <TaskDetailsStatusSection status={details.status} />
      <TaskDetailsPeopleSection
        assignee={details.assignee}
        reporter={details.reporter}
      />
      <TaskDetailsDatesSection
        createdAt={details.createdAt}
        dueDate={details.dueDate}
      />
    </section>
  );
}
