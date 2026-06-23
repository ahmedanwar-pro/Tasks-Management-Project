import type { ReactElement } from 'react';
import {
  TaskDetailsCheckIcon,
  TaskDetailsEpicIcon,
} from '../shared/task-details-icons';
import { TaskDetailsChip } from '../shared/task-details-chip';
import type { TaskDetailsPopupMock } from '../../task-details-popup.types';

type TaskDetailsTabletStatusRowProps = {
  details: TaskDetailsPopupMock;
};

export function TaskDetailsTabletStatusRow({
  details,
}: TaskDetailsTabletStatusRowProps): ReactElement {
  return (
    <section
      aria-label="Task status"
      className="flex flex-wrap items-center gap-3"
    >
      <TaskDetailsChip
        icon={<TaskDetailsCheckIcon />}
        label={details.status}
        variant="tablet"
      />
      <TaskDetailsChip
        icon={<TaskDetailsEpicIcon className="mix-blend-multiply" />}
        label={details.epicLabel}
        tone="epic"
        variant="tablet"
      />
    </section>
  );
}
