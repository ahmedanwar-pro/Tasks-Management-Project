import Link from 'next/link';
import type { ReactElement } from 'react';

type AddNewTaskBreadcrumbProps = {
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

export function AddNewTaskBreadcrumb({
  projectId,
  projectName,
}: AddNewTaskBreadcrumbProps): ReactElement {
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-text-muted hidden items-center gap-2 text-[11px] leading-[16.5px] font-bold tracking-[0.55px] uppercase lg:flex"
    >
      <Link className="hover:text-primary transition-colors" href="/projects">
        Projects
      </Link>
      <BreadcrumbSeparator />
      <span>{projectName}</span>
      <BreadcrumbSeparator />
      <Link
        className="hover:text-primary transition-colors"
        href={`/projects/${projectId}/tasks`}
      >
        Tasks
      </Link>
      <BreadcrumbSeparator />
      <span className="text-text-primary">New Task</span>
    </nav>
  );
}
