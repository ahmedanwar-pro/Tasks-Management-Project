import type { ReactElement } from 'react';
import { Drawer, Logo } from '@/components/ui';
import { logoutTriggerIds, type LogoutTriggerId } from '../logout';
import { LogoutAction } from './logout-action';
import type { AppNavigationItem } from './navigation-items';
import { SidebarNavigation } from './sidebar-navigation';

type MobileSidebarDrawerProps = {
  activeHref: string;
  activeLogoutTriggerId: LogoutTriggerId | null;
  drawerOpen: boolean;
  isLogoutPending: boolean;
  items: AppNavigationItem[];
  onCloseDrawer: () => void;
  onLogout: (triggerId: LogoutTriggerId) => void;
};

export function MobileSidebarDrawer({
  activeHref,
  activeLogoutTriggerId,
  drawerOpen,
  isLogoutPending,
  items,
  onCloseDrawer,
  onLogout,
}: MobileSidebarDrawerProps): ReactElement {
  const logoutTriggerId = logoutTriggerIds.mobileDrawer;

  return (
    <Drawer
      aria-label="Mobile navigation menu"
      className="bg-surface-low p-4 lg:hidden"
      elevated
      id="mobile-app-navigation"
      onClose={onCloseDrawer}
      open={drawerOpen}
      side="left"
      size="sm"
    >
      <div className="flex h-full flex-col">
        <button className="sr-only" onClick={onCloseDrawer} type="button">
          Close navigation menu
        </button>
        <Logo className="mb-8" />
        <SidebarNavigation
          activeHref={activeHref}
          items={items}
          onNavigate={onCloseDrawer}
        />
        <div className="border-border-subtle border-t pt-6.25">
          <LogoutAction
            disabled={isLogoutPending}
            errorTargetId={logoutTriggerId}
            isPending={activeLogoutTriggerId === logoutTriggerId}
            onLogout={() => onLogout(logoutTriggerId)}
          />
        </div>
      </div>
    </Drawer>
  );
}
