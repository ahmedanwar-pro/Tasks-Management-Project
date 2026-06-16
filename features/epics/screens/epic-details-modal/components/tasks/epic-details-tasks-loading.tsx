import type { ReactElement } from 'react';
import { Skeleton } from '@/components/ui';

const loadingRows = ['task-loading-1', 'task-loading-2', 'task-loading-3'];

export function EpicDetailsTasksLoading(): ReactElement {
  return (
    <>
      <div
        aria-label="Loading epic tasks"
        className="flex w-full flex-col gap-3 lg:hidden"
        role="status"
      >
        {loadingRows.map((row) => (
          <div
            className="bg-surface flex w-full flex-col gap-3 rounded-lg border border-[#e8edff] p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
            key={row}
          >
            <div className="flex min-w-0 items-start justify-between gap-3">
              <Skeleton className="h-5 min-w-0 flex-1" size="md" />
              <Skeleton
                className="mt-[1px] h-[9.333px] w-[2.333px]"
                size="xs"
              />
            </div>
            <div className="flex min-w-0 items-center justify-between gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <Skeleton
                  className="size-5 rounded-[12px]"
                  size="xs"
                  variant="avatar"
                />
                <Skeleton
                  className="h-[16.5px] max-w-24 min-w-0 flex-1"
                  size="sm"
                />
              </div>
              <Skeleton className="h-[16.5px] w-[88px]" size="sm" />
            </div>
          </div>
        ))}
      </div>
      <div
        aria-label="Loading epic tasks"
        className="border-border-subtle bg-surface hidden w-full overflow-hidden rounded-md border lg:block"
        role="status"
      >
        {loadingRows.map((row) => (
          <div
            className="border-border-subtle flex w-full items-center justify-between gap-6 border-t px-4 py-4 first:border-t-0"
            key={`${row}-desktop`}
          >
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <Skeleton className="size-5 rounded-full" variant="avatar" />
              <div className="flex min-w-0 flex-col gap-2">
                <Skeleton className="h-5 w-64 max-w-full" size="md" />
                <Skeleton className="h-4 w-28" size="sm" />
              </div>
            </div>
            <Skeleton className="h-8 w-20" size="sm" />
          </div>
        ))}
      </div>
    </>
  );
}
