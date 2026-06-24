import type { ReactElement } from 'react';
import { joinClasses } from '@/components/ui/utils';
import {
  getTaskDetailsStatusClassName,
  getTaskDetailsStatusLabel,
} from '../../../utils';
import { TaskDetailsChevronDownIcon } from '../../shared/task-details-icons';

type TaskDetailsStatusSectionProps = {
  status: string;
};

export function TaskDetailsStatusSection({
  status,
}: TaskDetailsStatusSectionProps): ReactElement {
  const statusClassName = getTaskDetailsStatusClassName(status);
  const statusLabel = getTaskDetailsStatusLabel(status);

  return (
    <section
      aria-labelledby="task-details-status"
      className="flex flex-col gap-4"
    >
      <h3
        className="text-label-sm text-text-secondary leading-compact font-bold tracking-[0.5px] uppercase"
        id="task-details-status"
      >
        Status
      </h3>
      <button
        aria-label={`Task status: ${statusLabel}`}
        className={joinClasses(
          statusClassName,
          'text-label-md focus-visible:outline-primary flex h-[var(--control-height-sm)] w-full items-center justify-between rounded-sm px-4 py-2.5 leading-tight font-bold focus-visible:outline-2 focus-visible:outline-offset-2',
        )}
        type="button"
      >
        <span>{statusLabel}</span>
        <TaskDetailsChevronDownIcon />
      </button>
    </section>
  );
}
