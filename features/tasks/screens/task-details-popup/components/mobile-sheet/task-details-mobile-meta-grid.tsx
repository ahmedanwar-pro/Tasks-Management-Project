import type { ReactElement } from 'react';
import { TaskDetailsInfoCard } from '../shared/task-details-info-card';
import { TaskDetailsCreatedAtIcon } from '../shared/task-details-icons';
import type { TaskDetailsPopupDetails } from '../../task-details-popup.types';
import { TaskDetailsMobileAssigneeCard } from './task-details-mobile-assignee-card';
import { TaskDetailsMobileDueDateCard } from './task-details-mobile-due-date-card';
import { TaskDetailsMobilePersonCard } from './task-details-mobile-person-card';

type TaskDetailsMobileMetaGridProps = {
  details: TaskDetailsPopupDetails;
};

export function TaskDetailsMobileMetaGrid({
  details,
}: TaskDetailsMobileMetaGridProps): ReactElement {
  return (
    <section
      aria-label="Task metadata"
      className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2"
    >
      <TaskDetailsMobileAssigneeCard
        assigneeId={details.assigneeId}
        person={details.assignee}
      />
      <TaskDetailsMobileDueDateCard
        dueDate={details.dueDate}
        dueDateValue={details.dueDateValue}
      />
      <TaskDetailsMobilePersonCard
        label="Created By"
        person={details.reporter}
        tone="muted"
      />
      <TaskDetailsInfoCard
        icon={<TaskDetailsCreatedAtIcon className="text-text-tertiary" />}
        label="Created At"
        value={details.createdAt}
        variant="mobile"
      />
    </section>
  );
}
