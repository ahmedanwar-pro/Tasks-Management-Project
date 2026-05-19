import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from 'react';
import { joinClasses } from '../utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'tonal' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: ReactNode;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className' | 'disabled' | 'onClick' | 'type'
>;

const baseClasses =
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-sm border border-transparent font-sans tracking-normal transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-primary to-primary-container text-text-inverse shadow-sm hover:from-primary-container hover:to-primary active:from-primary active:to-primary',
  secondary:
    'bg-transparent text-primary hover:bg-surface-low active:bg-surface-muted',
  ghost:
    'bg-transparent text-text-tertiary hover:bg-surface-low hover:text-text-primary active:bg-surface-muted',
  tonal:
    'bg-surface-low text-text-muted hover:bg-surface-muted hover:text-text-primary active:bg-surface-high',
  danger:
    'bg-danger text-text-inverse hover:bg-danger-text active:bg-danger-text',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-[var(--control-height-xs)] px-6 text-label-md font-semibold leading-compact',
  md: 'h-[var(--control-height-xl)] px-6 text-body-sm font-semibold leading-base md:h-[var(--control-height-lg)]',
  lg: 'h-[var(--control-height-2xl)] px-8 text-body-md font-semibold leading-relaxed md:h-[var(--control-height-lg)] md:text-body-sm md:leading-base',
};

function LoadingIndicator(): ReactElement {
  return (
    <span
      aria-hidden="true"
      className="size-icon-sm animate-spin rounded-full border-2 border-current border-r-transparent"
    />
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  iconLeft,
  iconRight,
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  className,
  children,
  ...props
}: ButtonProps): ReactElement {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={joinClasses(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      {loading ? <LoadingIndicator /> : iconLeft}
      <span>{children}</span>
      {!loading ? iconRight : null}
    </button>
  );
}
