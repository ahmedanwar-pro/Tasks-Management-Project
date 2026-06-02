export function getBreadcrumbProjectName(
  projectName?: string | null,
): string {
  return projectName?.trim() || 'Project';
}
