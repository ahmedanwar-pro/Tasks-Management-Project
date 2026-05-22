import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { joinClasses } from '../utils';

type FormErrorProps = {
  message: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLParagraphElement>, 'children' | 'className'>;

const baseClasses =
  'w-full rounded-sm border border-border-danger bg-danger-container px-4 py-3 font-sans text-body-sm font-medium leading-base tracking-normal text-danger-text break-words';

export function FormError({
  message,
  className,
  ...props
}: FormErrorProps): ReactElement {
  return (
    <p
      {...props}
      aria-atomic={props['aria-atomic'] ?? true}
      aria-live={props['aria-live'] ?? 'assertive'}
      className={joinClasses(baseClasses, className)}
      role={props.role ?? 'alert'}
    >
      {message}
    </p>
  );
}
