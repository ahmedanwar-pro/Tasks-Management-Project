import type { ReactElement } from 'react';
import { TaskDetailsChevronDownIcon } from '../../shared/task-details-icons';

type TaskDetailsStatusSectionProps = {
  status: string;
};

export function TaskDetailsStatusSection({
  status,
}: TaskDetailsStatusSectionProps): ReactElement {
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
        aria-label={`Task status: ${status}`}
        className="bg-success text-success-text text-label-md focus-visible:outline-primary flex h-[var(--control-height-sm)] w-full items-center justify-between rounded-sm px-4 py-2.5 leading-tight font-bold focus-visible:outline-2 focus-visible:outline-offset-2"
        type="button"
      >
        <span>{status}</span>
        <TaskDetailsChevronDownIcon />
      </button>
    </section>
  );
}
