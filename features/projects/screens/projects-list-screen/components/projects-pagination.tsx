import type { ReactElement } from 'react';
import { ChevronIcon } from './projects-list-icons';

const pageButtonClasses =
  'border-border flex size-8 items-center justify-center rounded-xs border text-[12px] leading-tight font-bold';

type ProjectsPaginationProps = {
  projectCount: number;
};

export function ProjectsPagination({
  projectCount,
}: ProjectsPaginationProps): ReactElement {
  const projectLabel = projectCount === 1 ? 'project' : 'projects';

  return (
    <footer className="mt-auto hidden items-center justify-between pt-12 lg:flex">
      <p className="text-text-secondary text-[12px] leading-tight font-medium">
        Showing {projectCount} active {projectLabel}
      </p>
      <nav aria-label="Project pages" className="flex gap-2">
        <button
          aria-label="Previous page"
          className={`${pageButtonClasses} text-text-secondary`}
          type="button"
        >
          <ChevronIcon direction="left" />
        </button>
        <button
          aria-current="page"
          className={`${pageButtonClasses} bg-primary text-text-inverse`}
          type="button"
        >
          1
        </button>
        <button
          className={`${pageButtonClasses} text-text-secondary`}
          type="button"
        >
          2
        </button>
        <button
          aria-label="Next page"
          className={`${pageButtonClasses} text-text-secondary`}
          type="button"
        >
          <ChevronIcon direction="right" />
        </button>
      </nav>
    </footer>
  );
}
