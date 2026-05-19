import type { HTMLAttributes, ReactElement, Ref } from 'react';
import { joinClasses } from '../utils';

type SkeletonElement = 'div' | 'span';
type SkeletonVariant = 'line' | 'block' | 'avatar';
type SkeletonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type SkeletonRadius = 'xs' | 'sm' | 'md' | 'lg' | 'full';

type SkeletonProps = {
  as?: SkeletonElement;
  variant?: SkeletonVariant;
  size?: SkeletonSize;
  radius?: SkeletonRadius;
  fullWidth?: boolean;
  animated?: boolean;
  label?: string;
  className?: string;
  ref?: Ref<HTMLDivElement | HTMLSpanElement>;
} & Omit<HTMLAttributes<HTMLDivElement | HTMLSpanElement>, 'className'>;

const baseClasses =
  'inline-block shrink-0 bg-gradient-to-r from-surface-muted via-surface-low to-surface-muted text-transparent';

const variantClasses: Record<SkeletonVariant, string> = {
  line: 'rounded-xs',
  block: 'rounded-sm',
  avatar: 'rounded-lg',
};

const sizeClasses: Record<SkeletonVariant, Record<SkeletonSize, string>> = {
  line: {
    xs: 'h-3 w-12',
    sm: 'h-4 w-24',
    md: 'h-5 w-32',
    lg: 'h-6 w-48',
    xl: 'h-10 w-64',
  },
  block: {
    xs: 'h-6 w-20',
    sm: 'h-[var(--control-height-xs)] w-32',
    md: 'h-[var(--control-height-md)] w-40',
    lg: 'h-[var(--control-height-xl)] w-48',
    xl: 'h-32 w-full',
  },
  avatar: {
    xs: 'size-6',
    sm: 'size-8',
    md: 'size-10',
    lg: 'size-12',
    xl: 'size-16',
  },
};

const radiusClasses: Record<SkeletonRadius, string> = {
  xs: 'rounded-xs',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

export function Skeleton({
  as: Component = 'span',
  variant = 'line',
  size = 'sm',
  radius,
  fullWidth = false,
  animated = true,
  label,
  className,
  ref,
  ...props
}: SkeletonProps): ReactElement {
  const skeletonProps = {
    ...props,
    'aria-busy': label ? true : undefined,
    'aria-hidden': label ? undefined : true,
    'aria-label': label,
    className: joinClasses(
      baseClasses,
      variantClasses[variant],
      sizeClasses[variant][size],
      radius && radiusClasses[radius],
      fullWidth && 'w-full',
      animated && 'animate-pulse',
      className,
    ),
    role: label ? 'status' : undefined,
  };

  if (Component === 'div') {
    return (
      <div {...skeletonProps} ref={ref as Ref<HTMLDivElement> | undefined} />
    );
  }

  return (
    <span {...skeletonProps} ref={ref as Ref<HTMLSpanElement> | undefined} />
  );
}
