'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { BoardHeader, ProjectTasksBoard } from './components';
import { useProjectTasksBoardSearch } from './hooks';

type ProjectTasksBoardScreenProps = {
  projectId: string;
};

export function ProjectTasksBoardScreen({
  projectId,
}: ProjectTasksBoardScreenProps): ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    debouncedSearchTerm,
    isSearchPending,
    onSearchTermChange,
    searchTerm,
  } = useProjectTasksBoardSearch();

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const redirectToListView = (): void => {
      if (mobileQuery.matches) {
        const params = new URLSearchParams(searchParams.toString());
        params.set('view', 'list');
        router.replace(`/projects/${projectId}/tasks?${params.toString()}`);
      }
    };

    redirectToListView();
    mobileQuery.addEventListener('change', redirectToListView);

    return () => {
      mobileQuery.removeEventListener('change', redirectToListView);
    };
  }, [projectId, router, searchParams]);

  return (
    <section
      aria-labelledby="project-tasks-board-title"
      className="hidden h-[calc(100dvh-4rem)] min-h-[calc(100dvh-4rem)] w-full flex-col gap-6 overflow-hidden px-6 pt-8 pb-6 md:flex md:min-h-[720px] md:px-8"
    >
      <BoardHeader
        onSearchTermChange={onSearchTermChange}
        projectId={projectId}
        searchTerm={searchTerm}
      />
      <ProjectTasksBoard
        isSearchPending={isSearchPending}
        projectId={projectId}
        searchTerm={debouncedSearchTerm}
      />
    </section>
  );
}
