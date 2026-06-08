import type { ReactElement, SVGAttributes } from 'react';
import { joinClasses } from '@/components/ui/utils';

type IconProps = {
  className?: string;
} & Omit<
  SVGAttributes<SVGSVGElement>,
  'children' | 'className' | 'height' | 'role' | 'viewBox' | 'width'
>;

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
