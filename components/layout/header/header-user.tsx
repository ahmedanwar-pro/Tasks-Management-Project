import type { ReactElement } from 'react';
import { Skeleton } from '@/components/ui';
import type { AppUser } from '../types';
import { HeaderUserMenu } from './header-user-menu';

type HeaderUserProps = {
  user: AppUser | null;
  initials?: string;
  isLoading: boolean;
  isLogoutPending: boolean;
  onLogout: () => void;
};

function HeaderUserLoadingState(): ReactElement {
  return (
    <>
      <div
        aria-label="Loading user details"
        className="hidden flex-col items-end gap-1 sm:flex"
        role="status"
      >
        <Skeleton className="w-26.25" size="sm" />
        <Skeleton className="h-[10px] w-30" size="xs" />
      </div>
      <Skeleton className="size-10 lg:rounded-md" size="md" variant="avatar" />
    </>
  );
}

export function HeaderUser({
  user,
  initials,
  isLoading,
  isLogoutPending,
  onLogout,
}: HeaderUserProps): ReactElement {
  const displayName = user?.name ?? 'User';

  if (isLoading) {
    return <HeaderUserLoadingState />;
  }

  return (
    <>
      <div className="hidden min-w-0 flex-col items-end sm:flex">
        <span className="text-body-sm text-text-primary leading-base max-w-44 truncate font-semibold">
          {displayName}
        </span>
        {user?.jobTitle ? (
          <span className="text-label-sm leading-compact tracking-label text-primary max-w-44 truncate uppercase">
            {user.jobTitle}
          </span>
        ) : null}
      </div>
      <HeaderUserMenu
        displayName={displayName}
        initials={initials}
        isLogoutPending={isLogoutPending}
        onLogout={onLogout}
      />
    </>
  );
}
