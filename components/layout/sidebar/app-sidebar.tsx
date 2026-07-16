import type { ReactElement } from 'react';
import { DesktopSidebar } from './desktop-sidebar';
import { MobileBottomNavigation } from './mobile-bottom-navigation';
import { MobileSidebarDrawer } from './mobile-sidebar-drawer';
import type { LogoutTriggerId } from '../logout';
import type { AppNavigationItem } from './navigation-items';

type AppSidebarProps = {
  activeHref: string;
  activeLogoutTriggerId: LogoutTriggerId | null;
  collapsed: boolean;
  drawerOpen: boolean;
  isLogoutPending: boolean;
  items: AppNavigationItem[];
  onCloseDrawer: () => void;
  onLogout: (triggerId: LogoutTriggerId) => void;
  onToggleCollapsed: () => void;
};

export function AppSidebar({
  activeHref,
  activeLogoutTriggerId,
  collapsed,
  drawerOpen,
  isLogoutPending,
  items,
  onCloseDrawer,
  onLogout,
  onToggleCollapsed,
}: AppSidebarProps): ReactElement {
  return (
    <>
      <DesktopSidebar
        activeHref={activeHref}
        activeLogoutTriggerId={activeLogoutTriggerId}
        collapsed={collapsed}
        isLogoutPending={isLogoutPending}
        items={items}
        onLogout={onLogout}
        onToggleCollapsed={onToggleCollapsed}
      />
      <MobileSidebarDrawer
        activeHref={activeHref}
        activeLogoutTriggerId={activeLogoutTriggerId}
        drawerOpen={drawerOpen}
        isLogoutPending={isLogoutPending}
        items={items}
        onCloseDrawer={onCloseDrawer}
        onLogout={onLogout}
      />
      <MobileBottomNavigation activeHref={activeHref} items={items} />
    </>
  );
}
