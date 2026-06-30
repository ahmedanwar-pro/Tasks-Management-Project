'use client';

import type { ReactElement } from 'react';
import {
  useProjectTasksBoardData,
  useProjectTasksBoardInfiniteScroll,
} from '../hooks';
import { ProjectTasksBoardColumn } from './project-tasks-board-column';
import {
  ProjectTasksBoardError,
  ProjectTasksBoardLoadMore,
  ProjectTasksBoardResultEmpty,
} from './states';

const projectTasksBoardErrorId = 'project-tasks-board-error';

type ProjectTasksBoardProps = {
  isSearchPending?: boolean;
  projectId: string;
  queryScopeKey?: string;
  searchTerm?: string;
};

export function ProjectTasksBoard({
  isSearchPending = false,
  projectId,
  queryScopeKey,
  searchTerm,
}: ProjectTasksBoardProps): ReactElement {
  const {
    columns,
    hasNextPage,
    hasBoardError,
    isBoardEmpty,
    isFetchingNextPage,
    isSearchActive,
    loadMoreError,
    loadNextPage,
    retryBoard,
    retryNextPage,
  } = useProjectTasksBoardData({ projectId, queryScopeKey, searchTerm });
  const { loadMoreRef, scrollContainerRef } =
    useProjectTasksBoardInfiniteScroll({
      hasNextPage: hasNextPage && !isSearchPending,
      isFetchingNextPage,
      onLoadMore: loadNextPage,
      visibleError: loadMoreError,
    });

  return (
    <section
      aria-describedby={
        hasBoardError && !isSearchPending
          ? projectTasksBoardErrorId
          : undefined
      }
      aria-label="Project tasks board"
      className="-mx-6 min-h-0 flex-1 overflow-auto px-6 pb-4 md:-mx-8 md:px-8"
      ref={scrollContainerRef}
    >
      {hasBoardError && !isSearchPending ? (
        <div className="sticky left-0 mb-4 w-full">
          <ProjectTasksBoardError
            id={projectTasksBoardErrorId}
            message={isSearchActive ? 'Failed to search tasks' : undefined}
            onRetry={retryBoard}
          />
        </div>
      ) : null}
      {isBoardEmpty && !isSearchPending ? (
        <ProjectTasksBoardResultEmpty isSearchActive={isSearchActive} />
      ) : null}
      <div className="flex min-h-full w-max flex-col pb-4">
        <div className="flex flex-1 items-start gap-6">
          {columns.map((column) => (
            <ProjectTasksBoardColumn
              column={column}
              hasBoardError={hasBoardError}
              isBoardEmpty={isBoardEmpty}
              isSearchActive={isSearchActive}
              isSearchPending={isSearchPending}
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
