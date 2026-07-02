'use client';

import { useEffect, useId, useRef } from 'react';
import type { HTMLAttributes, ReactElement, ReactNode, RefObject } from 'react';
import { joinClasses } from '../utils';
import { useFocusTrap } from '../use-focus-trap';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'responsive-sm';
type ModalPlacement = 'center' | 'bottom' | 'responsive';

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
  initialFocus?: 'container' | 'first-focusable' | 'none';
  overlayClassName?: string;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className' | 'title'>;

const overlayClasses = 'fixed inset-0 z-40 bg-text-primary/40';

const rootClasses: Record<ModalPlacement, string> = {
  center: 'fixed inset-0 z-50 flex items-center justify-center p-4',
  bottom: 'fixed inset-x-0 bottom-0 z-50 flex justify-center',
  responsive:
    'fixed inset-x-0 bottom-0 z-50 flex justify-center md:inset-0 md:items-center md:p-4',
};

const panelBaseClasses =
  'flex max-h-[calc(100dvh-32px)] flex-col overflow-hidden bg-surface font-sans text-text-primary tracking-normal shadow-modal focus:outline-none';

const panelPlacementClasses: Record<ModalPlacement, string> = {
  center: 'rounded-md',
  bottom: 'max-h-[min(660px,calc(100dvh-24px))] rounded-t-md',
  responsive:
    'max-h-[calc(100dvh-24px)] rounded-t-[32px] md:max-h-[calc(100dvh-32px)] md:rounded-md',
};

const sizeClasses: Record<ModalSize, string> = {
  sm: 'w-[calc(100vw-32px)] md:w-[448px]',
  md: 'w-[calc(100vw-32px)] md:w-[576px]',
  lg: 'w-[calc(100vw-32px)] md:w-[672px]',
  xl: 'w-[calc(100vw-32px)] md:w-[896px]',
  'responsive-sm': 'w-full max-w-[448px] md:w-[448px]',
};

function useModalIsolation(
  active: boolean,
  layerRef: RefObject<HTMLDivElement | null>,
): void {
  useEffect(() => {
    const layer = layerRef.current;

    if (!active || !layer) {
      return;
    }

    const isolatedElements = new Map<
      HTMLElement,
      { ariaHidden: string | null; inert: boolean }
    >();
    const previousBodyOverflow = document.body.style.overflow;
    let currentElement: HTMLElement = layer;

    document.body.style.overflow = 'hidden';

    while (currentElement !== document.body) {
      const parent = currentElement.parentElement;

      if (!parent) {
        break;
      }

      for (const sibling of Array.from(parent.children)) {
        if (
          !(sibling instanceof HTMLElement) ||
          sibling === currentElement ||
          sibling.hasAttribute('data-modal-overlay')
        ) {
          continue;
        }

        isolatedElements.set(sibling, {
          ariaHidden: sibling.getAttribute('aria-hidden'),
          inert: sibling.inert,
        });
        sibling.inert = true;
        sibling.setAttribute('aria-hidden', 'true');
      }

      currentElement = parent;
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;

      for (const [element, previousState] of isolatedElements) {
        element.inert = previousState.inert;

        if (previousState.ariaHidden === null) {
          element.removeAttribute('aria-hidden');
        } else {
          element.setAttribute('aria-hidden', previousState.ariaHidden);
        }
      }
    };
  }, [active, layerRef]);
}

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
  initialFocus = 'first-focusable',
  overlayClassName,
  className,
  bodyClassName,
  children,
  ...props
}: ModalProps): ReactElement | null {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useFocusTrap({
    active: open && showOverlay,
    containerRef: panelRef,
    initialFocus,
    onEscape: onClose,
  });
  useModalIsolation(open && showOverlay, layerRef);

  if (!open) {
    return null;
  }

  const overlayCanClose = closeOnOverlayClick && Boolean(onClose);

  return (
    <>
      {showOverlay && overlayCanClose ? (
        <button
          aria-label="Close modal"
          className={joinClasses(overlayClasses, overlayClassName)}
          data-modal-overlay=""
          onClick={onClose}
          type="button"
        />
      ) : null}
      {showOverlay && !overlayCanClose ? (
        <div
          aria-hidden="true"
          className={joinClasses(overlayClasses, overlayClassName)}
          data-modal-overlay=""
        />
      ) : null}
      <div className={rootClasses[placement]} ref={layerRef}>
        <div
          {...props}
          aria-describedby={
            description ? descriptionId : props['aria-describedby']
          }
          aria-labelledby={title ? titleId : props['aria-labelledby']}
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
            <header className="flex shrink-0 flex-col gap-2 px-6 pt-6 pb-4">
              {title ? (
                <h2
                  className="text-body-md text-text-primary md:text-title-md md:leading-title leading-relaxed font-bold"
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
            <footer className="border-border flex shrink-0 flex-col-reverse gap-3 border-t px-6 py-5 md:flex-row md:justify-end">
              {footer}
            </footer>
          ) : null}
        </div>
      </div>
    </>
  );
}
