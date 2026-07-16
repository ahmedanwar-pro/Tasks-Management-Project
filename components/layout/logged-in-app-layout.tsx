'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { ProjectsListPendingFallback } from '@/features/projects/screens/projects-list-screen/components/projects-list-pending-fallback';
import { AppHeader } from './header/app-header';
import { useCurrentUser } from './hooks/use-current-user';
import { useLogoutMutation } from './hooks/use-logout-mutation';
import { AppSidebar } from './sidebar/app-sidebar';
import { getActiveNavigationHref } from './sidebar/get-active-navigation-href';
import {
  getNavigationItems,
  getProjectIdFromPathname,
} from './sidebar/navigation-items';
import { getUserInitials } from './utils/get-user-initials';

type LoggedInAppLayoutProps = {
  children: ReactNode;
};

export function LoggedInAppLayout({
  children,
}: LoggedInAppLayoutProps): ReactElement {
  const pathname = usePathname();
  const router = useRouter();
  const projectId = getProjectIdFromPathname(pathname);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: user, isPending } = useCurrentUser();
  const {
    error: logoutError,
    isPending: isLogoutPending,
    mutate: logout,
    reset: resetLogout,
  } = useLogoutMutation();
  const isUnauthorized = !isPending && !user;
  const initials = user ? getUserInitials(user.name) : undefined;

  useEffect(() => {
    if (isUnauthorized) {
      router.replace('/login');
    }
  }, [isUnauthorized, router]);

  function handleLogout() {
    resetLogout();
    logout();
  }

  function renderMainContent(): ReactNode {
    if (user) {
      return children;
    }

    if (isPending && pathname === '/projects') {
      return <ProjectsListPendingFallback />;
    }

    return null;
  }

  return (
    <div className="bg-background text-text-primary min-h-dvh font-sans">
      <AppHeader
        initials={initials}
        isLogoutPending={isLogoutPending}
        isUserLoading={isPending || isUnauthorized}
        menuOpen={drawerOpen}
        onLogout={handleLogout}
        onOpenMenu={() => setDrawerOpen(true)}
        sidebarCollapsed={sidebarCollapsed}
        user={user ?? null}
      />
      <AppSidebar
        activeHref={getActiveNavigationHref(pathname)}
        collapsed={sidebarCollapsed}
        drawerOpen={drawerOpen}
        isLogoutPending={isLogoutPending}
        items={getNavigationItems(projectId)}
        logoutError={logoutError}
        onCloseDrawer={() => setDrawerOpen(false)}
        onLogout={handleLogout}
        onToggleCollapsed={() => setSidebarCollapsed((collapsed) => !collapsed)}
      />
      <main
        className={`min-h-dvh pt-16 pb-16 transition-[padding] sm:pb-0 lg:pb-0 ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {renderMainContent()}
      </main>
    </div>
  );
}
