import type { LayoutIconName } from '../layout-icons';

export type AppNavigationItem = {
  label: string;
  shortLabel: string;
  href: string;
  icon: LayoutIconName;
};

export const navigationItems: AppNavigationItem[] = [
  {
    label: 'Projects',
    shortLabel: 'Projects',
    href: '/projects',
    icon: 'projects',
  },
  {
    label: 'Project Epics',
    shortLabel: 'Epics',
    href: '/projects/demo/epics',
    icon: 'epics',
  },
  {
    label: 'Project Tasks',
    shortLabel: 'Tasks',
    href: '/projects/demo/tasks',
    icon: 'tasks',
  },
  {
    label: 'Project Members',
    shortLabel: 'Members',
    href: '/projects/demo/members',
    icon: 'members',
  },
  {
    label: 'Project Details',
    shortLabel: 'Details',
    href: '/projects/demo/edit',
    icon: 'details',
  },
];
