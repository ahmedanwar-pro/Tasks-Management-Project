import type { ReactElement, SVGAttributes } from 'react';
import { joinClasses } from '@/components/ui/utils';

type IconProps = {
  className?: string;
} & Omit<
  SVGAttributes<SVGSVGElement>,
  'children' | 'className' | 'height' | 'role' | 'viewBox' | 'width'
>;

export function InviteMemberIcon({
  className,
  ...props
}: IconProps): ReactElement {
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
      <path d="M16 19v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <path d="M9.5 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M19 8v6" />
      <path d="M22 11h-6" />
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
      <circle cx="2" cy="2" r="2" />
      <circle cx="2" cy="8" r="2" />
      <circle cx="2" cy="14" r="2" />
    </svg>
  );
}

export function MembersErrorIcon({
  className,
  ...props
}: IconProps): ReactElement {
  return (
    <svg
      {...props}
      aria-hidden="true"
      className={joinClasses('size-7 shrink-0', className)}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 2l20 20" />
      <path d="M12 5a7 7 0 0 1 7 7v1.5" />
      <path d="M5 12a7 7 0 0 1 7-7" />
      <path d="M8.25 18h7.5" />
      <path d="M4 18h16" />
    </svg>
  );
}
