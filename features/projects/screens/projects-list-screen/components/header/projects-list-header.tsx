import Link from 'next/link';
import type { ReactElement, ReactNode } from 'react';
import { PlusIcon } from '../icons/projects-list-icons';

type ProjectsListHeaderProps = {
  children?: ReactNode;
  currentPage: number;
};

export function ProjectsListHeader({
  children,
  currentPage,
}: ProjectsListHeaderProps): ReactElement {
  return (
    <header className="relative flex shrink-0 flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
      <div className="flex min-w-0 flex-col gap-1">
        <h1
          className="text-headline-md text-text-primary font-bold lg:text-[30px] lg:leading-9 lg:font-semibold lg:tracking-[-0.75px]"
          id="projects-title"
        >
          Projects
        </h1>
        <p className="text-body-md text-text-secondary">
          Manage and curate your projects
        </p>
        {children ? (
          <div className="w-full max-w-[calc(100vw-3rem)] lg:max-w-[20rem]">
            {children}
          </div>
        ) : null}
      </div>

      <Link
        className="focus-visible:outline-primary text-body-md text-primary-container border-primary-container bg-surface-low hover:bg-surface-muted hidden h-10 items-center gap-1.5 rounded-sm border px-3 font-medium shadow-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 lg:mt-3 lg:inline-flex lg:self-start"
        href={`/projects/new?page=${currentPage}`}
      >
        <PlusIcon className="size-3" />
        <span>Create New Project</span>
      </Link>
    </header>
  );
}
