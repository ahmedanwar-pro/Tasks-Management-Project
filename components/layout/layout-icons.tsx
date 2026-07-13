import type { ReactElement, SVGAttributes } from 'react';
import { joinClasses } from '@/components/ui/utils';

type LayoutIconName =
  | 'analytics'
  | 'chevron'
  | 'details'
  | 'epics'
  | 'logout'
  | 'menu'
  | 'members'
  | 'projects'
  | 'tasks';

type LayoutIconProps = {
  name: LayoutIconName;
  className?: string;
} & Omit<
  SVGAttributes<SVGSVGElement>,
  'children' | 'className' | 'height' | 'role' | 'viewBox' | 'width'
>;

const iconPaths: Record<LayoutIconName, ReactElement> = {
  analytics: (
    <>
      <path d="M5 19V5" />
      <path d="M5 19h15" />
      <path d="M9 14v-4" />
      <path d="M13 14V8" />
      <path d="M17 14V6" />
    </>
  ),
  chevron: <path d="m14.5 4-8 8 8 8" />,
  details: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6" />
      <path d="M12 7.25v.1" />
    </>
  ),
  epics: (
    <>
      <path d="M5 5h5v5H5z" />
      <path d="M14 5h5v5h-5z" />
      <path d="M14 14h5v5h-5z" />
      <path d="M10 7.5h4" />
      <path d="M7.5 10v4h6.5" />
    </>
  ),
  logout: (
    <>
      <path d="M10 4H5v16h5" />
      <path d="M13 8l4 4-4 4" />
      <path d="M8 12h9" />
    </>
  ),
  menu: (
    <>
      <path d="M3 6h18" />
      <path d="M3 12h18" />
      <path d="M3 18h18" />
    </>
  ),
  members: (
    <>
      <path d="M9.5 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M3 20a6.5 6.5 0 0 1 13 0H3Z" />
      <path d="M17 11a3 3 0 0 0 0-6" />
      <path d="M17 15a5 5 0 0 1 4 5" />
    </>
  ),
  projects: (
    <>
      <path d="M3 7h7l2 3h9v10H3V7Z" />
      <path d="M3 10h18" />
    </>
  ),
  tasks: (
    <>
      <path d="m4 7 2 2 3-4" />
      <path d="M12 7h8" />
      <path d="m4 15 2 2 3-4" />
      <path d="M12 15h8" />
    </>
  ),
};

export function LayoutIcon({
  name,
  className,
  ...props
}: LayoutIconProps): ReactElement {
  return (
    <svg
      {...props}
      aria-hidden="true"
      className={joinClasses('size-icon-md shrink-0', className)}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {iconPaths[name]}
    </svg>
  );
}

export type { LayoutIconName };
