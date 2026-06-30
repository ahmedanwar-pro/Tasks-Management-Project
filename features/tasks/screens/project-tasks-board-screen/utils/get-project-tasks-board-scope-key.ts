import { projectTasksBoardStatuses } from './project-tasks-board-config';

export function getProjectTasksBoardScopeKey(
  projectId: string,
  queryScopeKey: string,
  searchTerm = '',
): string {
  const statusScopeKey = projectTasksBoardStatuses
    .map(({ status }) => status)
    .join(',');

  return `${projectId}:${queryScopeKey}:${searchTerm}:${statusScopeKey}`;
}
