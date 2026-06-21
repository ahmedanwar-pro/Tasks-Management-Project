import type { ReactElement } from 'react';
import { Skeleton } from '@/components/ui';

const loadingRows = [
  'project-task-list-loading-1',
  'project-task-list-loading-2',
  'project-task-list-loading-3',
  'project-task-list-loading-4',
  'project-task-list-loading-5',
];

export function ProjectTasksListLoading(): ReactElement {
  return (
    <section
      aria-label="Loading project tasks"
      className="mt-6 md:mt-8"
      role="status"
    >
      <div className="flex w-full flex-col gap-3 md:hidden">
        {loadingRows.slice(0, 3).map((row) => (
          <div
            className="bg-surface flex min-h-[122px] flex-col justify-between gap-4 rounded-md p-4 shadow-sm"
            key={row}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-14" size="sm" />
                <Skeleton className="h-6 w-full max-w-[262px]" size="lg" />
              </div>
              <Skeleton className="h-[21px] w-20" size="sm" />
            </div>

            <div className="flex items-end justify-between gap-3">
              <div className="flex items-center gap-3">
                <Skeleton className="size-6 rounded-full" variant="avatar" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-14" size="xs" />
                  <Skeleton className="h-4 w-20" size="xs" />
                </div>
              </div>
              <Skeleton className="size-8" radius="xs" variant="block" />
            </div>
          </div>
        ))}
      </div>

      <div className="border-surface-muted bg-surface-low hidden rounded-md border p-1 md:block">
        <div className="bg-surface overflow-hidden rounded-md shadow-sm">
          <div className="bg-surface-high/30 grid grid-cols-[11%_30%_19%_14%_19%_7%] px-6 py-4">
            {[
              'Task ID',
              'Title',
              'Status',
              'Due Date',
              'Assignee',
              'Settings',
            ].map((heading) => (
              <Skeleton className="h-4 w-16" key={heading} size="xs" />
            ))}
          </div>
          {loadingRows.map((row) => (
            <div
              className="border-surface-muted grid h-[68px] grid-cols-[11%_30%_19%_14%_19%_7%] items-center border-t px-6 py-4"
              key={row}
            >
              <Skeleton className="h-4 w-16 max-w-full" size="xs" />
              <Skeleton className="h-5 w-72 max-w-full" size="md" />
              <Skeleton className="h-[21px] w-20 max-w-full" size="sm" />
              <Skeleton className="h-4 w-20 max-w-full" size="xs" />
              <div className="flex items-center gap-3">
                <Skeleton className="size-7 rounded-full" variant="avatar" />
                <Skeleton className="h-4 w-16 max-w-full" size="xs" />
              </div>
              <div className="flex justify-end">
                <Skeleton className="size-8" radius="xs" variant="block" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
