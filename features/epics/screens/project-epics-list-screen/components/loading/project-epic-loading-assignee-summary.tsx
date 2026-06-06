import type { ReactElement } from 'react';
import { Skeleton } from '@/components/ui';

export function ProjectEpicLoadingAssigneeSummary(): ReactElement {
  return (
    <div className="flex w-full items-center justify-between gap-4 pt-[4.7px] xl:block xl:pt-0">
      <div className="flex min-w-0 items-center gap-3">
        <Skeleton
          animated={false}
          className="bg-surface-muted size-7! bg-none xl:size-10!"
          radius="lg"
          variant="avatar"
        />
        <div className="min-w-0 xl:flex xl:flex-col-reverse">
          <Skeleton
            animated={false}
            className="bg-surface-muted h-4! w-12! bg-none sm:w-13.75! xl:w-32!"
            radius="xs"
          />
          <Skeleton
            animated={false}
            className="bg-surface-muted mt-1 h-3.75! w-10! bg-none sm:w-11! xl:mt-0 xl:mb-1 xl:!h-3 xl:!w-16"
            radius="xs"
          />
        </div>
      </div>

      <div className="ml-auto min-w-0 shrink-0 pl-4 lg:hidden">
        <Skeleton
          animated={false}
          className="bg-surface-muted ml-auto h-3.75! w-10! bg-none sm:w-12!"
          radius="xs"
        />
        <Skeleton
          animated={false}
          className="bg-surface-muted mt-0.5 h-4! w-16! bg-none sm:w-18.75!"
          radius="xs"
        />
      </div>
    </div>
  );
}
