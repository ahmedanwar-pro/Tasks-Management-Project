import type {
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';
import { joinClasses } from '../utils';

type InputVariant = 'filled' | 'bordered' | 'danger';
type InputSize = 'sm' | 'md' | 'lg';
type InputRadius = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type InputProps = {
  variant?: InputVariant;
  size?: InputSize;
  radius?: InputRadius;
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconRightAriaHidden?: boolean;
  invalid?: boolean;
  className?: string;
  inputClassName?: string;
  ref?: Ref<HTMLInputElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'size'>;

const wrapperBaseClasses =
  'inline-flex shrink-0 items-center gap-3 border font-sans tracking-normal transition-colors duration-150 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary has-disabled:cursor-not-allowed has-disabled:opacity-60';

const variantClasses: Record<InputVariant, string> = {
  filled: 'border-transparent bg-primary-container-muted text-text-primary',
  bordered: 'border-border-muted bg-surface-low text-text-primary',
  danger: 'border-transparent bg-danger-container text-danger-text',
};

const sizeClasses: Record<InputSize, string> = {
  sm: 'h-[var(--control-height-sm)] px-3 text-body-sm leading-base',
  md: 'h-[var(--control-height-xl)] px-4 text-body-md leading-relaxed',
  lg: 'h-[var(--control-height-2xl)] px-4 text-body-md leading-relaxed',
};

const radiusClasses: Record<InputRadius, string> = {
  xs: 'rounded-xs',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
};

const inputBaseClasses =
  'min-w-0 flex-1 border-0 bg-transparent p-0 font-sans text-inherit outline-none placeholder:text-text-muted disabled:cursor-not-allowed';

const iconClasses =
  'inline-flex size-icon-md shrink-0 items-center justify-center text-text-tertiary [&>svg]:size-icon-md';

export function Input({
  variant = 'filled',
  size = 'md',
  radius = 'sm',
  fullWidth = false,
  iconLeft,
  iconRight,
  iconRightAriaHidden = true,
  invalid = false,
  className,
  inputClassName,
  ref,
  ...props
}: InputProps): ReactElement {
  const resolvedVariant = invalid ? 'danger' : variant;

  return (
    <div
      className={joinClasses(
        wrapperBaseClasses,
        variantClasses[resolvedVariant],
        sizeClasses[size],
        radiusClasses[radius],
        fullWidth && 'w-full',
        className,
      )}
    >
      {iconLeft ? (
        <span aria-hidden="true" className={iconClasses}>
          {iconLeft}
        </span>
      ) : null}
      <input
        {...props}
        aria-invalid={invalid || props['aria-invalid'] || undefined}
        className={joinClasses(inputBaseClasses, inputClassName)}
        ref={ref}
        suppressHydrationWarning
      />
      {iconRight ? (
        <span aria-hidden={iconRightAriaHidden} className={iconClasses}>
          {iconRight}
        </span>
      ) : null}
    </div>
  );
}
