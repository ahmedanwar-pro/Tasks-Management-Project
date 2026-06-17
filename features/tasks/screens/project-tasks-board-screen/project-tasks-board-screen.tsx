'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { BoardHeader, ProjectTasksBoard } from './components';

type ProjectTasksBoardScreenProps = {
  projectId: string;
};

export function ProjectTasksBoardScreen({
  projectId,
}: ProjectTasksBoardScreenProps): ReactElement {
  const router = useRouter();

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const redirectToListView = (): void => {
      if (mobileQuery.matches) {
        router.replace(`/projects/${projectId}/tasks?view=list`);
      }
    };

    redirectToListView();
    mobileQuery.addEventListener('change', redirectToListView);

    return () => {
      mobileQuery.removeEventListener('change', redirectToListView);
    };
  }, [projectId, router]);

  return (
    <section
      aria-labelledby="project-tasks-board-title"
      className="hidden h-[calc(100dvh-4rem)] min-h-[calc(100dvh-4rem)] w-full flex-col gap-6 overflow-hidden px-6 pt-8 pb-6 md:flex md:min-h-[720px] md:px-8"
    >
      <BoardHeader projectId={projectId} />
      <ProjectTasksBoard projectId={projectId} />
    </section>
  );
}
