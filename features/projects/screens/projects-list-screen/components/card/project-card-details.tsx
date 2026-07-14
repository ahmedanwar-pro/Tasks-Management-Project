import type { ReactElement } from 'react';
import Link from 'next/link';
import type { ProjectCardDetailsProps } from '../../types';
import { EditIcon } from '../icons/projects-list-icons';

function truncateWithEllipsis(value: string, maxLength: number): string {
  const normalizedValue = value.trim().replace(/\s+/g, ' ');

  if (normalizedValue.length <= maxLength) {
    return normalizedValue;
  }

  const slicedValue = normalizedValue.slice(0, maxLength);
  const lastSpaceIndex = slicedValue.lastIndexOf(' ');

  if (lastSpaceIndex > Math.floor(maxLength / 2)) {
    return `${slicedValue.slice(0, lastSpaceIndex).trimEnd()}...`;
  }

  return `${slicedValue.trimEnd()}...`;
}

export function ProjectCardDetails({
  currentPage,
  project,
}: ProjectCardDetailsProps): ReactElement {
  const hasLongTitle = project.title.trim().length > 28;
  const mobileDescription = truncateWithEllipsis(
    project.description,
    hasLongTitle ? 72 : 92,
  );
  const desktopDescription = truncateWithEllipsis(
    project.description,
    hasLongTitle ? 120 : 150,
  );

  return (
    <div className="flex flex-col lg:min-h-0 lg:flex-1">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-title-md text-text-primary min-w-0 break-all leading-relaxed font-semibold lg:line-clamp-2 lg:leading-title lg:font-medium">
          {project.title}
        </h2>
        <Link
          aria-label={`Edit ${project.title}`}
          className="text-text-subtle hover:text-text-secondary focus-visible:outline-primary relative z-20 flex h-5 w-4 shrink-0 items-center justify-end focus-visible:outline"
          href={`/projects/${project.id}/edit?page=${currentPage}&from=list`}
        >
          <EditIcon />
        </Link>
      </div>
      <p className="text-body-sm text-text-secondary mt-6 min-w-0 break-words leading-[22.75px] lg:hidden">
        {mobileDescription}
      </p>
      <p className="text-body-sm text-text-secondary mt-3 hidden min-w-0 break-words leading-[22.75px] lg:block">
        {desktopDescription}
      </p>
    </div>
  );
}
