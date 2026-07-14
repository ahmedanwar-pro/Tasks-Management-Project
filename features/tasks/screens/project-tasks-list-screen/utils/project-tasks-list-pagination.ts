export const initialProjectTasksListPage = 1;
export const projectTasksListPageSize = 5;
export const mobileProjectTasksListViewportQuery = '(max-width: 767.98px)';

type ProjectTasksListPageSearchParams = Pick<URLSearchParams, 'getAll'>;

export function normalizeProjectTasksListPage(page: number): number {
  if (!Number.isFinite(page) || page < initialProjectTasksListPage) {
    return initialProjectTasksListPage;
  }

  return Math.floor(page);
}

export function getProjectTasksListPageFromSearchParams(
  searchParams: ProjectTasksListPageSearchParams,
): number {
  const pageValues = searchParams.getAll('page');

  if (pageValues.length !== 1) {
    return initialProjectTasksListPage;
  }

  return normalizeProjectTasksListPage(Number(pageValues[0]));
}
