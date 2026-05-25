export function getActiveNavigationHref(pathname: string): string {
  if (/^\/projects\/[^/]+\/members(?:\/|$)/.test(pathname)) {
    return '/projects/demo/members';
  }

  if (/^\/projects\/[^/]+\/tasks(?:\/|$)/.test(pathname)) {
    return '/projects/demo/tasks';
  }

  if (/^\/projects\/[^/]+\/epics(?:\/|$)/.test(pathname)) {
    return '/projects/demo/epics';
  }

  if (/^\/projects\/[^/]+\/edit(?:\/|$)/.test(pathname)) {
    return '/projects/demo/edit';
  }

  return '/projects';
}
