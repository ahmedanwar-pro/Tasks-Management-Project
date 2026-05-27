'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { ReactElement } from 'react';
import {
  isProjectsUnauthorizedError,
  type ProjectResponse,
} from './api/get-projects';
import {
  AddProjectCard,
  MobileCreateProjectButton,
  ProjectCard,
  ProjectsEmptyState,
  ProjectsErrorState,
  ProjectsListHeader,
  ProjectsLoadingState,
  ProjectsPagination,
} from './components';
import type { ProjectSummary } from './components';
import { useProjectsQuery } from './hooks/use-projects-query';

function formatCreatedAt(createdAt: string): string {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return createdAt;
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function getCreatedAtDateTime(createdAt: string): string | undefined {
  return Number.isNaN(new Date(createdAt).getTime()) ? undefined : createdAt;
}

function mapProject(project: ProjectResponse): ProjectSummary {
  return {
    created_at: getCreatedAtDateTime(project.created_at),
    createdAt: formatCreatedAt(project.created_at),
    description: project.description ?? '',
    id: project.id,
    title: project.name,
  };
}

export function ProjectsListScreen(): ReactElement {
  const router = useRouter();
  const { data, error, isPending, refetch } = useProjectsQuery();
  const isUnauthorized = isProjectsUnauthorizedError(error);

  useEffect(() => {
    if (isUnauthorized) {
      router.replace('/login');
    }
  }, [isUnauthorized, router]);

  if (isPending || isUnauthorized) {
    return <ProjectsLoadingState />;
  }

  if (error) {
    return <ProjectsErrorState onRetry={() => void refetch()} />;
  }

  const projects = data.map(mapProject);

  if (projects.length === 0) {
    return <ProjectsEmptyState />;
  }

  return (
    <section
      aria-labelledby="projects-title"
      className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pt-9 pb-8 lg:h-[calc(100dvh-4rem)] lg:px-8 lg:pt-8"
    >
      <ProjectsListHeader />

      <div className="mt-6 flex flex-col gap-6 lg:mt-8 lg:grid lg:grid-cols-3">
        <ul aria-label="Projects" className="contents">
          {projects.map((project) => (
            <ProjectCard
              className="lg:block"
              key={project.id}
              project={project}
            />
          ))}
        </ul>
        <AddProjectCard />
      </div>

      <ProjectsPagination projectCount={projects.length} />
      <MobileCreateProjectButton />
    </section>
  );
}
