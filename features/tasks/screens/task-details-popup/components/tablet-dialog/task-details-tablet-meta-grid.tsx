import type { ReactElement } from 'react';
import { TaskDetailsInfoCard } from '../shared/task-details-info-card';
import { TaskDetailsCalendarIcon } from '../shared/task-details-icons';
import type { TaskDetailsPopupDetails } from '../../task-details-popup.types';
import { TaskDetailsTabletAssigneeCard } from './task-details-tablet-assignee-card';
import { TaskDetailsTabletDueDateCard } from './task-details-tablet-due-date-card';
import { TaskDetailsTabletPersonCard } from './task-details-tablet-person-card';

type TaskDetailsTabletMetaGridProps = {
  details: TaskDetailsPopupDetails;
};

export function TaskDetailsTabletMetaGrid({
  details,
}: TaskDetailsTabletMetaGridProps): ReactElement {
  return (
    <section aria-label="Task metadata" className="grid grid-cols-2 gap-4">
      <TaskDetailsTabletAssigneeCard
        assigneeId={details.assigneeId}
        person={details.assignee}
      />
      <TaskDetailsTabletDueDateCard
        dueDate={details.dueDate}
        dueDateValue={details.dueDateValue}
      />
      <TaskDetailsTabletPersonCard label="Reporter" person={details.reporter} />
      <TaskDetailsInfoCard
        icon={<TaskDetailsCalendarIcon className="text-text-tertiary" />}
        label="Created At"
        value={details.createdAt}
        variant="tablet"
      />
    </section>
  );
}
