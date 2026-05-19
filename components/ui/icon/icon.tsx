import type { SVGAttributes, ReactElement } from 'react';
import { joinClasses } from '../utils';

type IconName =
  | 'architecture'
  | 'dashboard'
  | 'description'
  | 'event'
  | 'groups'
  | 'hub'
  | 'inventory'
  | 'mail'
  | 'monitoring'
  | 'rocket'
  | 'settings'
  | 'shield';

type IconSize = 'sm' | 'md' | 'lg';

type IconProps = {
  name: IconName;
  size?: IconSize;
  title?: string;
  className?: string;
} & Omit<
  SVGAttributes<SVGSVGElement>,
  'children' | 'className' | 'height' | 'role' | 'viewBox' | 'width'
>;

const sizeClasses: Record<IconSize, string> = {
  sm: 'size-icon-sm',
  md: 'size-icon-md',
  lg: 'size-icon-lg',
};

const iconPaths: Record<IconName, ReactElement> = {
  architecture: (
    <>
      <path d="M12 3v18" />
      <path d="M7 8h10" />
      <path d="M7 16h10" />
      <path d="M5 6h4v4H5z" />
      <path d="M15 14h4v4h-4z" />
    </>
  ),
  dashboard: (
    <>
      <path d="M4 5h7v7H4z" />
      <path d="M13 5h7v5h-7z" />
      <path d="M13 12h7v7h-7z" />
      <path d="M4 14h7v5H4z" />
    </>
  ),
  description: (
    <>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v6h5" />
      <path d="M10 13h6" />
      <path d="M10 17h5" />
    </>
  ),
  event: (
    <>
      <path d="M6 5h12a2 2 0 0 1 2 2v12H4V7a2 2 0 0 1 2-2Z" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M4 10h16" />
      <path d="M8 14h3" />
      <path d="M13 14h3" />
    </>
  ),
  groups: (
    <>
      <path d="M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M17 11a3 3 0 1 0 0-6" />
      <path d="M3 21a6 6 0 0 1 12 0" />
      <path d="M15 18a5 5 0 0 1 6 3" />
    </>
  ),
  hub: (
    <>
      <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M5 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M19 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="m9.5 12.5-2 2" />
      <path d="m14.5 12.5 2 2" />
    </>
  ),
  inventory: (
    <>
      <path d="M4 7h16v13H4z" />
      <path d="M6 3h12v4H6z" />
      <path d="M9 11h6" />
      <path d="M9 15h6" />
    </>
  ),
  mail: (
    <>
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  monitoring: (
    <>
      <path d="M4 18h16" />
      <path d="M7 14v-4" />
      <path d="M12 14V6" />
      <path d="M17 14v-7" />
      <path d="m6 8 4-3 4 2 4-4" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 14 8 18l-2-2 4-4" />
      <path d="M11 13c-2-2-2-5 0-7 2-2 5-3 8-3 0 3-1 6-3 8-2 2-5 2-7 0Z" />
      <path d="M15 7h.01" />
      <path d="M7 17l-3 3" />
    </>
  ),
  settings: (
    <>
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="M19 12a7.5 7.5 0 0 0-.1-1.2l2-1.5-2-3.4-2.4 1a7 7 0 0 0-2-1.1L12.2 3h-4l-.3 2.8a7 7 0 0 0-2 1.1l-2.4-1-2 3.4 2 1.5A7.5 7.5 0 0 0 3.4 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.4-1a7 7 0 0 0 2 1.1l.3 2.8h4l.3-2.8a7 7 0 0 0 2-1.1l2.4 1 2-3.4-2-1.5c.1-.4.1-.8.1-1.2Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 21s7-3 7-10V5l-7-2-7 2v6c0 7 7 10 7 10Z" />
      <path d="m9 12 2 2 4-5" />
    </>
  ),
};

export function Icon({
  name,
  size = 'md',
  title,
  className,
  ...props
}: IconProps): ReactElement {
  return (
    <svg
      {...props}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={joinClasses('shrink-0 text-current', sizeClasses[size], className)}
      fill="none"
      focusable="false"
      role={title ? 'img' : undefined}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      {iconPaths[name]}
    </svg>
  );
}

export type { IconName, IconProps, IconSize };
