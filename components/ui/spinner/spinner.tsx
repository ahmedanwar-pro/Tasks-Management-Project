import type { HTMLAttributes, ReactElement, Ref } from 'react';
import { joinClasses } from '../utils';

type SpinnerSize = 'sm' | 'md' | 'lg';

type SpinnerProps = {
  size?: SpinnerSize;
  ref?: Ref<HTMLSpanElement>;
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children'>;

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'size-icon-sm',
  md: 'size-icon-md',
  lg: 'size-icon-lg',
};

export function Spinner({
  size = 'md',
  className,
  ref,
  ...props
}: SpinnerProps): ReactElement {
  return (
    <span
      {...props}
      aria-hidden="true"
      className={joinClasses(
        'inline-block shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent',
        sizeClasses[size],
        className,
      )}
      ref={ref}
    />
  );
}
