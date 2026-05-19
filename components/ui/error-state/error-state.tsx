import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { joinClasses } from '../utils';

type ErrorStateVariant = 'inline' | 'surface' | 'card' | 'metric';
type ErrorStateSize = 'sm' | 'md' | 'lg';

type ErrorStateProps = {
  title?: ReactNode;
  message: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  variant?: ErrorStateVariant;
  size?: ErrorStateSize;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'title'>;

const baseClasses = 'font-sans tracking-normal';

const variantClasses: Record<ErrorStateVariant, string> = {
  inline: 'text-danger',
  surface: 'rounded-sm bg-danger-container text-danger-text',
  card: 'rounded-md border border-danger bg-danger-container text-text-primary shadow-card',
  metric: 'rounded-md bg-surface text-text-primary',
};

const layoutClasses: Record<ErrorStateVariant, string> = {
  inline: 'flex items-start gap-2',
  surface: 'flex items-center gap-2',
  card: 'flex flex-col gap-3',
  metric: 'flex flex-col justify-center',
};

const sizeClasses: Record<ErrorStateVariant, Record<ErrorStateSize, string>> = {
  inline: {
    sm: 'text-label-sm font-medium leading-compact',
    md: 'text-label-md font-medium leading-tight',
    lg: 'text-body-sm font-medium leading-base',
  },
  surface: {
    sm: 'min-h-[44px] px-4 py-3 text-body-sm leading-base',
    md: 'min-h-[48px] px-4 py-3 text-body-sm leading-base',
    lg: 'min-h-[56px] px-5 py-4 text-body-md leading-relaxed',
  },
  card: {
    sm: 'min-h-[104px] p-4',
    md: 'min-h-[113px] p-4',
    lg: 'min-h-[148px] p-6',
  },
  metric: {
    sm: 'min-h-[113px] px-4 py-5 shadow-card',
    md: 'min-h-[104px] px-6 py-6',
    lg: 'min-h-[148px] px-6 py-8 shadow-card',
  },
};

const iconClasses: Record<ErrorStateSize, string> = {
  sm: 'size-icon-sm [&>svg]:size-icon-sm',
  md: 'size-icon-md [&>svg]:size-icon-md',
  lg: 'size-icon-lg [&>svg]:size-icon-lg',
};

const titleClasses: Record<ErrorStateVariant, string> = {
  inline: 'font-medium',
  surface: 'text-label-sm font-bold leading-compact text-danger',
  card: 'text-body-sm font-medium leading-base text-text-primary',
  metric: 'text-label-md font-bold leading-tight text-text-primary',
};

const messageClasses: Record<ErrorStateVariant, Record<ErrorStateSize, string>> = {
  inline: {
    sm: 'text-label-sm font-medium leading-compact text-danger',
    md: 'text-label-md font-medium leading-tight text-danger',
    lg: 'text-body-sm font-medium leading-base text-danger',
  },
  surface: {
    sm: 'text-body-sm leading-base text-danger-text',
    md: 'text-body-sm leading-base text-danger-text',
    lg: 'text-body-md leading-relaxed text-danger-text',
  },
  card: {
    sm: 'text-body-sm font-medium leading-base text-text-primary',
    md: 'text-body-sm font-medium leading-base text-text-primary',
    lg: 'text-body-md font-medium leading-relaxed text-text-primary',
  },
  metric: {
    sm: 'text-title-lg font-bold leading-title text-danger',
    md: 'text-[30px] font-bold leading-[36px] text-danger',
    lg: 'text-[30px] font-bold leading-[36px] text-danger',
  },
};

export function ErrorState({
  title,
  message,
  icon,
  action,
  variant = 'inline',
  size = 'md',
  className,
  ...props
}: ErrorStateProps): ReactElement {
  return (
    <section
      {...props}
      aria-live={props['aria-live'] ?? 'polite'}
      className={joinClasses(
        baseClasses,
        variantClasses[variant],
        layoutClasses[variant],
        sizeClasses[variant][size],
        className,
      )}
      role={props.role ?? 'status'}
    >
      {icon ? (
        <span
          aria-hidden="true"
          className={joinClasses(
            'inline-flex shrink-0 items-center justify-center text-danger',
            iconClasses[size],
          )}
        >
          {icon}
        </span>
      ) : null}
      <div className="min-w-0">
        {title ? <p className={titleClasses[variant]}>{title}</p> : null}
        <p className={messageClasses[variant][size]}>{message}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </section>
  );
}
