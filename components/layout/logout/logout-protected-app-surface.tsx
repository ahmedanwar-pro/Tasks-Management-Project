'use client';

import type { ReactElement, ReactNode } from 'react';
import { useLogoutFlow } from './logout-flow-context';

type LogoutProtectedAppSurfaceProps = {
  children: ReactNode;
};

export function LogoutProtectedAppSurface({
  children,
}: LogoutProtectedAppSurfaceProps): ReactElement {
  const { isLogoutPending } = useLogoutFlow();

  return (
    <div aria-hidden={isLogoutPending || undefined} inert={isLogoutPending}>
      {children}
    </div>
  );
}
