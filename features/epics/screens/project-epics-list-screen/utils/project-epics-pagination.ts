export const initialProjectEpicsPage = 1;
export const projectEpicsPerPage = 6;
export const mobileProjectEpicsViewportQuery = '(max-width: 767.98px)';

export function normalizeProjectEpicsPage(page: number): number {
  if (!Number.isFinite(page) || page < initialProjectEpicsPage) {
    return initialProjectEpicsPage;
  }

  return Math.floor(page);
}
