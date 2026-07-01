'use client';

import type { ReactElement } from 'react';
import {
  useProjectTasksBoardDragAndDrop,
  useProjectTasksBoardData,
  useProjectTasksBoardInfiniteScroll,
} from '../../hooks';
import { ProjectTasksBoardContent } from './project-tasks-board-content';
import {
  ProjectTasksBoardFeedback,
  projectTasksBoardErrorId,
} from './project-tasks-board-feedback';

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
  const effectiveQueryScopeKey = queryScopeKey ?? 'default';
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
  } = useProjectTasksBoardData({
    projectId,
    queryScopeKey: effectiveQueryScopeKey,
    searchTerm,
  });
  const {
    handleDragCancel,
    handleDragEnd,
    handleDragStart,
    isStatusUpdatePending,
    pendingTaskId,
    sensors,
    statusUpdateError,
  } = useProjectTasksBoardDragAndDrop({
    projectId,
    queryScopeKey: effectiveQueryScopeKey,
    searchTerm: searchTerm ?? '',
  });
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
        hasBoardError && !isSearchPending ? projectTasksBoardErrorId : undefined
      }
      aria-label="Project tasks board"
      className="-mx-6 min-h-0 flex-1 overflow-auto px-6 pb-4 md:-mx-8 md:px-8"
      ref={scrollContainerRef}
    >
      <ProjectTasksBoardFeedback
        hasBoardError={hasBoardError}
        hasStatusUpdateError={Boolean(statusUpdateError)}
        isBoardEmpty={isBoardEmpty}
        isSearchActive={isSearchActive}
        isSearchPending={isSearchPending}
        onRetryBoard={retryBoard}
      />
      <ProjectTasksBoardContent
        columns={columns}
        columnState={{
          hasBoardError,
          isBoardEmpty,
          isDragDisabled: isStatusUpdatePending,
          isSearchActive,
          isSearchPending,
          pendingTaskId,
        }}
        loadMoreState={{
          error: loadMoreError,
          isFetchingNextPage,
          loadMoreRef,
          onRetry: retryNextPage,
        }}
        onDragCancel={handleDragCancel}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        projectId={projectId}
        sensors={sensors}
      />
    </section>
  );
}
