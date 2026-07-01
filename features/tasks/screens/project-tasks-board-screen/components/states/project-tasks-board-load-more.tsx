import type { ReactElement, RefObject } from 'react';
import { Spinner } from '@/components/ui';

type ProjectTasksBoardLoadMoreProps = {
  error: Error | null;
  isFetchingNextPage: boolean;
  loadMoreRef: RefObject<HTMLDivElement | null>;
  onRetry: () => void;
};

export function ProjectTasksBoardLoadMore({
  error,
  isFetchingNextPage,
  loadMoreRef,
  onRetry,
}: ProjectTasksBoardLoadMoreProps): ReactElement {
  return (
    <div
      aria-live="polite"
      className="sticky left-0 min-h-10 w-full"
      ref={loadMoreRef}
    >
      {isFetchingNextPage ? (
        <div
          className="text-text-secondary flex h-10 w-full items-center justify-center gap-2 text-[12px] font-medium"
          role="status"
        >
          <Spinner className="text-primary" size="sm" />
          Loading more tasks...
        </div>
      ) : null}
      {error ? (
        <div className="border-danger/20 bg-danger/5 sticky left-0 flex min-h-10 w-72 items-center justify-between gap-3 rounded-md border px-4 py-2">
          <p className="text-danger text-[12px] font-medium">
            Could not load more tasks
          </p>
          <button
            className="text-primary hover:text-primary/80 focus-visible:ring-primary/40 shrink-0 rounded-xs text-[12px] font-semibold focus-visible:ring-2 focus-visible:outline-none"
            onClick={onRetry}
            type="button"
          >
            Retry
          </button>
        </div>
      ) : null}
    </div>
  );
}
