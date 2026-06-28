import type { ReactElement } from 'react';

type ProjectTasksListPaginationSummaryProps = {
  totalCount: number;
  visibleCount: number;
};

export function ProjectTasksListPaginationSummary({
  totalCount,
  visibleCount,
}: ProjectTasksListPaginationSummaryProps): ReactElement {
  return (
    <p className="text-text-secondary text-[12px] leading-4 font-medium">
      Showing {visibleCount} of {totalCount} tasks
    </p>
  );
}
