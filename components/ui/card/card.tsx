import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { joinClasses } from '../utils';

type CardElement = 'article' | 'div' | 'section';
type CardVariant =
  | 'default'
  | 'elevated'
  | 'outlined'
  | 'muted'
  | 'selected'
  | 'danger';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';
type CardRadius = 'md' | 'xl';

type CardProps = {
  as?: CardElement;
  variant?: CardVariant;
  padding?: CardPadding;
  radius?: CardRadius;
  className?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, 'children' | 'className'>;

const baseClasses =
  'overflow-hidden border font-sans text-text-primary tracking-normal';

const variantClasses: Record<CardVariant, string> = {
  default: 'border-transparent bg-surface',
  elevated: 'border-transparent bg-surface shadow-card',
  outlined: 'border-border-muted bg-surface',
  muted: 'border-transparent bg-surface-low',
  selected: 'border-primary bg-surface shadow-card',
  danger: 'border-danger bg-danger-container shadow-card',
};

const paddingClasses: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const radiusClasses: Record<CardRadius, string> = {
  md: 'rounded-md',
  xl: 'rounded-xl',
};

export function Card({
  as: Component = 'article',
  variant = 'default',
  padding = 'md',
  radius = 'md',
  className,
  children,
  ...props
}: CardProps): ReactElement {
  return (
    <Component
      {...props}
      className={joinClasses(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        radiusClasses[radius],
        className,
      )}
    >
      {children}
    </Component>
  );
}
