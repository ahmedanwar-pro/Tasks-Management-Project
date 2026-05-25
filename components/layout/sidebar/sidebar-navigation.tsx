import Link from 'next/link';
import type { ReactElement } from 'react';
import { joinClasses } from '@/components/ui/utils';
import { LayoutIcon } from '../layout-icons';
import { navigationItems } from './navigation-items';

type SidebarNavigationProps = {
  activeHref: string;
  collapsed?: boolean;
  onNavigate?: () => void;
};

export function SidebarNavigation({
  activeHref,
  collapsed = false,
  onNavigate,
}: SidebarNavigationProps): ReactElement {
  return (
    <nav
      aria-label="Primary"
      className={joinClasses(
        'flex flex-1 flex-col',
        collapsed ? 'gap-4' : 'gap-1',
      )}
    >
      {navigationItems.map((item) => {
        const active = item.href === activeHref;

        return (
          <Link
            aria-current={active ? 'page' : undefined}
            aria-label={collapsed ? item.label : undefined}
            className={joinClasses(
              'focus-visible:outline-primary text-body-sm leading-base flex shrink-0 items-center rounded-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
              collapsed ? 'size-12 justify-center' : 'h-10 w-full gap-3 px-3',
              active
                ? 'bg-surface text-primary shadow-sm'
                : 'text-text-primary hover:bg-surface-muted',
            )}
            href={item.href}
            key={item.href}
            onClick={onNavigate}
            title={collapsed ? item.label : undefined}
          >
            <LayoutIcon
              className={item.icon === 'projects' ? 'size-5.25' : undefined}
              name={item.icon}
            />
            {collapsed ? null : <span>{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
