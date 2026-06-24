import type { ReactElement } from 'react';
import {
  TaskDetailsCheckIcon,
  TaskDetailsEpicIcon,
} from '../shared/task-details-icons';
import { TaskDetailsChip } from '../shared/task-details-chip';
import type { TaskDetailsPopupDetails } from '../../task-details-popup.types';
import {
  getTaskDetailsStatusClassName,
  getTaskDetailsStatusLabel,
} from '../../utils';

type TaskDetailsTabletStatusRowProps = {
  details: TaskDetailsPopupDetails;
};

export function TaskDetailsTabletStatusRow({
  details,
}: TaskDetailsTabletStatusRowProps): ReactElement {
  const statusClassName = getTaskDetailsStatusClassName(details.status);
  const statusLabel = getTaskDetailsStatusLabel(details.status);

  return (
    <section
      aria-label="Task status"
      className="flex flex-wrap items-center gap-3"
    >
      <TaskDetailsChip
        className={statusClassName}
        icon={<TaskDetailsCheckIcon />}
        label={statusLabel}
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
