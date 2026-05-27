import type { ReactElement } from 'react';
import { Card, Skeleton } from '@/components/ui';

const loadingCards = Array.from({ length: 6 }, (_, index) => index);

export function ProjectsLoadingState(): ReactElement {
  return (
    <section
      aria-busy="true"
      aria-label="Loading projects"
      aria-live="polite"
      className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pt-9 pb-8 lg:px-8 lg:pt-8"
      role="status"
    >
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

      <div
        aria-hidden="true"
        className="mt-6 flex flex-col gap-6 opacity-40 lg:mt-10 lg:grid lg:grid-cols-3"
      >
        {loadingCards.map((card) => (
          <Card
            className="lg:border-border-subtle! flex h-52.75 flex-col gap-4 p-5 lg:h-62.5 lg:p-6.25 lg:shadow-sm"
            key={card}
            padding="none"
          >
            <Skeleton
              animated={false}
              className="bg-surface-muted hidden h-32 w-full bg-none lg:block"
              fullWidth
              radius="sm"
              variant="block"
            />
            <Skeleton
              animated={false}
              className="bg-surface-muted h-6 w-[60%] bg-none lg:w-3/4"
              radius="xs"
              variant="line"
            />
            <Skeleton
              animated={false}
              className="bg-surface-muted h-4 w-[40%] bg-none lg:w-1/2"
              radius="xs"
              variant="line"
            />
            <Skeleton
              animated={false}
              className="bg-surface-muted mt-auto h-4 w-[32%] bg-none lg:hidden"
              radius="xs"
              variant="line"
            />
          </Card>
        ))}
      </div>
    </section>
  );
}
