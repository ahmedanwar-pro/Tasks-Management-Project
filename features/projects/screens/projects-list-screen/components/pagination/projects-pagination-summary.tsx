import type { ReactElement } from 'react';

type ProjectsPaginationSummaryProps = {
  projectCount: number;
  totalCount: number;
};

export function ProjectsPaginationSummary({
  projectCount,
  totalCount,
}: ProjectsPaginationSummaryProps): ReactElement {
  return (
    <p className="text-text-secondary text-[12px] leading-tight font-medium">
      Showing {projectCount} of {totalCount} active projects
    </p>
  );
}
