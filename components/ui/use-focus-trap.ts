'use client';

import { useEffect } from 'react';
import type { RefObject } from 'react';

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelector),
  ).filter(
    (element) => !element.hasAttribute('disabled') && element.tabIndex >= 0,
  );
}

type UseFocusTrapOptions = {
  active: boolean;
  containerRef: RefObject<HTMLElement | null>;
  initialFocus?: 'container' | 'first-focusable' | 'none';
  onEscape?: () => void;
};

export function useFocusTrap({
  active,
  containerRef,
  initialFocus = 'first-focusable',
  onEscape,
}: UseFocusTrapOptions): void {
  useEffect(() => {
    if (!active) {
      return;
    }

    const container = containerRef.current;

    if (!container) {
      return;
    }

    const trapContainer = container;
    const previouslyFocused = document.activeElement;
    const focusContainer = window.requestAnimationFrame(() => {
      if (initialFocus === 'none') {
        return;
      }

      if (initialFocus === 'container') {
        trapContainer.focus({ preventScroll: true });
        return;
      }

      const focusableElements = getFocusableElements(trapContainer);
      const firstElement = focusableElements[0] ?? trapContainer;

      firstElement.focus({ preventScroll: true });
    });

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();

        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }

        onEscape?.();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = getFocusableElements(trapContainer);

      if (focusableElements.length === 0) {
        event.preventDefault();
        trapContainer.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusContainer);
      document.removeEventListener('keydown', handleKeyDown);

      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [active, containerRef, initialFocus, onEscape]);
}
