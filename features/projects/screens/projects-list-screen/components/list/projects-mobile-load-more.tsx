import type { ReactElement, RefObject } from 'react';

type ProjectsMobileLoadMoreProps = {
  isFetchingNextPage: boolean;
  loadMoreRef: RefObject<HTMLDivElement | null>;
};

export function ProjectsMobileLoadMore({
  isFetchingNextPage,
  loadMoreRef,
}: ProjectsMobileLoadMoreProps): ReactElement {
  return (
    <div
      aria-live="polite"
      className="text-text-secondary flex min-h-12 items-center justify-center pt-4 text-[12px] font-medium md:hidden"
      ref={loadMoreRef}
      role={isFetchingNextPage ? 'status' : undefined}
    >
      {isFetchingNextPage ? 'Loading more projects...' : null}
    </div>
  );
}
