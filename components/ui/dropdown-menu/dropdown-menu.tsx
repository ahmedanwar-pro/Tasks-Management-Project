'use client';

import type {
  ButtonHTMLAttributes,
  KeyboardEvent,
  ReactElement,
  ReactNode,
} from 'react';
import { useId, useRef } from 'react';
import { joinClasses } from '../utils';

type DropdownMenuVariant = 'default' | 'muted' | 'filled' | 'ghost';
type DropdownMenuSize = 'sm' | 'md' | 'lg' | 'full';
type DropdownMenuAlign = 'start' | 'end';
type DropdownMenuContentWidth = 'trigger' | 'sm' | 'md' | 'lg';

type DropdownMenuProps = {
  open: boolean;
  label: ReactNode;
  children: ReactNode;
  variant?: DropdownMenuVariant;
  size?: DropdownMenuSize;
  align?: DropdownMenuAlign;
  contentWidth?: DropdownMenuContentWidth;
  iconRight?: ReactNode;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className' | 'disabled' | 'onClick'
>;

const rootClasses = 'relative inline-block text-left font-sans';

const triggerBaseClasses =
  'inline-flex shrink-0 items-center justify-between gap-2 whitespace-nowrap border border-transparent font-sans text-text-primary tracking-normal transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60';

const triggerVariantClasses: Record<DropdownMenuVariant, string> = {
  default: 'rounded-xs bg-surface shadow-card hover:bg-surface-low',
  muted: 'rounded-md bg-surface-low shadow-card hover:bg-surface-muted',
  filled: 'rounded-sm bg-primary-container-muted hover:bg-surface-highest',
  ghost: 'rounded-sm bg-transparent hover:bg-surface-low',
};

const triggerSizeClasses: Record<DropdownMenuSize, string> = {
  sm: 'h-[var(--control-height-sm)] min-w-[136px] px-4 text-body-sm leading-base',
  md: 'h-[var(--control-height-lg)] min-w-[204px] px-4 text-body-sm leading-base',
  lg: 'h-[var(--control-height-xl)] min-w-[342px] px-4 text-body-md leading-relaxed',
  full: 'h-[var(--control-height-xl)] w-full px-4 text-body-md leading-relaxed',
};

const contentBaseClasses =
  'absolute top-full z-50 mt-2 overflow-hidden rounded-md border border-border-inverse bg-surface p-2 text-body-sm leading-base text-text-primary shadow-modal';

const contentAlignClasses: Record<DropdownMenuAlign, string> = {
  start: 'left-0',
  end: 'right-0',
};

const contentWidthClasses: Record<DropdownMenuContentWidth, string> = {
  trigger: 'min-w-full',
  sm: 'w-[204px]',
  md: 'w-[320px]',
  lg: 'w-[358px]',
};

const menuItemSelector = [
  '[role="menuitem"]',
  '[role="menuitemcheckbox"]',
  '[role="menuitemradio"]',
  'button:not([disabled])',
  'a[href]',
].join(',');

function getMenuItems(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(menuItemSelector))
    .filter((element) => !element.hasAttribute('disabled') && element.tabIndex >= 0);
}

export function DropdownMenu({
  open,
  label,
  children,
  variant = 'default',
  size = 'md',
  align = 'start',
  contentWidth = 'trigger',
  iconRight,
  disabled = false,
  onOpenChange,
  className,
  triggerClassName,
  contentClassName,
  ...props
}: DropdownMenuProps): ReactElement {
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  function focusMenuItem(position: 'first' | 'last'): void {
    window.requestAnimationFrame(() => {
      const menuItems = contentRef.current
        ? getMenuItems(contentRef.current)
        : [];
      const item = position === 'first'
        ? menuItems[0]
        : menuItems[menuItems.length - 1];

      item?.focus();
    });
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>): void {
    props.onKeyDown?.(event);

    if (event.defaultPrevented || disabled) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      onOpenChange?.(true);
      focusMenuItem('first');
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      onOpenChange?.(true);
      focusMenuItem('last');
    }
  }

  function handleContentKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      onOpenChange?.(false);
      triggerRef.current?.focus();
      return;
    }

    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return;
    }

    const menuItems = contentRef.current
      ? getMenuItems(contentRef.current)
      : [];

    if (menuItems.length === 0) {
      return;
    }

    event.preventDefault();

    const currentIndex = menuItems.indexOf(document.activeElement as HTMLElement);
    const offset = event.key === 'ArrowDown' ? 1 : -1;
    const nextIndex = currentIndex === -1
      ? 0
      : (currentIndex + offset + menuItems.length) % menuItems.length;

    menuItems[nextIndex].focus();
  }

  return (
    <div className={joinClasses(rootClasses, size === 'full' && 'w-full', className)}>
      <button
        {...props}
        aria-controls={open ? menuId : undefined}
        aria-expanded={open}
        aria-haspopup="menu"
        className={joinClasses(
          triggerBaseClasses,
          triggerVariantClasses[variant],
          triggerSizeClasses[size],
          triggerClassName,
        )}
        disabled={disabled}
        onClick={() => onOpenChange?.(!open)}
        onKeyDown={handleTriggerKeyDown}
        ref={triggerRef}
        type="button"
      >
        <span className="truncate">{label}</span>
        {iconRight ? (
          <span
            aria-hidden="true"
            className="inline-flex size-icon-sm shrink-0 items-center justify-center [&>svg]:size-icon-sm"
          >
            {iconRight}
          </span>
        ) : null}
      </button>
      {open ? (
        <div
          className={joinClasses(
            contentBaseClasses,
            contentAlignClasses[align],
            contentWidthClasses[contentWidth],
            contentClassName,
          )}
          id={menuId}
          onKeyDown={handleContentKeyDown}
          ref={contentRef}
          role="menu"
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
