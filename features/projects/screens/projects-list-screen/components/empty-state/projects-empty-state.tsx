import Link from 'next/link';
import type { ReactElement } from 'react';
import { EmptyState } from '@/components/ui';
import { ProjectsEmptyIllustration } from './projects-empty-illustration';
import { PlusIcon } from './projects-empty-state-icons';

export function ProjectsEmptyState(): ReactElement {
  return (
    <EmptyState
      action={
        <Link
          className="text-text-inverse focus-visible:outline-primary text-body-md from-primary to-primary-container hover:from-primary-container hover:to-primary active:from-primary active:to-primary inline-flex h-(--control-height-2xl) shrink-0 items-center justify-center gap-2 rounded-md border border-transparent bg-linear-to-r px-8 font-sans leading-relaxed font-semibold tracking-normal whitespace-nowrap shadow-sm transition-colors duration-150 focus-visible:outline focus-visible:outline-offset-2 md:h-15! md:gap-[11.99px]! md:rounded-sm md:border-0! md:bg-[linear-gradient(167.24619143753972deg,var(--color-primary),var(--color-primary-container))]! md:px-8 md:text-[18px]! md:leading-[28px]! md:font-bold md:shadow-[0px_25px_50px_-12px_rgba(0,61,155,0.3)]!"
          href="/projects/new"
        >
          <PlusIcon />
          <span>Create New Project</span>
        </Link>
      }
      className="[&_h1]:text-headline-md lg:[&_h1]:leading-display [&_p]:text-body-md [&_p]:text-text-secondary lg:[&_p]:text-body-lg min-h-[calc(100dvh-8rem)] gap-6 px-6 py-12 lg:min-h-[calc(100dvh-4rem)] lg:gap-10.75 [&_h1]:font-semibold lg:[&_h1]:text-[36px] lg:[&_h1]:tracking-[-0.9px] [&>div:first-child]:mb-0 [&>div:first-child]:size-48 lg:[&>div:first-child]:size-72 [&>div:nth-child(2)]:gap-4"
      description="You don’t have any projects yet. Start by defining your first architectural workspace to begin tracking tasks and epics."
      icon={<ProjectsEmptyIllustration />}
      size="lg"
      title="No Projects"
      titleAs="h1"
      variant="plain"
    />
  );
}
