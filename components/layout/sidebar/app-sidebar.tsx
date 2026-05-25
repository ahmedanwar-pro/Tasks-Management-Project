import type { ReactElement } from 'react';
import { DesktopSidebar } from './desktop-sidebar';
import { MobileBottomNavigation } from './mobile-bottom-navigation';
import { MobileSidebarDrawer } from './mobile-sidebar-drawer';

type AppSidebarProps = {
  activeHref: string;
  collapsed: boolean;
  drawerOpen: boolean;
  isLogoutPending: boolean;
  logoutError: Error | null;
  onCloseDrawer: () => void;
  onLogout: () => void;
  onToggleCollapsed: () => void;
};

export function AppSidebar({
  activeHref,
  collapsed,
  drawerOpen,
  isLogoutPending,
  logoutError,
  onCloseDrawer,
  onLogout,
  onToggleCollapsed,
}: AppSidebarProps): ReactElement {
  return (
    <>
      <DesktopSidebar
        activeHref={activeHref}
        collapsed={collapsed}
        isLogoutPending={isLogoutPending}
        logoutError={logoutError}
        onLogout={onLogout}
        onToggleCollapsed={onToggleCollapsed}
      />
      <MobileSidebarDrawer
        activeHref={activeHref}
        drawerOpen={drawerOpen}
        isLogoutPending={isLogoutPending}
        logoutError={logoutError}
        onCloseDrawer={onCloseDrawer}
        onLogout={onLogout}
      />
      <MobileBottomNavigation activeHref={activeHref} />
    </>
  );
}
