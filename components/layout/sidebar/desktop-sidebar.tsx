import type { ReactElement } from 'react';
import { Logo } from '@/components/ui';
import { joinClasses } from '@/components/ui/utils';
import { LayoutIcon } from '../layout-icons';
import { LogoutAction, LogoutError } from './logout-action';
import type { AppNavigationItem } from './navigation-items';
import { SidebarNavigation } from './sidebar-navigation';

type DesktopSidebarProps = {
  activeHref: string;
  collapsed: boolean;
  isLogoutPending: boolean;
  items: AppNavigationItem[];
  logoutError: Error | null;
  onLogout: () => void;
  onToggleCollapsed: () => void;
};

export function DesktopSidebar({
  activeHref,
  collapsed,
  isLogoutPending,
  items,
  logoutError,
  onLogout,
  onToggleCollapsed,
}: DesktopSidebarProps): ReactElement {
  return (
    <aside
      aria-label="Application sidebar"
      className={joinClasses(
        'bg-surface-low fixed inset-y-0 left-0 z-30 hidden flex-col transition-[width] lg:flex',
        collapsed ? 'w-20 items-center px-2 py-[14px]' : 'w-[256px] p-4',
      )}
    >
      <div
        className={joinClasses(
          'flex shrink-0',
          collapsed ? 'mb-8.25 h-12 items-center justify-center' : 'mb-8 px-2',
        )}
      >
        <Logo variant={collapsed ? 'icon' : 'full'} />
      </div>
      <SidebarNavigation
        activeHref={activeHref}
        collapsed={collapsed}
        items={items}
      />
      <div
        className={joinClasses(
          'border-border-subtle flex shrink-0 flex-col border-t',
          collapsed ? 'items-center gap-3 pt-6.25' : 'gap-1 pt-6.25',
        )}
      >
        <button
          aria-label={collapsed ? 'Expand sidebar' : undefined}
          aria-pressed={collapsed}
          className={joinClasses(
            'focus-visible:outline-primary text-text-primary text-body-sm leading-base flex items-center rounded-sm font-medium focus-visible:outline focus-visible:outline-offset-2',
            collapsed ? 'size-12 justify-center' : 'h-10 w-full gap-3 px-3',
          )}
          onClick={onToggleCollapsed}
          title={collapsed ? 'Expand sidebar' : undefined}
          type="button"
        >
          <LayoutIcon
            className={joinClasses(
              'w-3 transition-transform',
              collapsed && 'rotate-180',
            )}
            name="chevron"
          />
          {collapsed ? null : <span>Collapse</span>}
        </button>
        <LogoutAction
          collapsed={collapsed}
          isPending={isLogoutPending}
          onLogout={onLogout}
        />
        {logoutError && !collapsed ? <LogoutError /> : null}
      </div>
    </aside>
  );
}
