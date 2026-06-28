'use client';

import type { ReactElement } from 'react';
import {
  useProjectTasksBoardData,
  useProjectTasksBoardInfiniteScroll,
} from '../hooks';
import { ProjectTasksBoardColumn } from './project-tasks-board-column';
import { ProjectTasksBoardLoadMore } from './states';

type ProjectTasksBoardProps = {
  projectId: string;
  queryScopeKey?: string;
};

export function ProjectTasksBoard({
  projectId,
  queryScopeKey,
}: ProjectTasksBoardProps): ReactElement {
  const {
    columns,
    hasNextPage,
    isFetchingNextPage,
    loadMoreError,
    loadNextPage,
    retryNextPage,
  } = useProjectTasksBoardData({ projectId, queryScopeKey });
  const { loadMoreRef, scrollContainerRef } =
    useProjectTasksBoardInfiniteScroll({
      hasNextPage,
      isFetchingNextPage,
      onLoadMore: loadNextPage,
      visibleError: loadMoreError,
    });

  return (
    <section
      aria-label="Project tasks board"
      className="-mx-6 min-h-0 flex-1 overflow-auto px-6 pb-4 md:-mx-8 md:px-8"
      ref={scrollContainerRef}
    >
      <div className="flex min-h-full w-max flex-col pb-4">
        <div className="flex flex-1 items-start gap-6">
          {columns.map((column) => (
            <ProjectTasksBoardColumn
              column={column}
              key={column.config.status}
              projectId={projectId}
            />
          ))}
        </div>
        <ProjectTasksBoardLoadMore
          error={loadMoreError}
          isFetchingNextPage={isFetchingNextPage}
          loadMoreRef={loadMoreRef}
          onRetry={retryNextPage}
        />
      </div>
    </section>
  );
}
