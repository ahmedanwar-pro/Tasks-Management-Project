import { initialProjectTasksListPage } from './project-tasks-list-pagination';

export type ProjectTasksListSuccessType = 'created';

export function getCreatedProjectTaskDestinationPage(): number {
  return initialProjectTasksListPage;
}

export function getProjectTasksListHref(
  projectId: string,
  page = 1,
  successType?: ProjectTasksListSuccessType,
): string {
  const queryParts = ['view=list'];

  if (page > 1) {
    queryParts.push(`page=${page}`);
  }

  if (successType) {
    queryParts.push(`success=${successType}`);
  }

  return `/projects/${projectId}/tasks?${queryParts.join('&')}`;
}

export function getProjectTasksListSuccessMessage(
  successType: ProjectTasksListSuccessType,
): string {
  return successType === 'created' ? 'Task created successfully' : successType;
}

export function getProjectTaskDetailsListHref(
  projectId: string,
  taskId: string,
  page = 1,
): string {
  const queryParts = ['view=list'];

  if (page > 1) {
    queryParts.push(`page=${page}`);
  }

  return `/projects/${projectId}/tasks/${taskId}?${queryParts.join('&')}`;
}
