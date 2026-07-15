import type { ReactElement } from 'react';
import { Skeleton } from '@/components/ui';

export function ProjectsLoadingPagination(): ReactElement {
  return (
    <>
      <footer className="-mx-6 mt-5 hidden h-10 items-center justify-between border-t border-[#dce4f5] bg-[#f8faff] px-6 md:flex">
        <Skeleton className="h-3.5 w-40 opacity-65" radius="xs" variant="line" />
        <div className="flex items-center gap-4.5">
          <Skeleton
            className="size-5 rounded-full opacity-60"
            radius="full"
            variant="avatar"
          />
          <Skeleton className="h-3.5 w-18 opacity-65" radius="xs" variant="line" />
          <Skeleton
            className="size-5 rounded-full opacity-60"
            radius="full"
            variant="avatar"
          />
        </div>
      </footer>
      <div
        aria-hidden="true"
        className="flex min-h-12 items-center justify-center pt-4 md:hidden"
      >
        <Skeleton className="h-3.5 w-32 opacity-60" radius="xs" variant="line" />
      </div>
    </>
  );
}
