'use client';

import { useRef } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useFocusTrap } from '@/components/ui/use-focus-trap';
import { joinClasses } from '@/components/ui/utils';
import { closeEpicDetailsModal } from '../header/epic-details-modal-close';

type EpicDetailsModalShellProps = {
  label?: string;
  children: ReactNode;
  closeOnOutsideClick?: boolean;
  initialFocus?: 'container' | 'first-focusable' | 'none';
  onClose?: () => void;
  projectId?: string;
};

export function EpicDetailsModalShell({
  label,
  children,
  closeOnOutsideClick = false,
  initialFocus = 'first-focusable',
  onClose,
  projectId,
}: EpicDetailsModalShellProps): ReactElement {
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  function handleClose(): void {
    if (onClose) {
      onClose();
      return;
    }

    if (projectId) {
      closeEpicDetailsModal(projectId, router.replace);
    }
  }

  useFocusTrap({
    active: true,
    containerRef: panelRef,
    initialFocus,
    onEscape: handleClose,
  });

  return (
    <div className="bg-text-primary/40 md:bg-text-primary/20 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-[2px] md:p-8">
      {closeOnOutsideClick ? (
        <button
          aria-label="Close modal"
          className="absolute inset-0"
          onClick={handleClose}
          type="button"
        />
      ) : null}
      <div
        aria-label={label}
        aria-labelledby={label ? undefined : 'epic-details-modal-title'}
        aria-modal="true"
        className={joinClasses(
          'bg-surface text-text-primary shadow-modal flex w-full max-w-md flex-col overflow-hidden rounded-md font-sans tracking-normal outline-none',
          'max-h-[min(795px,calc(100dvh-32px))] md:max-h-[min(921px,calc(100dvh-64px))] md:max-w-2xl',
        )}
        ref={panelRef}
        role="dialog"
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
}
