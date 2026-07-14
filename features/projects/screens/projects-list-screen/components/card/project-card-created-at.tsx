import type { ReactElement } from 'react';
import type { ProjectCardSectionProps } from '../../types';
import { CalendarIcon } from '../icons/projects-list-icons';

export function ProjectCardCreatedAt({
  project,
}: ProjectCardSectionProps): ReactElement {
  return (
    <>
      <div className="border-border-subtle text-text-secondary mt-auto flex items-center gap-1.5 border-t pt-3 md:hidden">
        <CalendarIcon />
        <time
          className="text-[12px] leading-tight font-medium"
          dateTime={project.created_at}
        >
          {project.createdAt}
        </time>
      </div>
      <div className="mt-auto hidden items-center justify-between border-t border-[#dce1ea] pt-4.5 md:flex">
        <span className="text-text-muted text-[11px] leading-4 font-bold tracking-[0.01em] uppercase">
          Created At
        </span>
        <time
          className="text-text-secondary text-[14px] leading-5 font-medium tracking-normal"
          dateTime={project.created_at}
        >
          {project.createdAt}
        </time>
      </div>
    </>
  );
}
