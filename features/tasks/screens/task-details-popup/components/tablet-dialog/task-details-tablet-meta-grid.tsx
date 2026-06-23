import type { ReactElement } from 'react';
import { TaskDetailsInfoCard } from '../shared/task-details-info-card';
import { TaskDetailsCalendarIcon } from '../shared/task-details-icons';
import type { TaskDetailsPopupMock } from '../../task-details-popup.types';
import { TaskDetailsTabletPersonCard } from './task-details-tablet-person-card';

type TaskDetailsTabletMetaGridProps = {
  details: TaskDetailsPopupMock;
};

export function TaskDetailsTabletMetaGrid({
  details,
}: TaskDetailsTabletMetaGridProps): ReactElement {
  return (
    <section aria-label="Task metadata" className="grid grid-cols-2 gap-4">
      <TaskDetailsTabletPersonCard label="Assignee" person={details.assignee} />
      <TaskDetailsInfoCard
        icon={<TaskDetailsCalendarIcon className="text-text-tertiary" />}
        label="Due Date"
        value={details.dueDate}
        variant="tablet"
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
