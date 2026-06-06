import type { ProjectResponse } from '../api/get-projects';
import type { ProjectListItem } from '../types';
import { formatDisplayDate } from '@/features/shared/utils/date-format';

function formatCreatedAt(createdAt: string): string {
  return formatDisplayDate(createdAt, createdAt);
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
