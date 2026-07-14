import { initialProjectEpicsPage } from './project-epics-pagination';

export type ProjectEpicsListSuccessType = 'created';

export function getCreatedProjectEpicDestinationPage(): number {
  return initialProjectEpicsPage;
}

export function getProjectEpicsPageHref(
  projectId: string,
  page: number,
  successType?: ProjectEpicsListSuccessType,
): string {
  const queryParts: string[] = [];

  if (page !== initialProjectEpicsPage) {
    queryParts.push(`page=${page}`);
  }

  if (successType) {
    queryParts.push(`success=${successType}`);
  }

  const basePath = `/projects/${projectId}/epics`;

  return queryParts.length > 0
    ? `${basePath}?${queryParts.join('&')}`
    : basePath;
}

export function getProjectEpicsSuccessMessage(
  successType: ProjectEpicsListSuccessType,
): string {
  return successType === 'created'
    ? 'Epic created successfully'
    : successType;
}
