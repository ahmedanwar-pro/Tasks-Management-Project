import type { ReactElement } from 'react';
import { Skeleton } from '@/components/ui';

const loadingRows = ['board-task-loading-1', 'board-task-loading-2'];

export function ProjectTasksBoardLoading(): ReactElement {
  return (
    <div
      aria-label="Loading project tasks"
      className="flex w-full flex-col gap-3"
      role="status"
    >
      {loadingRows.map((row) => (
        <div
          className="bg-surface flex w-full flex-col gap-4 rounded-md border border-[#c3c6d61a] p-[17px] shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
          key={row}
        >
          <div className="flex min-w-0 flex-col gap-2">
            <Skeleton className="h-5 w-full" size="md" />
            <Skeleton className="h-5 w-3/4" size="md" />
          </div>
          <div className="flex min-w-0 items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <Skeleton className="h-[10px] w-[9px] rounded-xs" size="xs" />
              <Skeleton className="h-[15px] w-16" size="xs" />
            </div>
            <Skeleton
              className="size-6 rounded-[12px]"
              size="xs"
              variant="avatar"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
