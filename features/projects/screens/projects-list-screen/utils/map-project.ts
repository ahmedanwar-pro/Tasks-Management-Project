import type { ProjectResponse } from '../api/get-projects';
import type { ProjectListItem } from '../types';

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

export function mapProject(project: ProjectResponse): ProjectListItem {
  return {
    created_at: getCreatedAtDateTime(project.created_at),
    createdAt: formatCreatedAt(project.created_at),
    description: project.description ?? '',
    id: project.id,
    title: project.name,
  };
}
