import Link from 'next/link';
import type { ReactElement } from 'react';

type AddNewEpicPageHeaderProps = {
  projectId: string;
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

export function AddNewEpicPageHeader({
  projectId,
}: AddNewEpicPageHeaderProps): ReactElement {
  return (
    <header className="flex flex-col gap-1.5 lg:gap-2">
      <nav
        aria-label="Breadcrumb"
        className="text-text-muted hidden items-center gap-2 text-[12px] leading-tight font-semibold tracking-[0.3px] uppercase lg:flex"
      >
        <Link className="hover:text-primary transition-colors" href="/projects">
          Projects
        </Link>
        <BreadcrumbSeparator />
        <Link
          className="hover:text-primary transition-colors"
          href={`/projects/${projectId}/edit`}
        >
          Project Alpha
        </Link>
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

      <div className="flex flex-col gap-1.5 lg:mt-5 lg:gap-2">
        <h1
          className="text-text-primary text-headline-md lg:leading-display lg:text-[36px] lg:font-bold lg:tracking-[-0.9px]"
          id="add-new-epic-title"
        >
          Create New Epic
        </h1>
        <p className="text-text-secondary lg:text-body-md max-w-lg text-[14px] leading-[22.75px] lg:leading-relaxed">
          <span className="lg:hidden">
            Define a high-level goal and organizational structure for your
            architectural phase.
          </span>
          <span className="hidden lg:inline">
            Define a major project phase or high-level milestone to group
            related tasks and track architectural progress.
          </span>
        </p>
      </div>
    </header>
  );
}
