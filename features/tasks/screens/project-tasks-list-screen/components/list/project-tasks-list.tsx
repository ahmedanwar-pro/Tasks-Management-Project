import type { ReactElement, RefObject } from 'react';
import type { ProjectTasksListItem } from '../../types';
import { ProjectTasksListError } from '../states';
import { ProjectTasksListTable } from './project-tasks-list-table';
import { ProjectTasksMobileLoadMore } from './project-tasks-mobile-load-more';
import { ProjectTasksMobileList } from './project-tasks-mobile-list';

type ProjectTasksListProps = {
  currentPage: number;
  hasMoreMobileTasks: boolean;
  hasPartialError: boolean;
  isFetchingNextPage: boolean;
  isRetrying: boolean;
  isSearchActive: boolean;
  loadMoreRef: RefObject<HTMLDivElement | null>;
  onPageChange: (page: number) => void;
  onRetry: () => void;
  pageSize: number;
  projectId: string;
  tasks: ProjectTasksListItem[];
  totalCount: number;
};

export function ProjectTasksList({
  currentPage,
  hasMoreMobileTasks,
  hasPartialError,
  isFetchingNextPage,
  isRetrying,
  isSearchActive,
  loadMoreRef,
  onPageChange,
  onRetry,
  pageSize,
  projectId,
  tasks,
  totalCount,
}: ProjectTasksListProps): ReactElement {
  return (
    <section aria-label="Project tasks list" className="mt-5 md:mt-8">
      <ProjectTasksMobileList projectId={projectId} tasks={tasks} />
      {hasMoreMobileTasks ? (
        <ProjectTasksMobileLoadMore
          isFetchingNextPage={isFetchingNextPage}
          loadMoreRef={loadMoreRef}
        />
      ) : null}
      {hasPartialError ? (
        <div className="md:hidden">
          <ProjectTasksListError
            isPartial
            isRetrying={isRetrying}
            isSearchError={isSearchActive}
            onRetry={onRetry}
          />
        </div>
      ) : null}
      <ProjectTasksListTable
        currentPage={currentPage}
        onPageChange={onPageChange}
        pageSize={pageSize}
        projectId={projectId}
        tasks={tasks}
        totalCount={totalCount}
      />
    </section>
  );
}
