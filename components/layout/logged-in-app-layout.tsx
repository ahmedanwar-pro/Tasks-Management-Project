'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { ProjectsListPendingFallback } from '@/features/projects/screens/projects-list-screen/components/projects-list-pending-fallback';
import { AppHeader } from './header/app-header';
import { useCurrentUser } from './hooks/use-current-user';
import {
  LogoutErrorFallback,
  LogoutFlowProvider,
  LogoutInteractionOverlay,
  LogoutPendingLayer,
  LogoutProtectedAppSurface,
  useLogoutFlow,
  type LogoutTriggerId,
} from './logout';
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
  return (
    <LogoutFlowProvider>
      <LoggedInAppLayoutContent>{children}</LoggedInAppLayoutContent>
    </LogoutFlowProvider>
  );
}

function LoggedInAppLayoutContent({
  children,
}: LoggedInAppLayoutProps): ReactElement {
  const pathname = usePathname();
  const router = useRouter();
  const projectId = getProjectIdFromPathname(pathname);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: user, isPending } = useCurrentUser();
  const [logoutUserSnapshot, setLogoutUserSnapshot] =
    useState<typeof user>(null);
  const { activeLogoutTriggerId, isLogoutPending, logout } = useLogoutFlow();
  const isUnauthorized = !isPending && !user;
  const isLogoutRedirectPending = isUnauthorized && isLogoutPending;
  const displayUser =
    user ?? (isLogoutRedirectPending ? logoutUserSnapshot : null);
  const initials = user ? getUserInitials(user.name) : undefined;

  useEffect(() => {
    if (isUnauthorized) {
      router.replace('/login');
    }
  }, [isUnauthorized, router]);

  function handleLogout(triggerId: LogoutTriggerId) {
    setLogoutUserSnapshot(user);
    logout(triggerId);
  }

  function renderMainContent(): ReactNode {
    if (user || isLogoutRedirectPending) {
      return children;
    }

    if (isPending && pathname === '/projects') {
      return <ProjectsListPendingFallback />;
    }

    return null;
  }

  if (isUnauthorized && !isLogoutRedirectPending) {
    return (
      <div className="bg-background text-text-primary min-h-dvh font-sans">
        <LogoutInteractionOverlay />
        <LogoutPendingLayer />
        <LogoutErrorFallback sidebarCollapsed={sidebarCollapsed} />
      </div>
    );
  }

  return (
    <div className="bg-background text-text-primary min-h-dvh font-sans">
      <LogoutProtectedAppSurface>
        <AppHeader
          activeLogoutTriggerId={activeLogoutTriggerId}
          initials={displayUser ? getUserInitials(displayUser.name) : initials}
          isLogoutPending={isLogoutPending}
          isUserLoading={
            isPending || (isUnauthorized && !isLogoutRedirectPending)
          }
          menuOpen={drawerOpen}
          onLogout={handleLogout}
          onOpenMenu={() => setDrawerOpen(true)}
          sidebarCollapsed={sidebarCollapsed}
          user={displayUser}
        />
        <AppSidebar
          activeHref={getActiveNavigationHref(pathname)}
          activeLogoutTriggerId={activeLogoutTriggerId}
          collapsed={sidebarCollapsed}
          drawerOpen={drawerOpen}
          isLogoutPending={isLogoutPending}
          items={getNavigationItems(projectId)}
          onCloseDrawer={() => setDrawerOpen(false)}
          onLogout={handleLogout}
          onToggleCollapsed={() =>
            setSidebarCollapsed((collapsed) => !collapsed)
          }
        />
        <main
          className={`min-h-dvh pt-16 pb-16 transition-[padding] sm:pb-0 lg:pb-0 ${
            sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
          }`}
        >
          {renderMainContent()}
        </main>
      </LogoutProtectedAppSurface>
      <LogoutInteractionOverlay />
      <LogoutPendingLayer />
      <LogoutErrorFallback sidebarCollapsed={sidebarCollapsed} />
    </div>
  );
}
