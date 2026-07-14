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
    hasLongTitle ? 52 : 64,
  );
  const desktopDescription = truncateWithEllipsis(
    project.description,
    hasLongTitle ? 76 : 92,
  );

  return (
    <div className="flex flex-col md:min-h-0 md:flex-1 md:pb-2">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-text-primary min-w-0 break-all text-[18px] leading-[1.35] font-medium tracking-normal md:line-clamp-2 md:text-[18px] md:leading-[1.3]">
          {project.title}
        </h2>
        <Link
          aria-label={`Edit ${project.title}`}
          className="text-text-subtle hover:text-text-secondary focus-visible:outline-primary relative z-20 -mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[2px] focus-visible:outline"
          href={`/projects/${project.id}/edit?page=${currentPage}&from=list`}
        >
          <EditIcon className="size-4" />
        </Link>
      </div>
      <p className="text-body-sm text-text-secondary mt-5 min-w-0 break-words leading-[22.75px] md:hidden">
        {mobileDescription}
      </p>
      <p className="text-body-sm text-text-secondary mt-4 hidden min-w-0 break-words leading-[22.75px] md:block">
        {desktopDescription}
      </p>
    </div>
  );
}
