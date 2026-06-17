import { getProjectIdFromPathname } from './navigation-items';

export function getActiveNavigationHref(pathname: string): string {
  const projectId = getProjectIdFromPathname(pathname);

  if (!projectId) {
    return '/projects';
  }

  if (/^\/projects\/[^/]+\/members(?:\/|$)/.test(pathname)) {
    return `/projects/${projectId}/members`;
  }

  if (/^\/projects\/[^/]+\/tasks(?:\/|$)/.test(pathname)) {
    return `/projects/${projectId}/tasks?view=board`;
  }

  if (/^\/projects\/[^/]+\/epics(?:\/|$)/.test(pathname)) {
    return `/projects/${projectId}/epics`;
  }

  if (/^\/projects\/[^/]+\/edit(?:\/|$)/.test(pathname)) {
    return `/projects/${projectId}/edit`;
  }

  return '/projects';
}
