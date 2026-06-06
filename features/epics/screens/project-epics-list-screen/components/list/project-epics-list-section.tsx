import type { ReactElement } from 'react';
import type { ProjectEpicsListSectionProps } from '../../types';
import { ProjectEpicsLoadingList } from './loading';
import { ProjectEpicsMobileLoadMore } from './project-epics-mobile-load-more';
import { ProjectEpicsList } from './project-epics-list';
import { ProjectEpicsPagination } from './pagination/project-epics-pagination';

export function ProjectEpicsListSection({
  currentPage,
  epics,
  hasMoreMobileEpics,
  isFetchingNextPage,
  isLoading,
  isMobileViewport,
  loadMoreRef,
  onPageChange,
  pageSize,
  totalCount,
}: ProjectEpicsListSectionProps): ReactElement {
  return (
    <>
      {isLoading ? (
        <ProjectEpicsLoadingList />
      ) : (
        <ProjectEpicsList
          epics={epics}
          showAllOnMobile={isMobileViewport}
        />
      )}
      {hasMoreMobileEpics && (
        <ProjectEpicsMobileLoadMore
          isFetchingNextPage={isFetchingNextPage}
          loadMoreRef={loadMoreRef}
        />
      )}
      {!isLoading && totalCount > 0 ? (
        <ProjectEpicsPagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          pageSize={pageSize}
          totalCount={totalCount}
          visibleCount={epics.length}
        />
      ) : null}
    </>
  );
}
