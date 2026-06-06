import type { ReactElement, RefObject } from 'react';

type ProjectEpicsMobileLoadMoreProps = {
  isFetchingNextPage: boolean;
  loadMoreRef: RefObject<HTMLDivElement | null>;
};

export function ProjectEpicsMobileLoadMore({
  isFetchingNextPage,
  loadMoreRef,
}: ProjectEpicsMobileLoadMoreProps): ReactElement {
  return (
    <div
      aria-live="polite"
      className="text-text-secondary flex min-h-12 items-center justify-center pt-4 text-[12px] font-medium md:hidden"
      ref={loadMoreRef}
      role={isFetchingNextPage ? 'status' : undefined}
    >
      {isFetchingNextPage ? 'Loading more epics...' : null}
    </div>
  );
}
