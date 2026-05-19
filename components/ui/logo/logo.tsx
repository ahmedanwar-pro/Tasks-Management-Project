import type { HTMLAttributes, ReactElement } from 'react';
import { joinClasses } from '../utils';

type LogoVariant = 'full' | 'icon';
type LogoSize = 'sm' | 'md' | 'lg';

type LogoProps = {
  variant?: LogoVariant;
  size?: LogoSize;
  label?: string;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className'>;

const gapClasses: Record<LogoSize, string> = {
  sm: 'gap-1.5',
  md: 'gap-2',
  lg: 'gap-2.5',
};

const markClasses: Record<LogoSize, string> = {
  sm: 'h-[16px] w-[14px]',
  md: 'h-5 w-[18px]',
  lg: 'h-6 w-[22px]',
};

const textClasses: Record<LogoSize, string> = {
  sm: 'text-body-md leading-relaxed tracking-tight',
  md: 'text-title-lg leading-title tracking-tight',
  lg: 'text-[24px] leading-section tracking-heading',
};

function LogoMark({ className }: { className?: string }): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className={joinClasses('shrink-0 text-primary-container', className)}
      fill="none"
      focusable="false"
      viewBox="0 0 18 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 1.5 16 5.5v8.9l-7 4.1-7-4.1V5.5l7-4Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M9 5.2 12.8 7.4v4.8L9 14.4l-3.8-2.2V7.4L9 5.2Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
      <path
        d="M9 5.2v4.6l3.8-2.4M9 9.8 5.2 7.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function Logo({
  variant = 'full',
  size = 'md',
  label = 'TASKLY',
  className,
  ...props
}: LogoProps): ReactElement {
  const isIconOnly = variant === 'icon';

  return (
    <div
      {...props}
      aria-label={isIconOnly ? label : undefined}
      className={joinClasses(
        'inline-flex shrink-0 items-center font-sans font-bold text-text-primary',
        gapClasses[size],
        className,
      )}
      role={isIconOnly ? 'img' : undefined}
    >
      <LogoMark className={markClasses[size]} />
      {isIconOnly ? null : (
        <span className={joinClasses('select-none', textClasses[size])}>
          {label}
        </span>
      )}
    </div>
  );
}

export type { LogoProps, LogoSize, LogoVariant };
