import type { LayoutIconName } from '../layout-icons';

export type AppNavigationItem = {
  label: string;
  shortLabel: string;
  href: string;
  icon: LayoutIconName;
};

const projectsNavigationItem: AppNavigationItem = {
  label: 'Projects',
  shortLabel: 'Projects',
  href: '/projects',
  icon: 'projects',
};

export function getProjectIdFromPathname(pathname: string): string | undefined {
  return pathname.match(
    /^\/projects\/([^/]+)\/(?:tasks|members|epics|edit|analytics)(?:\/|$)/,
  )?.[1];
}

export function getNavigationItems(projectId?: string): AppNavigationItem[] {
  if (!projectId) {
    return [projectsNavigationItem];
  }

  const projectBaseHref = `/projects/${projectId}`;

  return [
    projectsNavigationItem,
    {
      label: 'Project Epics',
      shortLabel: 'Epics',
      href: `${projectBaseHref}/epics`,
      icon: 'epics',
    },
    {
      label: 'Project Tasks',
      shortLabel: 'Tasks',
      href: `${projectBaseHref}/tasks?view=board`,
      icon: 'tasks',
    },
    {
      label: 'Project Members',
      shortLabel: 'Members',
      href: `${projectBaseHref}/members`,
      icon: 'members',
    },
    {
      label: 'Project Details',
      shortLabel: 'Details',
      href: `${projectBaseHref}/edit`,
      icon: 'details',
    },
  ];
}
