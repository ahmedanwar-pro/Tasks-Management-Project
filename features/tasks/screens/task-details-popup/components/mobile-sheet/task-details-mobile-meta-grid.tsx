import type { ReactElement } from 'react';
import { CalendarIcon as EpicDetailsCalendarIcon } from '@/features/epics/screens/epic-details-modal/components/icons/epic-details-modal-icons';
import { TaskDetailsInfoCard } from '../shared/task-details-info-card';
import { TaskDetailsCreatedAtIcon } from '../shared/task-details-icons';
import type { TaskDetailsPopupMock } from '../../task-details-popup.types';
import { TaskDetailsMobilePersonCard } from './task-details-mobile-person-card';

type TaskDetailsMobileMetaGridProps = {
  details: TaskDetailsPopupMock;
};

export function TaskDetailsMobileMetaGrid({
  details,
}: TaskDetailsMobileMetaGridProps): ReactElement {
  return (
    <section
      aria-label="Task metadata"
      className="grid grid-cols-1 gap-3 min-[340px]:grid-cols-2"
    >
      <TaskDetailsMobilePersonCard
        label="Assignee"
        person={details.assignee}
        tone="primary"
      />
      <TaskDetailsInfoCard
        icon={
          <EpicDetailsCalendarIcon className="text-primary !h-[11.667px] !w-[10.5px]" />
        }
        label="Due Date"
        visuallyHideLabel
        value={details.dueDate}
        variant="mobile"
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
