import type { ReactElement } from 'react';
import type { AppUser } from '../types';
import { HeaderUser } from './header-user';
import { MobileHeaderBrand } from './mobile-header-brand';

type AppHeaderProps = {
  user: AppUser | null;
  initials?: string;
  isLogoutPending: boolean;
  isUserLoading: boolean;
  menuOpen: boolean;
  sidebarCollapsed: boolean;
  onLogout: () => void;
  onOpenMenu: () => void;
};

export function AppHeader({
  user,
  initials,
  isLogoutPending,
  isUserLoading,
  menuOpen,
  sidebarCollapsed,
  onLogout,
  onOpenMenu,
}: AppHeaderProps): ReactElement {
  return (
    <header
      className={`bg-background fixed top-0 right-0 left-0 z-20 flex h-16 items-center justify-between border-b border-black/10 px-6 transition-[left,padding] ${
        sidebarCollapsed ? 'lg:left-20 lg:px-8' : 'lg:left-64 lg:px-6'
      }`}
    >
      <MobileHeaderBrand menuOpen={menuOpen} onOpenMenu={onOpenMenu} />
      <div aria-hidden="true" className="hidden lg:block" />

      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <HeaderUser
          initials={initials}
          isLoading={isUserLoading}
          isLogoutPending={isLogoutPending}
          onLogout={onLogout}
          user={user}
        />
      </div>
    </header>
  );
}
