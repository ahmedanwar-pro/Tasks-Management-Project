'use client';

import { useId, useRef } from 'react';
import type {
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import { joinClasses } from '../utils';
import { useFocusTrap } from '../use-focus-trap';

type DrawerSide = 'left' | 'right' | 'bottom';
type DrawerSize = 'sm' | 'md' | 'lg' | 'full';

type DrawerProps = {
  open: boolean;
  side?: DrawerSide;
  size?: DrawerSize;
  title?: string;
  description?: string;
  elevated?: boolean;
  showOverlay?: boolean;
  closeOnOverlayClick?: boolean;
  onClose?: () => void;
  className?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, 'children' | 'className' | 'title'>;

const overlayClasses = 'fixed inset-0 z-40 bg-text-primary/40';

const basePanelClasses =
  'fixed z-50 flex flex-col overflow-hidden bg-surface font-sans text-text-primary tracking-normal';

const sideClasses: Record<DrawerSide, string> = {
  left: 'inset-y-0 left-0 rounded-none',
  right: 'inset-y-0 right-0 rounded-none',
  bottom: 'inset-x-0 bottom-0 max-h-[min(660px,calc(100dvh-24px))] rounded-t-md',
};

const sizeClasses: Record<DrawerSide, Record<DrawerSize, string>> = {
  left: {
    sm: 'w-[288px] max-w-[calc(100vw-24px)]',
    md: 'w-[320px] max-w-[calc(100vw-24px)]',
    lg: 'w-[576px] max-w-[calc(100vw-24px)]',
    full: 'w-full',
  },
  right: {
    sm: 'w-[288px] max-w-[calc(100vw-24px)]',
    md: 'w-[320px] max-w-[calc(100vw-24px)]',
    lg: 'w-[576px] max-w-[calc(100vw-24px)]',
    full: 'w-full',
  },
  bottom: {
    sm: 'min-h-[164px]',
    md: 'min-h-[356px]',
    lg: 'min-h-[660px]',
    full: 'h-[calc(100dvh-24px)]',
  },
};

export function Drawer({
  open,
  side = 'right',
  size = 'md',
  title,
  description,
  elevated,
  showOverlay = true,
  closeOnOverlayClick = true,
  onClose,
  className,
  children,
  ...props
}: DrawerProps): ReactElement | null {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLElement>(null);

  useFocusTrap({
    active: open && showOverlay,
    containerRef: panelRef,
    onEscape: onClose,
  });

  if (!open) {
    return null;
  }

  const isElevated = elevated ?? side === 'bottom';
  const overlayCanClose = closeOnOverlayClick && Boolean(onClose);

  return (
    <>
      {showOverlay && overlayCanClose ? (
        <button
          aria-label="Close drawer"
          className={overlayClasses}
          onClick={onClose}
          type="button"
        />
      ) : null}
      {showOverlay && !overlayCanClose ? (
        <div aria-hidden="true" className={overlayClasses} />
      ) : null}
      <aside
        {...props}
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={title ? titleId : undefined}
        aria-modal={showOverlay || undefined}
        aria-label={!title ? props['aria-label'] : undefined}
        className={joinClasses(
          basePanelClasses,
          sideClasses[side],
          sizeClasses[side][size],
          isElevated && 'shadow-modal',
          className,
        )}
        ref={panelRef}
        role="dialog"
        tabIndex={-1}
      >
        {title || description ? (
          <header className="flex shrink-0 flex-col gap-1 border-b border-border px-6 py-5">
            {title ? (
              <h2
                className="text-body-md font-bold leading-relaxed text-text-primary"
                id={titleId}
              >
                {title}
              </h2>
            ) : null}
            {description ? (
              <p
                className="text-body-sm leading-base text-text-secondary"
                id={descriptionId}
              >
                {description}
              </p>
            ) : null}
          </header>
        ) : null}
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </aside>
    </>
  );
}
