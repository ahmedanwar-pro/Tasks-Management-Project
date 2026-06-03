import Link from 'next/link';
import type { ReactElement } from 'react';

type ProjectEpicsBreadcrumbProps = {
  projectName?: string | null;
};

export function ProjectEpicsBreadcrumb({
  projectName,
}: ProjectEpicsBreadcrumbProps): ReactElement {
  const breadcrumbProjectName = projectName?.trim() || 'Project';

  return (
    <nav
      aria-label="Breadcrumb"
      className="hidden items-center gap-2 text-[12px] leading-4 font-bold tracking-[1.2px] uppercase lg:flex"
    >
      <Link
        className="text-text-secondary/60 hover:text-primary"
        href="/projects"
      >
        Projects
      </Link>
      <span aria-hidden="true" className="text-text-secondary/60">
        &gt;
      </span>
      <span className="text-text-secondary/60">{breadcrumbProjectName}</span>
      <span aria-hidden="true" className="text-text-secondary/60">
        &gt;
      </span>
      <span aria-current="page" className="text-primary">
        Epics
      </span>
    </nav>
  );
}
