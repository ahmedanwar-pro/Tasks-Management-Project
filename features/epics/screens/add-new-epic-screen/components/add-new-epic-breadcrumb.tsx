import Link from 'next/link';
import type { ReactElement } from 'react';

type AddNewEpicBreadcrumbProps = {
  projectId: string;
  projectName: string;
};

function BreadcrumbSeparator(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="h-2 w-1 shrink-0"
      fill="none"
      viewBox="0 0 4 8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m1 1 3 3-3 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AddNewEpicBreadcrumb({
  projectId,
  projectName,
}: AddNewEpicBreadcrumbProps): ReactElement {
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-text-muted hidden items-center gap-2 text-[12px] leading-tight font-semibold tracking-[0.3px] uppercase lg:flex"
    >
      <Link className="hover:text-primary transition-colors" href="/projects">
        Projects
      </Link>
      <BreadcrumbSeparator />
      <span>{projectName}</span>
      <BreadcrumbSeparator />
      <Link
        className="hover:text-primary transition-colors"
        href={`/projects/${projectId}/epics`}
      >
        Epics
      </Link>
      <BreadcrumbSeparator />
      <span className="text-text-primary">New Epic</span>
    </nav>
  );
}
