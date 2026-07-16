'use client';

import type { ReactElement } from 'react';
import { useLogoutFlow } from './logout-flow-context';

export function LogoutInteractionOverlay(): ReactElement | null {
  const { isLogoutPending } = useLogoutFlow();

  if (!isLogoutPending) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="bg-background/40 fixed inset-0 z-[80] cursor-wait backdrop-blur-sm"
      role="presentation"
    />
  );
}
