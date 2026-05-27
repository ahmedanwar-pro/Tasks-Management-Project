import Link from 'next/link';
import type { ReactElement } from 'react';
import { PlusIcon } from './projects-list-icons';

export function ProjectsListHeader(): ReactElement {
  return (
    <header className="flex shrink-0 items-end justify-between">
      <div className="flex flex-col gap-1">
        <h1
          className="text-headline-md text-text-primary font-bold lg:text-[30px] lg:leading-9 lg:font-semibold lg:tracking-[-0.75px]"
          id="projects-title"
        >
          Projects
        </h1>
        <p className="text-body-md text-text-secondary">
          Manage and curate your projects
        </p>
      </div>

      <Link
        className="focus-visible:outline-primary text-body-md text-text-inverse hidden h-12 items-center gap-2 rounded-xs bg-[linear-gradient(167.38deg,var(--color-primary),var(--color-primary-container))] px-6 font-medium shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 lg:inline-flex"
        href="/projects/new"
      >
        <PlusIcon className="size-3" />
        <span>Create New Project</span>
      </Link>
    </header>
  );
}
