import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { joinClasses } from '../utils';

type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'success'
  | 'danger'
  | 'outline';
type BadgeSize = 'sm' | 'md';
type BadgeShape = 'rounded' | 'pill';

type BadgeProps = {
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
  className?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'className'>;

const baseClasses =
  'inline-flex shrink-0 items-center justify-center whitespace-nowrap border border-transparent font-sans font-bold tracking-normal';

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-primary-container text-text-inverse',
  secondary: 'bg-primary-container-muted text-text-secondary',
  neutral: 'bg-surface-muted text-text-secondary',
  success: 'bg-success text-success-text',
  danger: 'bg-danger-container text-danger-text',
  outline: 'border-primary bg-surface text-primary',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'min-h-[17px] px-2 py-0 text-label-sm leading-compact',
  md: 'min-h-6 px-3 py-1 text-label-md leading-tight',
};

const shapeClasses: Record<BadgeShape, string> = {
  rounded: 'rounded-xs',
  pill: 'rounded-lg',
};

export function Badge({
  variant = 'neutral',
  size = 'sm',
  shape = 'rounded',
  className,
  children,
  ...props
}: BadgeProps): ReactElement {
  return (
    <span
      {...props}
      className={joinClasses(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        shapeClasses[shape],
        className,
      )}
    >
      {children}
    </span>
  );
}
