import type { ReactElement } from 'react';
import { FormError } from '@/components/ui';
import { joinClasses } from '@/components/ui/utils';
import { LayoutIcon } from '../layout-icons';

type LogoutActionProps = {
  collapsed?: boolean;
  isPending: boolean;
  onLogout: () => void;
  presentation?: 'sidebar' | 'menu';
};

export function LogoutAction({
  collapsed = false,
  isPending,
  onLogout,
  presentation = 'sidebar',
}: LogoutActionProps): ReactElement {
  const menuItem = presentation === 'menu';

  return (
    <button
      aria-busy={isPending || undefined}
      aria-label={
        collapsed ? (isPending ? 'Logging out' : 'Logout') : undefined
      }
      className={joinClasses(
        'focus-visible:outline-primary text-danger text-body-sm leading-base flex items-center rounded-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60',
        menuItem && 'transition-colors hover:bg-surface-muted',
        collapsed ? 'size-12 justify-center' : 'h-10 w-full gap-3 px-3',
      )}
      disabled={isPending}
      onClick={onLogout}
      role={menuItem ? 'menuitem' : undefined}
      title={collapsed ? (isPending ? 'Logging out...' : 'Logout') : undefined}
      type="button"
    >
      <LayoutIcon className="size-[18px]" name="logout" />
      {collapsed ? null : (
        <span>{isPending ? 'Logging out...' : 'Logout'}</span>
      )}
    </button>
  );
}

export function LogoutError(): ReactElement {
  return (
    <FormError
      className="text-label-md mt-2 px-3 py-2 leading-tight"
      message="Unable to log out. Please try again."
    />
  );
}
