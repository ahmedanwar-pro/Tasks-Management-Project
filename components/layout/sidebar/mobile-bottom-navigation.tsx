import Link from 'next/link';
import type { ReactElement } from 'react';
import { joinClasses } from '@/components/ui/utils';
import { LayoutIcon } from '../layout-icons';
import { navigationItems } from './navigation-items';

type MobileBottomNavigationProps = {
  activeHref: string;
};

export function MobileBottomNavigation({
  activeHref,
}: MobileBottomNavigationProps): ReactElement {
  return (
    <nav
      aria-label="Primary mobile"
      className="bg-surface-low fixed inset-x-0 bottom-0 z-20 flex h-16 items-center justify-around px-4 sm:hidden"
    >
      {navigationItems.map((item) => {
        const active = item.href === activeHref;

        return (
          <Link
            aria-current={active ? 'page' : undefined}
            className={joinClasses(
              'focus-visible:outline-primary leading-compact flex min-w-11 flex-col items-center gap-0.5 text-[10px] focus-visible:outline-2',
              active ? 'text-primary font-semibold' : 'text-text-tertiary',
            )}
            href={item.href}
            key={item.href}
          >
            <LayoutIcon
              className={joinClasses(
                'size-icon-sm',
                item.icon === 'members' && 'w-5.5',
              )}
              name={item.icon}
            />
            <span>{item.shortLabel}</span>
          </Link>
        );
      })}
    </nav>
  );
}
