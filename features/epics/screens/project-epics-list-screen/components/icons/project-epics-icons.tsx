import type { ReactElement, SVGAttributes } from 'react';
import { joinClasses } from '@/components/ui/utils';

type IconProps = {
  className?: string;
} & Omit<
  SVGAttributes<SVGSVGElement>,
  'children' | 'className' | 'height' | 'role' | 'viewBox' | 'width'
>;

export function SearchIcon({ className, ...props }: IconProps): ReactElement {
  return (
    <svg
      {...props}
      aria-hidden="true"
      className={joinClasses('size-icon-sm shrink-0', className)}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export function PlusIcon({ className, ...props }: IconProps): ReactElement {
  return (
    <svg
      {...props}
      aria-hidden="true"
      className={joinClasses('size-icon-sm shrink-0', className)}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function MoreActionsIcon({
  className,
  ...props
}: IconProps): ReactElement {
  return (
    <svg
      {...props}
      aria-hidden="true"
      className={joinClasses('size-4 shrink-0', className)}
      fill="currentColor"
      focusable="false"
      viewBox="0 0 4 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="2" cy="2" r="1.5" />
      <circle cx="2" cy="8" r="1.5" />
      <circle cx="2" cy="14" r="1.5" />
    </svg>
  );
}

export function MoreActionsHorizontalIcon({
  className,
  ...props
}: IconProps): ReactElement {
  return (
    <svg
      {...props}
      aria-hidden="true"
      className={joinClasses('h-1 w-4 shrink-0', className)}
      fill="currentColor"
      focusable="false"
      viewBox="0 0 16 4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="2" cy="2" r="1.5" />
      <circle cx="8" cy="2" r="1.5" />
      <circle cx="14" cy="2" r="1.5" />
    </svg>
  );
}

export function CreatedByIcon({
  className,
  ...props
}: IconProps): ReactElement {
  return (
    <svg
      {...props}
      aria-hidden="true"
      className={joinClasses('size-3 shrink-0', className)}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="M3 20a6.5 6.5 0 0 1 10.5-5.1" />
      <path d="m14 18 2 2 5-6" />
    </svg>
  );
}

export function CalendarIcon({
  className,
  ...props
}: IconProps): ReactElement {
  return (
    <svg
      {...props}
      aria-hidden="true"
      className={joinClasses('size-3 shrink-0', className)}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 5h12a2 2 0 0 1 2 2v13H4V7a2 2 0 0 1 2-2Z" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M4 10h16" />
    </svg>
  );
}

export function ChevronIcon({
  className,
  direction = 'right',
  ...props
}: IconProps & { direction?: 'left' | 'right' }): ReactElement {
  return (
    <svg
      {...props}
      aria-hidden="true"
      className={joinClasses(
        'h-[7px] w-[4.5px] shrink-0',
        direction === 'left' && 'rotate-180',
        className,
      )}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 6 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m1 1 4 4-4 4" />
    </svg>
  );
}
