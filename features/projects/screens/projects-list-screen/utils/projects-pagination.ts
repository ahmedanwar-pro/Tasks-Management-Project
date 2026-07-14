export const initialProjectsPage = 1;
export const projectsPerPage = 5;
export const mobileProjectsViewportQuery = '(max-width: 767px)';

export function normalizeProjectsPage(page: number): number {
  if (!Number.isFinite(page) || page < initialProjectsPage) {
    return initialProjectsPage;
  }

  return Math.floor(page);
}
