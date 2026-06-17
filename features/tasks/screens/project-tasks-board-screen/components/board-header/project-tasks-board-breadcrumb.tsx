import Link from 'next/link';
import type { ReactElement } from 'react';
import { BreadcrumbChevronIcon } from '../icons';

type ProjectTasksBoardBreadcrumbProps = {
  projectName: string;
};

export function ProjectTasksBoardBreadcrumb({
  projectName,
}: ProjectTasksBoardBreadcrumbProps): ReactElement {
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-text-muted flex items-center gap-2"
    >
      <Link
        className="hover:text-primary focus-visible:outline-primary flex h-[15px] items-center text-[10px] leading-[15px] font-bold tracking-[1px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        href="/projects"
      >
        PROJECTS
      </Link>
      <BreadcrumbChevronIcon />
      <span className="flex h-[15px] max-w-42 items-center truncate text-[10px] leading-[15px] font-bold tracking-[1px] uppercase">
        {projectName}
      </span>
      <BreadcrumbChevronIcon />
      <span
        aria-current="page"
        className="text-text-primary flex h-[15px] items-center text-[10px] leading-[15px] font-bold tracking-[1px]"
      >
        TASKS
      </span>
    </nav>
  );
}
