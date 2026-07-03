import type { ReactElement } from 'react';
import { FormError } from '@/components/ui';

type InviteMemberFeedbackProps = {
  error?: string;
  success?: string;
};

export function InviteMemberFeedback({
  error,
  success,
}: InviteMemberFeedbackProps): ReactElement | null {
  const toastClassName =
    'fixed top-4 right-4 left-4 z-[60] mt-0 !w-auto shadow-sm md:top-6 md:right-auto md:left-1/2 md:!w-[416px] md:-translate-x-1/2';

  if (error) {
    return <FormError className={toastClassName} message={error} />;
  }

  if (success) {
    return (
      <p
        aria-atomic="true"
        aria-live="polite"
        className={`bg-success/20 text-success-icon text-body-sm leading-base rounded-sm px-4 py-3 font-sans font-medium tracking-normal ${toastClassName}`}
        role="status"
      >
        {success}
      </p>
    );
  }

  return null;
}
