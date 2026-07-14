import Link from 'next/link';
import type { ReactElement } from 'react';
import { PlusIcon } from '../../../shared/icons';

type EpicDetailsTasksMobileAddLinkProps = {
  currentPage: number;
  epicId: string;
  projectId: string;
};

export function EpicDetailsTasksMobileAddLink({
  currentPage,
  epicId,
  projectId,
}: EpicDetailsTasksMobileAddLinkProps): ReactElement {
  return (
    <Link
      className="hover:border-primary/30 hover:text-primary focus-visible:ring-primary/40 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[rgba(195,198,214,0.3)] px-0.5 py-[18px] text-center text-[12px] leading-4 font-bold tracking-[1.2px] text-[rgba(67,70,84,0.6)] uppercase transition-colors focus-visible:ring-2 focus-visible:outline-none lg:hidden"
      href={`/projects/${projectId}/tasks/new?epicId=${epicId}&from=epic-details&page=${currentPage}`}
    >
      <PlusIcon className="size-[15px]" />
      Add New Task
    </Link>
  );
}
