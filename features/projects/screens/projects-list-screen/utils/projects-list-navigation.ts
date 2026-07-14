import { initialProjectsPage } from './projects-pagination';

export type ProjectsListSuccessType = 'created' | 'updated';

export function getCreatedProjectDestinationPage(currentPage: number): number {
  return currentPage;
}

export function getUpdatedProjectDestinationPage(page: number): number {
  return page;
}

export function getProjectsPageHref(
  page: number,
  successType?: ProjectsListSuccessType,
): string {
  const queryParts: string[] = [];

  if (page !== initialProjectsPage) {
    queryParts.push(`page=${page}`);
  }

  if (successType) {
    queryParts.push(`success=${successType}`);
  }

  return queryParts.length > 0
    ? `/projects?${queryParts.join('&')}`
    : '/projects';
}

export function getProjectsSuccessMessage(
  successType: ProjectsListSuccessType,
): string {
  return successType === 'created'
    ? 'Project created successfully'
    : 'Project updated successfully';
}
