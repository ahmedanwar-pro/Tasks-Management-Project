import type { ReactElement } from 'react';
import { Skeleton } from '@/components/ui';

export function ProjectsLoadingHeader(): ReactElement {
  return (
    <header className="flex shrink-0 items-end justify-between">
      <div className="flex flex-col gap-1 lg:gap-2">
        <h1 className="text-headline-md text-text-primary font-bold lg:text-[30px] lg:leading-9 lg:font-semibold">
          Projects
        </h1>
        <p className="text-body-md text-text-secondary">
          Manage and curate your projects
        </p>
      </div>
      <Skeleton
        animated={false}
        className="bg-surface-muted hidden h-10 w-52.25 bg-none lg:block"
        label="Loading project actions"
        radius="xs"
        variant="block"
      />
    </header>
  );
}
