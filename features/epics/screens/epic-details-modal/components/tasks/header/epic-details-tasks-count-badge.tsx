import type { ReactElement } from 'react';
import { Skeleton } from '@/components/ui';

type EpicDetailsTasksCountBadgeProps = {
  isLoading?: boolean;
  taskCount: number;
};

export function EpicDetailsTasksCountBadge({
  isLoading = false,
  taskCount,
}: EpicDetailsTasksCountBadgeProps): ReactElement {
  if (isLoading) {
    return (
      <Skeleton
        className="h-[19px] w-[61px] rounded-lg md:hidden"
        label="Loading task count"
      />
    );
  }

  return (
    <span className="bg-surface-high leading-compact text-text-secondary flex flex-col items-start rounded-lg px-2 py-0.5 text-[10px] font-bold md:hidden">
      {taskCount} TASKS
    </span>
  );
}
