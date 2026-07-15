import { initialProjectsPage } from './projects-pagination';

export type ProjectsListSuccessType = 'created' | 'updated';

const projectsListSuccessStorageKey = 'projects-list-success';

export function getCreatedProjectDestinationPage(): number {
  return initialProjectsPage;
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

export function persistProjectsSuccessState(
  successType: ProjectsListSuccessType,
): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.setItem(projectsListSuccessStorageKey, successType);
}

export function consumePersistedProjectsSuccessState():
  | ProjectsListSuccessType
  | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const storedValue = window.sessionStorage.getItem(
    projectsListSuccessStorageKey,
  );

  window.sessionStorage.removeItem(projectsListSuccessStorageKey);

  return storedValue === 'created' || storedValue === 'updated'
    ? storedValue
    : undefined;
}
