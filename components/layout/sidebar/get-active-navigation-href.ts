import { getProjectIdFromPathname } from './navigation-items';

export function getActiveNavigationHref(pathname: string): string {
  if (/^\/my-statistics(?:\/|$)/.test(pathname)) {
    return '/my-statistics';
  }

  const projectId = getProjectIdFromPathname(pathname);

  if (!projectId) {
    return '/projects';
  }

  if (/^\/projects\/[^/]+\/members(?:\/|$)/.test(pathname)) {
    return `/projects/${projectId}/members`;
  }

  if (/^\/projects\/[^/]+\/tasks(?:\/|$)/.test(pathname)) {
    return `/projects/${projectId}/tasks`;
  }

  if (/^\/projects\/[^/]+\/epics(?:\/|$)/.test(pathname)) {
    return `/projects/${projectId}/epics`;
  }

  if (/^\/projects\/[^/]+\/edit(?:\/|$)/.test(pathname)) {
    return `/projects/${projectId}/edit?from=sidebar`;
  }

  return '/projects';
}
