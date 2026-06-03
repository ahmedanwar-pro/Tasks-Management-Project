import Link from 'next/link';
import type { ReactElement } from 'react';
import { PlusIcon } from '../icons/project-epics-icons';

type ProjectEpicsDesktopNewButtonProps = {
  projectId: string;
};

export function ProjectEpicsDesktopNewButton({
  projectId,
}: ProjectEpicsDesktopNewButtonProps): ReactElement {
  return (
    <Link
      className="focus-visible:outline-primary text-body-md text-text-inverse hidden h-12 min-w-[140px] items-center justify-center gap-2 rounded-sm bg-[linear-gradient(135.78715050139328deg,var(--color-primary),var(--color-primary-container))] px-6 font-bold leading-relaxed shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 lg:inline-flex"
      href={`/projects/${projectId}/epics/new`}
    >
      <PlusIcon className="size-[10.5px]" />
      <span>New Epic</span>
    </Link>
  );
}
