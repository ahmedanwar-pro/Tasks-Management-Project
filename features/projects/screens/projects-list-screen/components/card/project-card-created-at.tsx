import type { ReactElement } from 'react';
import { CalendarIcon } from '../icons/projects-list-icons';
import type { ProjectCardSectionProps } from './project-card-types';

export function ProjectCardCreatedAt({
  project,
}: ProjectCardSectionProps): ReactElement {
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
