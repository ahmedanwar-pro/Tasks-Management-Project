import type { ReactElement, Ref, TextareaHTMLAttributes } from 'react';
import { joinClasses } from '../utils';

type TextareaVariant = 'filled' | 'bordered' | 'danger';
type TextareaSize = 'sm' | 'md' | 'lg';
type TextareaRadius = 'xs' | 'sm' | 'md';

type TextareaProps = {
  variant?: TextareaVariant;
  size?: TextareaSize;
  radius?: TextareaRadius;
  fullWidth?: boolean;
  invalid?: boolean;
  className?: string;
  ref?: Ref<HTMLTextAreaElement>;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>;

const baseClasses =
  'inline-flex shrink-0 resize-none border font-sans tracking-normal text-text-primary transition-colors duration-150 placeholder:text-text-muted focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary disabled:cursor-not-allowed disabled:opacity-60';

const variantClasses: Record<TextareaVariant, string> = {
  filled: 'border-transparent bg-primary-container-muted',
  bordered: 'border-border-muted bg-surface-low',
  danger: 'border-transparent bg-danger-container text-danger-text',
};

const sizeClasses: Record<TextareaSize, string> = {
  sm: 'min-h-[120px] px-4 py-3 text-body-sm leading-relaxed',
  md: 'min-h-[144px] px-4 py-3 text-body-md leading-relaxed',
  lg: 'min-h-[176px] px-4 py-4 text-body-md leading-relaxed',
};

const radiusClasses: Record<TextareaRadius, string> = {
  xs: 'rounded-xs',
  sm: 'rounded-sm',
  md: 'rounded-md',
};

export function Textarea({
  variant = 'filled',
  size = 'sm',
  radius = 'sm',
  fullWidth = true,
  invalid = false,
  className,
  ref,
  ...props
}: TextareaProps): ReactElement {
  const resolvedVariant = invalid ? 'danger' : variant;

  return (
    <textarea
      {...props}
      aria-invalid={invalid || props['aria-invalid'] || undefined}
      className={joinClasses(
        baseClasses,
        variantClasses[resolvedVariant],
        sizeClasses[size],
        radiusClasses[radius],
        fullWidth && 'w-full',
        className,
      )}
      ref={ref}
    />
  );
}
