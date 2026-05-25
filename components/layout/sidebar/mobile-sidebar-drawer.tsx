import type { ReactElement } from 'react';
import { Drawer, Logo } from '@/components/ui';
import { LogoutAction, LogoutError } from './logout-action';
import { SidebarNavigation } from './sidebar-navigation';

type MobileSidebarDrawerProps = {
  activeHref: string;
  drawerOpen: boolean;
  isLogoutPending: boolean;
  logoutError: Error | null;
  onCloseDrawer: () => void;
  onLogout: () => void;
};

export function MobileSidebarDrawer({
  activeHref,
  drawerOpen,
  isLogoutPending,
  logoutError,
  onCloseDrawer,
  onLogout,
}: MobileSidebarDrawerProps): ReactElement {
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
        <SidebarNavigation activeHref={activeHref} onNavigate={onCloseDrawer} />
        <div className="border-border-subtle border-t pt-6.25">
          <LogoutAction isPending={isLogoutPending} onLogout={onLogout} />
          {logoutError ? <LogoutError /> : null}
        </div>
      </div>
    </Drawer>
  );
}
