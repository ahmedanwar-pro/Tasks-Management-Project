'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type JSX } from 'react';
import {
  ProjectTasksList,
  ProjectTasksListEmpty,
  ProjectTasksListError,
  ProjectTasksListHeader,
  ProjectTasksListLoading,
} from './components';
import { useProjectTasksListScreenData } from './hooks';

type ProjectTasksListScreenProps = {
  projectId: string;
};

export function ProjectTasksListScreen({
  projectId,
}: ProjectTasksListScreenProps): JSX.Element {
  const router = useRouter();
  const {
    hasPartialError,
    isError,
    isLoading,
    isUnauthorized,
    onRetry,
    tasks,
  } = useProjectTasksListScreenData(projectId);

  useEffect(() => {
    if (isUnauthorized) {
      router.replace('/login');
    }
  }, [isUnauthorized, router]);

  const isEmpty = !isLoading && !isError && tasks.length === 0;

  return (
    <section
      aria-labelledby="project-tasks-list-title"
      className="mx-auto flex w-full max-w-7xl flex-col px-4 py-8 md:min-h-[calc(100dvh-4rem)] md:px-8"
    >
      <ProjectTasksListHeader
        isAddTaskVisible={!isEmpty}
        projectId={projectId}
      />
      {isLoading ? <ProjectTasksListLoading /> : null}
      {!isLoading && isError ? (
        <ProjectTasksListError onRetry={onRetry} />
      ) : null}
      {isEmpty ? <ProjectTasksListEmpty projectId={projectId} /> : null}
      {!isLoading && !isError && tasks.length > 0 ? (
        <>
          {hasPartialError ? (
            <ProjectTasksListError isPartial onRetry={onRetry} />
          ) : null}
          <ProjectTasksList tasks={tasks} />
        </>
      ) : null}
    </section>
  );
}
