'use client';

import { useEffect, type ReactElement } from 'react';
import { FormError } from '@/components/ui';
import { joinClasses } from '@/components/ui/utils';
import {
  logoutRetryErrorMessage,
  useLogoutFlow,
  type LogoutTriggerId,
} from '../logout';
import { LayoutIcon } from '../layout-icons';

type LogoutActionProps = {
  collapsed?: boolean;
  disabled?: boolean;
  errorTargetId?: LogoutTriggerId;
  isPending: boolean;
  onLogout: () => void;
  presentation?: 'sidebar' | 'menu';
  showInlineError?: boolean;
};

export function LogoutAction({
  collapsed = false,
  disabled = false,
  errorTargetId,
  isPending,
  onLogout,
  presentation = 'sidebar',
  showInlineError = false,
}: LogoutActionProps): ReactElement {
  const menuItem = presentation === 'menu';
  const { registerLogoutErrorTarget, shouldShowLogoutError } = useLogoutFlow();
  const canShowInlineError = Boolean(errorTargetId && showInlineError);
  const showError = Boolean(
    errorTargetId && canShowInlineError && shouldShowLogoutError(errorTargetId),
  );

  useEffect(() => {
    if (!errorTargetId || !canShowInlineError) {
      return;
    }

    return registerLogoutErrorTarget(errorTargetId);
  }, [canShowInlineError, errorTargetId, registerLogoutErrorTarget]);

  return (
    <>
      <button
        aria-busy={isPending || undefined}
        aria-label={
          collapsed ? (isPending ? 'Logging out' : 'Logout') : undefined
        }
        className={joinClasses(
          'focus-visible:outline-primary text-danger text-body-sm leading-base flex items-center rounded-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60',
          menuItem && 'hover:bg-surface-muted transition-colors',
          collapsed ? 'size-12 justify-center' : 'h-10 w-full gap-3 px-3',
        )}
        disabled={disabled || isPending}
        onClick={onLogout}
        role={menuItem ? 'menuitem' : undefined}
        title={
          collapsed ? (isPending ? 'Logging out...' : 'Logout') : undefined
        }
        type="button"
      >
        <LayoutIcon className="size-[18px]" name="logout" />
        {collapsed ? null : (
          <span>{isPending ? 'Logging out...' : 'Logout'}</span>
        )}
      </button>
      {showError ? <LogoutError /> : null}
    </>
  );
}

export function LogoutError(): ReactElement {
  return (
    <FormError
      className="text-label-md mt-2 px-3 py-2 leading-tight"
      message={logoutRetryErrorMessage}
    />
  );
}
