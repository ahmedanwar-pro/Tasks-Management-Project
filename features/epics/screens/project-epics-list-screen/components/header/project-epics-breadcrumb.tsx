import Link from 'next/link';
import type { ReactElement } from 'react';

type ProjectEpicsBreadcrumbProps = {
  projectName: string;
};

export function ProjectEpicsBreadcrumb({
  projectName,
}: ProjectEpicsBreadcrumbProps): ReactElement {
  return (
    <nav
      aria-label="Breadcrumb"
      className="hidden max-w-[min(42vw,420px)] items-center gap-2 overflow-hidden text-[12px] leading-tight font-bold tracking-[1.2px] uppercase lg:flex"
    >
      <Link
        className="text-text-secondary/60 hover:text-primary shrink-0"
        href="/projects"
      >
        Projects
      </Link>
      <span aria-hidden="true" className="text-text-secondary/60 shrink-0">
        &gt;
      </span>
      <span className="text-text-secondary/60 min-w-0 truncate">
        {projectName}
      </span>
      <span aria-hidden="true" className="text-text-secondary/60 shrink-0">
        &gt;
      </span>
      <span aria-current="page" className="text-primary shrink-0">
        Epics
      </span>
    </nav>
  );
}
