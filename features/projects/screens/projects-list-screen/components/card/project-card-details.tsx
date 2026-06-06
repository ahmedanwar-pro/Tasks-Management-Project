import type { ReactElement } from 'react';
import Link from 'next/link';
import type { ProjectCardSectionProps } from '../../types';
import { EditIcon } from '../icons/projects-list-icons';

export function ProjectCardDetails({
  project,
}: ProjectCardSectionProps): ReactElement {
  return (
    <div className="flex flex-col lg:block">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-title-md text-text-primary leading-relaxed font-semibold lg:leading-title lg:font-medium">
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
      <p className="text-body-sm text-text-secondary mt-6 line-clamp-2 leading-[22.75px] lg:mt-3 lg:line-clamp-none">
        {project.description}
      </p>
    </div>
  );
}
