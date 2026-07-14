import { getProjectsPageHref } from '../../utils/projects-list-navigation';
import Link from 'next/link';
import type { ReactElement } from 'react';
import { PlusIcon } from '../icons/projects-list-icons';

type AddProjectCardProps = {
  currentPage: number;
};

export function AddProjectCard({
  currentPage,
}: AddProjectCardProps): ReactElement {
  return (
    <div className="hidden lg:block">
      <Link
        aria-label="Add project"
        className="bg-surface hover:bg-surface-low focus-visible:outline-primary flex h-55 items-center justify-center rounded-md border-2 border-dashed border-[#dfe4ee] transition-colors focus-visible:outline focus-visible:outline-offset-2"
        href={`${getProjectsPageHref(currentPage).replace('/projects', '/projects/new')}`}
      >
        <span className="flex flex-col items-center gap-4.5">
          <span className="bg-surface-low text-primary flex size-14 items-center justify-center rounded-xl shadow-[0px_1px_2px_rgba(15,23,42,0.03)]">
            <PlusIcon className="size-5" />
          </span>
          <span className="text-text-secondary text-[13px] leading-4 font-bold tracking-[0.24em] uppercase">
            Add Project
          </span>
        </span>
      </Link>
    </div>
  );
}
