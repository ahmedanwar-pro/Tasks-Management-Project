'use client';

import { useId, useRef } from 'react';
import type {
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import { joinClasses } from '../utils';
import { useFocusTrap } from '../use-focus-trap';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';
type ModalPlacement = 'center' | 'bottom';

type ModalProps = {
  open: boolean;
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  placement?: ModalPlacement;
  showOverlay?: boolean;
  closeOnOverlayClick?: boolean;
  onClose?: () => void;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className' | 'title'>;

const overlayClasses = 'fixed inset-0 z-40 bg-text-primary/40';

const rootClasses: Record<ModalPlacement, string> = {
  center: 'fixed inset-0 z-50 flex items-center justify-center p-4',
  bottom: 'fixed inset-x-0 bottom-0 z-50 flex justify-center',
};

const panelBaseClasses =
  'flex max-h-[calc(100dvh-32px)] flex-col overflow-hidden bg-surface font-sans text-text-primary tracking-normal shadow-modal';

const panelPlacementClasses: Record<ModalPlacement, string> = {
  center: 'rounded-md',
  bottom: 'max-h-[min(660px,calc(100dvh-24px))] rounded-t-md',
};

const sizeClasses: Record<ModalSize, string> = {
  sm: 'w-[calc(100vw-32px)] md:w-[448px]',
  md: 'w-[calc(100vw-32px)] md:w-[576px]',
  lg: 'w-[calc(100vw-32px)] md:w-[672px]',
  xl: 'w-[calc(100vw-32px)] md:w-[896px]',
};

export function Modal({
  open,
  title,
  description,
  footer,
  size = 'sm',
  placement = 'center',
  showOverlay = true,
  closeOnOverlayClick = true,
  onClose,
  className,
  bodyClassName,
  children,
  ...props
}: ModalProps): ReactElement | null {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap({
    active: open && showOverlay,
    containerRef: panelRef,
    onEscape: onClose,
  });

  if (!open) {
    return null;
  }

  const overlayCanClose = closeOnOverlayClick && Boolean(onClose);

  return (
    <>
      {showOverlay && overlayCanClose ? (
        <button
          aria-label="Close modal"
          className={overlayClasses}
          onClick={onClose}
          type="button"
        />
      ) : null}
      {showOverlay && !overlayCanClose ? (
        <div aria-hidden="true" className={overlayClasses} />
      ) : null}
      <div className={rootClasses[placement]}>
        <div
          {...props}
          aria-describedby={description ? descriptionId : undefined}
          aria-labelledby={title ? titleId : undefined}
          aria-modal={showOverlay || undefined}
          className={joinClasses(
            panelBaseClasses,
            panelPlacementClasses[placement],
            sizeClasses[size],
            className,
          )}
          ref={panelRef}
          role="dialog"
          tabIndex={-1}
        >
          {title || description ? (
            <header className="flex shrink-0 flex-col gap-2 px-6 pb-4 pt-6">
              {title ? (
                <h2
                  className="text-body-md font-bold leading-relaxed text-text-primary md:text-title-md md:leading-title"
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
          <div
            className={joinClasses(
              'min-h-0 flex-1 overflow-y-auto px-6 py-4',
              bodyClassName,
            )}
          >
            {children}
          </div>
          {footer ? (
            <footer className="flex shrink-0 flex-col-reverse gap-3 border-t border-border px-6 py-5 md:flex-row md:justify-end">
              {footer}
            </footer>
          ) : null}
        </div>
      </div>
    </>
  );
}
