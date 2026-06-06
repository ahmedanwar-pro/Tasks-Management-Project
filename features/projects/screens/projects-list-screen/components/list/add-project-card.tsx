import Link from 'next/link';
import type { ReactElement } from 'react';
import { PlusIcon } from '../icons/projects-list-icons';

export function AddProjectCard(): ReactElement {
  return (
    <div className="hidden lg:block">
      <Link
        aria-label="Add project"
        className="border-border bg-surface hover:bg-surface-low focus-visible:outline-primary flex h-55 items-center justify-center rounded-md border-2 border-dashed transition-colors focus-visible:outline focus-visible:outline-offset-2"
        href="/projects/new"
      >
        <span className="flex flex-col items-center gap-4">
          <span className="bg-surface-low text-primary flex size-12 items-center justify-center rounded-lg">
            <PlusIcon className="size-5" />
          </span>
          <span className="text-text-secondary text-overline uppercase">
            Add Project
          </span>
        </span>
      </Link>
    </div>
  );
}
