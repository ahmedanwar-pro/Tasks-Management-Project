import type { ReactElement } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui';
import { CalendarIcon, EditIcon } from './projects-list-icons';

type ProjectSummary = {
  id: string;
  title: string;
  description: string;
  created_at?: string;
  createdAt: string;
};

type ProjectCardProps = {
  project: ProjectSummary;
  className?: string;
};

type ProjectCardSectionProps = {
  project: ProjectSummary;
};

function ProjectCardDetails({ project }: ProjectCardSectionProps): ReactElement {
  return (
    <div className="flex flex-col lg:block">
      <div className="flex items-start justify-between gap-3">
        <h2
          className="text-title-md text-text-primary leading-relaxed font-semibold lg:leading-title lg:font-medium"
        >
          {project.title}
        </h2>
        <Link
          aria-label={`Edit ${project.title}`}
          className="text-text-subtle hover:text-text-secondary focus-visible:outline-primary relative z-20 flex h-5 w-4 shrink-0 items-center justify-end focus-visible:outline"
          href={`/projects/${project.id}/edit`}
        >
          <EditIcon />
        </Link>
      </div>
      <p
        className="text-body-sm text-text-secondary mt-6 line-clamp-2 leading-[22.75px] lg:mt-3 lg:line-clamp-none"
      >
        {project.description}
      </p>
    </div>
  );
}

function ProjectCardCreatedAt({ project }: ProjectCardSectionProps): ReactElement {
  return (
    <>
      <div className="border-border-subtle text-text-secondary mt-auto flex items-center gap-1.5 border-t pt-3 lg:hidden">
        <CalendarIcon />
        <time
          className="text-[12px] leading-tight font-medium"
          dateTime={project.created_at}
        >
          {project.createdAt}
        </time>
      </div>
      <div className="border-border-subtle hidden items-center justify-between border-t pt-4 lg:flex">
        <span className="text-text-muted text-[11px] leading-tight font-bold tracking-tight uppercase">
          Created At
        </span>
        <time
          className="text-body-sm text-text-secondary font-medium"
          dateTime={project.created_at}
        >
          {project.createdAt}
        </time>
      </div>
    </>
  );
}

export function ProjectCard({ project, className }: ProjectCardProps): ReactElement {
  return (
    <li className={className}>
      <Card
        className="pt-4-5 relative flex h-52.75 flex-col px-5 pb-5 shadow-sm lg:h-55 lg:justify-between lg:p-6 lg:shadow-none"
        padding="none"
      >
        <Link
          aria-label={`Open epics for ${project.title}`}
          className="focus-visible:outline-primary absolute inset-0 z-10 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2"
          href={`/projects/${project.id}/epics`}
        />
        <ProjectCardDetails project={project} />
        <ProjectCardCreatedAt project={project} />
      </Card>
    </li>
  );
}

export type { ProjectSummary };
