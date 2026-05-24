import type { ReactElement } from 'react';
import { SuccessIcon } from './forgot-password-icons';

type ForgotPasswordSuccessMessageProps = {
  variant: 'desktop' | 'mobile';
};

export function ForgotPasswordSuccessMessage({
  variant,
}: ForgotPasswordSuccessMessageProps): ReactElement {
  return (
    <>
      <SuccessIcon />
      {variant === 'desktop' ? (
        <p
          aria-atomic="true"
          aria-live="polite"
          className="text-body-sm max-w-68.5 leading-[17.5px]"
          role="status"
        >
          If an account exists with this email, we&apos;ve sent a password reset
          link.
        </p>
      ) : (
        <p
          aria-atomic="true"
          aria-live="polite"
          className="pr-2 text-(length:--text-label-md) leading-[19.5px] font-medium"
          role="status"
        >
          If an account exists with this email, we&apos;ve sent a password reset
          link.
        </p>
      )}
    </>
  );
}
