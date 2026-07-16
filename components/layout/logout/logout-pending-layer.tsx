'use client';

import { useEffect, useRef, type ReactElement } from 'react';
import { Spinner } from '@/components/ui';
import { useLogoutFlow } from './logout-flow-context';

export function LogoutPendingLayer(): ReactElement | null {
  const { isLogoutPending } = useLogoutFlow();
  const pendingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLogoutPending) {
      return;
    }

    window.requestAnimationFrame(() => {
      pendingRef.current?.focus({ preventScroll: true });
    });
  }, [isLogoutPending]);

  if (!isLogoutPending) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      className="fixed inset-0 z-[90] flex items-center justify-center px-4"
      ref={pendingRef}
      role="status"
      tabIndex={-1}
    >
      <div className="border-border bg-surface text-text-primary shadow-modal flex w-full max-w-sm flex-col items-center rounded-xl border px-8 py-7 text-center">
        <Spinner
          className="text-primary mb-5 size-(--control-height-2xl) [border-width:3px]"
        />
        <p className="text-headline-md leading-section font-semibold tracking-normal">
          Logging out...
        </p>
        <p className="text-body-md leading-relaxed text-text-secondary mt-3">
          Please wait while we securely sign you out.
        </p>
        <div
          aria-hidden="true"
          className="from-primary/0 via-primary/60 to-primary/0 mt-6 h-px w-28 rounded-full bg-gradient-to-r"
        />
      </div>
    </div>
  );
}
