import type { ReactElement } from 'react';

type EpicDetailsTasksCountBadgeProps = {
  taskCount: number;
};

export function EpicDetailsTasksCountBadge({
  taskCount,
}: EpicDetailsTasksCountBadgeProps): ReactElement {
  return (
    <span className="bg-surface-high leading-compact text-text-secondary flex flex-col items-start rounded-lg px-2 py-0.5 text-[10px] font-bold md:hidden">
      {taskCount} TASKS
    </span>
  );
}
