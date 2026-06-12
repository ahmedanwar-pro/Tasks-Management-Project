import type { ReactElement } from 'react';
import Link from 'next/link';
import { BoltIcon } from './empty-state-icons';

type EmptyStateActionProps = {
  projectId: string;
};

export function EmptyStateAction({
  projectId,
}: EmptyStateActionProps): ReactElement {
  return (
    <Link
      className="text-text-inverse focus-visible:outline-primary flex h-14 items-center justify-center gap-3 rounded-sm bg-[linear-gradient(166.62898492335808deg,var(--color-primary),var(--color-primary-container))] px-8 text-[16px] leading-7 font-bold shadow-[0px_20px_25px_-5px_rgba(0,61,155,0.2),0px_8px_10px_-6px_rgba(0,61,155,0.2)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 md:h-[60px] md:px-10 md:text-[18px]"
      href={`/projects/${projectId}/epics/new`}
    >
      <BoltIcon />
      <span>Create First Epic</span>
    </Link>
  );
}
