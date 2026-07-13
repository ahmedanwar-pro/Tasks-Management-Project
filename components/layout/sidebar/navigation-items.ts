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

const myStatisticsNavigationItem: AppNavigationItem = {
  label: 'My Statistics',
  shortLabel: 'Stats',
  href: '/my-statistics',
  icon: 'analytics',
};

export function getProjectIdFromPathname(pathname: string): string | undefined {
  return pathname.match(
    /^\/projects\/([^/]+)\/(?:tasks|members|epics|edit|analytics)(?:\/|$)/,
  )?.[1];
}

export function getNavigationItems(projectId?: string): AppNavigationItem[] {
  if (!projectId) {
    return [projectsNavigationItem, myStatisticsNavigationItem];
  }

  const projectBaseHref = `/projects/${projectId}`;

  return [
    projectsNavigationItem,
    myStatisticsNavigationItem,
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
