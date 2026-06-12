import type { ReactElement } from 'react';
import Link from 'next/link';
import { PlusIcon } from '../../../shared/icons';

type ProjectEpicsFloatingAddButtonProps = {
  projectId: string;
};

export function ProjectEpicsFloatingAddButton({
  projectId,
}: ProjectEpicsFloatingAddButtonProps): ReactElement {
  return (
    <Link
      aria-label="Create new epic"
      className="text-text-inverse focus-visible:outline-primary fixed right-6 bottom-[99px] z-30 flex size-14 items-center justify-center rounded-lg bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-container))] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden"
      href={`/projects/${projectId}/epics/new`}
    >
      <PlusIcon className="size-3.75" />
    </Link>
  );
}
