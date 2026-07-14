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
    <p className="text-text-secondary text-[12px] leading-4 font-medium tracking-normal">
      Showing {projectCount} of {totalCount} active projects
    </p>
  );
}
