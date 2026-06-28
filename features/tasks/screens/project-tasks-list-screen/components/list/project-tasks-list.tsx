import type { ReactElement, RefObject } from 'react';
import type { ProjectTasksListItem } from '../../types';
import { ProjectTasksListTable } from './project-tasks-list-table';
import { ProjectTasksMobileLoadMore } from './project-tasks-mobile-load-more';
import { ProjectTasksMobileList } from './project-tasks-mobile-list';

type ProjectTasksListProps = {
  currentPage: number;
  hasMoreMobileTasks: boolean;
  isFetchingNextPage: boolean;
  loadMoreRef: RefObject<HTMLDivElement | null>;
  onPageChange: (page: number) => void;
  pageSize: number;
  projectId: string;
  tasks: ProjectTasksListItem[];
  totalCount: number;
};

export function ProjectTasksList({
  currentPage,
  hasMoreMobileTasks,
  isFetchingNextPage,
  loadMoreRef,
  onPageChange,
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
