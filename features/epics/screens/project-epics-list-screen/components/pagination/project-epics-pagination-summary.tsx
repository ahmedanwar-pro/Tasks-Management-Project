import type { ReactElement } from 'react';

type ProjectEpicsPaginationSummaryProps = {
  totalCount: number;
  visibleCount: number;
};

export function ProjectEpicsPaginationSummary({
  totalCount,
  visibleCount,
}: ProjectEpicsPaginationSummaryProps): ReactElement {
  return (
    <p className="text-text-secondary text-[12px] leading-tight font-medium">
      Showing {visibleCount} of {totalCount} epics
    </p>
  );
}
