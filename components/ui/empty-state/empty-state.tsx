import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { joinClasses } from '../utils';

type EmptyStateVariant = 'framed' | 'plain' | 'add';
type EmptyStateSize = 'sm' | 'md' | 'lg';

type EmptyStateProps = {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  variant?: EmptyStateVariant;
  size?: EmptyStateSize;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'title'>;

const baseClasses =
  'flex flex-col items-center justify-center text-center font-sans tracking-normal';

const variantClasses: Record<EmptyStateVariant, string> = {
  framed: 'rounded-md border border-border-muted bg-surface-low',
  plain: 'bg-transparent',
  add: 'rounded-md border border-border-muted bg-surface',
};

const sizeClasses: Record<EmptyStateSize, string> = {
  sm: 'min-h-[216px] gap-4 px-6 py-8',
  md: 'min-h-[248px] gap-5 px-8 py-10',
  lg: 'min-h-[304px] gap-6 px-10 py-12',
};

const iconClasses: Record<EmptyStateSize, string> = {
  sm: 'mb-1 size-10 text-text-tertiary [&>svg]:size-10',
  md: 'mb-1 size-12 text-text-tertiary [&>svg]:size-12',
  lg: 'mb-2 size-12 text-text-tertiary [&>svg]:size-12',
};

const titleClasses: Record<EmptyStateSize, string> = {
  sm: 'text-body-sm font-medium leading-base text-text-primary',
  md: 'text-body-md font-medium leading-relaxed text-text-primary',
  lg: 'text-title-md font-medium leading-title text-text-primary',
};

const descriptionClasses: Record<EmptyStateSize, string> = {
  sm: 'max-w-[262px] text-body-sm leading-base text-text-tertiary',
  md: 'max-w-[448px] text-body-md leading-relaxed text-text-primary',
  lg: 'max-w-[448px] text-body-lg leading-[29.25px] text-text-secondary',
};

export function EmptyState({
  title,
  description,
  icon,
  action,
  variant = 'framed',
  size = 'md',
  className,
  ...props
}: EmptyStateProps): ReactElement {
  return (
    <section
      {...props}
      className={joinClasses(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {icon ? (
        <div aria-hidden="true" className={joinClasses('inline-flex', iconClasses[size])}>
          {icon}
        </div>
      ) : null}
      <div className="flex max-w-full flex-col items-center gap-2">
        {title ? <h2 className={titleClasses[size]}>{title}</h2> : null}
        {description ? (
          <p className={descriptionClasses[size]}>{description}</p>
        ) : null}
      </div>
      {action ? <div className="flex shrink-0 items-center justify-center">{action}</div> : null}
    </section>
  );
}
