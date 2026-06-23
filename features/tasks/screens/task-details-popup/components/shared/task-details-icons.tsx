import type { ReactElement, ReactNode, SVGProps } from 'react';
import { joinClasses } from '@/components/ui/utils';

const EPIC_ICON_SRC =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAANCAYAAACdKY9CAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAAYNJREFUeAFlUj1PAkEQfaeGwsMSgY4oP8AGCyhNLDQxkagFCEEbvkogdgZKRe3A2KhcaMSgFFJAo82RiA0ateGEkg9LxHbd3cCBx0s2uzuzM/PmzQqEAmPo938hSTkQAQgFfNBCGA/odL5xmDime5ffRVHEWTIBo9EwiiAD1GrvZMPpJf5glLRaHb7c3iBxeYJElp+HzwgPyEg5srK6RVLnl6TX+1Gd7JxKX3FfRrrhtmlRb4jfFYpwbq5RznvQ6XRqdXa22ZYYc0jZW7S7XUx5drdhMhkgV15QqVQnmpTlKvKFB1gXLfC6d0Y9aEszpAe2caozpfITVyUU9MFE1UhfXKP29kFJCPhqNBHy++B0riN/X8ScOIsZJiXjp1BnOLAPu92G6EGclgZOjuIwm42IxOJ4pUlYMKekKA1Vwna7yyVlFBSlSVzU7qb2er3BKamDow+RPE3RTJ88E5u0lM3BumBBLBKmwsz/H9wQw5kMm9VC0P4lhlL5EXr6LRyO5QmZ/wAVDi5C5uVqagAAAABJRU5ErkJggg==';
const CREATED_AT_ICON_SRC =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAAVFJREFUeAFNUU1OAlEMbgtjookETyCcgPEEsjYRxq2JzHgCXYq4GBMJcSXcYBgTt/yYuB5uwA2EG0wwYuJzWjvoAC9pXtP2a79+xVqj6S7oa7Sf7FaIyAcAW60IIFMRCsbhQw/+H9bdlohAHxFcdXpMNMxDPmY2FQS4BxQxBqtvL+05rRCrQvAWi6WPSSIsxh2H7f4obJc0PbUsDtI6Wo9ACAqFvSv1ygjibOI7lwg5+/SieUyIVjkzouWaX/aGgR+L8kfM2UTfRjQw+7NunAd5136ls0bL3UAkBuAiJZZEta3E4LkzEWGPldYaIHAkgFPSxQJEud4ePQ47fZYfBy2IUmmVuHzQ50Sl3emB4EHdvR2cnLcOM8Br+DgyBmxE6mpDP1KKmCYc76akB3hSrqoCR/rPNFxVsYppYXYY3B7veHdVZq6kFxSCeQ6Ww3TpLP8LG6ybG22YCBcAAAAASUVORK5CYII=';

type TaskDetailsIconProps = {
  children: ReactNode;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, 'children' | 'className'>;

function BaseIcon({
  children,
  className,
  ...props
}: TaskDetailsIconProps): ReactElement {
  return (
    <svg
      {...props}
      aria-hidden="true"
      className={joinClasses('shrink-0 text-current', className)}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

export function TaskDetailsCopyLinkIcon(): ReactElement {
  return (
    <BaseIcon className="h-[7.5px] w-[15px]" viewBox="0 0 20 10">
      <path d="M8.25 2.05 6.9 2.05a3 3 0 0 0 0 6h2.35a3 3 0 0 0 2.4-1.2" />
      <path d="M11.75 7.95h1.35a3 3 0 0 0 0-6h-2.35a3 3 0 0 0-2.4 1.2" />
      <path d="M7.5 5h5" />
    </BaseIcon>
  );
}

export function TaskDetailsEpicIcon({
  className,
}: {
  className?: string;
}): ReactElement {
  return (
    <span
      aria-hidden="true"
      className={joinClasses(
        'inline-block h-[12.7px] w-3 shrink-0 bg-contain bg-center bg-no-repeat',
        className,
      )}
      style={{ backgroundImage: `url("${EPIC_ICON_SRC}")` }}
    />
  );
}

export function TaskDetailsChevronDownIcon(): ReactElement {
  return (
    <BaseIcon className="h-[4.933px] w-2" viewBox="0 0 10 6">
      <path d="m1 1 4 4 4-4" />
    </BaseIcon>
  );
}

export function TaskDetailsCloseIcon(): ReactElement {
  return (
    <BaseIcon className="size-3.5" viewBox="0 0 16 16">
      <path d="m3.5 3.5 9 9" />
      <path d="m12.5 3.5-9 9" />
    </BaseIcon>
  );
}

export function TaskDetailsCheckIcon(): ReactElement {
  return (
    <BaseIcon className="size-[11.667px]" viewBox="0 0 14 14">
      <path d="M11.6 3.8 5.8 9.6 2.8 6.6" />
    </BaseIcon>
  );
}

export function TaskDetailsCreatedAtIcon({
  className,
}: {
  className?: string;
}): ReactElement {
  return (
    <span
      aria-hidden="true"
      className={joinClasses(
        'inline-block size-[10.5px] shrink-0 bg-contain bg-center bg-no-repeat',
        className,
      )}
      style={{ backgroundImage: `url("${CREATED_AT_ICON_SRC}")` }}
    />
  );
}

export function TaskDetailsCalendarIcon({
  className,
  variant = 'square',
}: {
  className?: string;
  variant?: 'square' | 'tall';
}): ReactElement {
  const sizeClassName =
    variant === 'tall' ? 'h-[11.667px] w-[10.5px]' : 'size-[10.5px]';

  return (
    <BaseIcon
      className={joinClasses(sizeClassName, className)}
      viewBox="0 0 14 14"
    >
      <path d="M3.2 1.8v2" />
      <path d="M10.8 1.8v2" />
      <path d="M2 4h10" />
      <path d="M2 3h10v9H2z" />
    </BaseIcon>
  );
}
