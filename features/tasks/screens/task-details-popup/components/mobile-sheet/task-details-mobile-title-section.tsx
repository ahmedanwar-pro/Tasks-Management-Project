import type { ReactElement } from 'react';
import {
  TaskDetailsCheckIcon,
  TaskDetailsEpicIcon,
} from '../shared/task-details-icons';
import {
  getTaskDetailsStatusClassName,
  getTaskDetailsStatusLabel,
} from '../../utils';
import { TaskDetailsChip } from '../shared/task-details-chip';

type TaskDetailsMobileTitleSectionProps = {
  title: string;
  status: string;
  epicLabel: string;
};

export function TaskDetailsMobileTitleSection({
  title,
  status,
  epicLabel,
}: TaskDetailsMobileTitleSectionProps): ReactElement {
  const statusClassName = getTaskDetailsStatusClassName(status);
  const statusLabel = getTaskDetailsStatusLabel(status);

  return (
    <section className="flex flex-col gap-4">
      <h1
        className="text-headline-md text-text-primary leading-[30px] font-semibold tracking-normal"
        id="task-details-mobile-title"
      >
        {title}
      </h1>
      <div className="flex min-w-0 flex-wrap items-start gap-2">
        <TaskDetailsChip
          className={statusClassName}
          icon={<TaskDetailsCheckIcon />}
          label={statusLabel}
          variant="mobile"
        />
        <TaskDetailsChip
          icon={
            <TaskDetailsEpicIcon className="h-[11.113px] w-[10.5px] mix-blend-multiply" />
          }
          label={epicLabel}
          tone="epic"
          variant="mobile"
        />
      </div>
    </section>
  );
}
