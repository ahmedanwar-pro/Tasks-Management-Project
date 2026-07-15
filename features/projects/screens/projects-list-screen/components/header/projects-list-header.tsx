import type { ReactElement, ReactNode } from 'react';
import { ButtonLink } from '@/components/ui';
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
    <header className="relative flex shrink-0 flex-col gap-3 lg:min-h-16 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
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
          <div className="pointer-events-none absolute top-full left-0 z-20 w-full max-w-[calc(100vw-3rem)] -translate-y-2 lg:hidden">
            <div className="pointer-events-auto">{children}</div>
          </div>
        ) : null}
      </div>

      {children ? (
        <div className="pointer-events-none absolute top-[calc(50%-22px)] left-[45%] z-20 hidden w-full max-w-[18rem] -translate-x-1/2 -translate-y-1/2 lg:block xl:hidden">
          <div className="pointer-events-auto">{children}</div>
        </div>
      ) : null}

      {children ? (
        <div className="pointer-events-none absolute top-[calc(50%-8px)] left-1/2 hidden w-full max-w-[18rem] -translate-x-1/2 -translate-y-1/2 xl:block 2xl:max-w-[20rem]">
          <div className="pointer-events-auto">{children}</div>
        </div>
      ) : null}

      <ButtonLink
        className="text-body-md hidden h-10 gap-1.5 px-3 font-medium lg:mt-3 lg:inline-flex lg:self-start"
        href={`/projects/new?page=${currentPage}`}
        iconLeft={<PlusIcon className="size-3" />}
        variant="secondary"
      >
        <span>Create New Project</span>
      </ButtonLink>
    </header>
  );
}
