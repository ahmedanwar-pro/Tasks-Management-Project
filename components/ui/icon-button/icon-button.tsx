import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from 'react';
import { joinClasses } from '../utils';

type IconButtonVariant = 'ghost' | 'subtle' | 'solid';
type IconButtonSize = 'sm' | 'md' | 'lg';

type IconButtonProps = {
  icon: ReactNode;
  'aria-label': string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-label' | 'children' | 'className' | 'disabled' | 'onClick' | 'type'
>;

const baseClasses =
  'inline-flex shrink-0 items-center justify-center rounded-sm border border-transparent transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60';

const variantClasses: Record<IconButtonVariant, string> = {
  ghost:
    'bg-transparent text-text-primary hover:bg-surface-low active:bg-surface-muted',
  subtle:
    'bg-surface-high text-text-tertiary hover:bg-surface-highest active:bg-surface-muted',
  solid:
    'bg-primary-container text-text-inverse shadow-sm hover:bg-primary active:bg-primary',
};

const sizeClasses: Record<IconButtonSize, string> = {
  sm: 'h-[var(--control-height-xs)] w-[var(--control-height-xs)]',
  md: 'h-[var(--control-height-md)] w-[var(--control-height-md)]',
  lg: 'h-[var(--control-height-xl)] w-[var(--control-height-xl)] rounded-lg',
};

const iconSizeClasses: Record<IconButtonSize, string> = {
  sm: 'size-icon-sm [&>svg]:size-icon-sm',
  md: 'size-icon-md [&>svg]:size-icon-md',
  lg: 'size-icon-lg [&>svg]:size-icon-lg',
};

export function IconButton({
  icon,
  'aria-label': ariaLabel,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  type = 'button',
  onClick,
  className,
  ...props
}: IconButtonProps): ReactElement {
  return (
    <button
      {...props}
      aria-label={ariaLabel}
      className={joinClasses(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      <span
        aria-hidden="true"
        className={joinClasses(
          'inline-flex items-center justify-center',
          iconSizeClasses[size],
        )}
      >
        {icon}
      </span>
    </button>
  );
}
