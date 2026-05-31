export const initialProjectsPage = 1;
export const projectsPerPage = 5;
export const mobileProjectsViewportQuery = '(max-width: 767px)';

export function getPaginationOffset(page: number, pageSize: number): number {
  return (page - 1) * pageSize;
}

export function getTotalPages(totalCount: number, pageSize: number): number {
  return Math.ceil(totalCount / pageSize);
}

export function getPageNumbers(totalPages: number): number[] {
  return Array.from({ length: totalPages }, (_, index) => index + 1);
}
