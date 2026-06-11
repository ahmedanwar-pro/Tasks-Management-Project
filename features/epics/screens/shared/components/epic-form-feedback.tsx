import type { ReactElement } from 'react';
import { FormError } from '@/components/ui';

type EpicFormFeedbackProps = {
  error?: string;
  success?: string;
};

export function EpicFormFeedback({
  error,
  success,
}: EpicFormFeedbackProps): ReactElement | null {
  if (error) {
    return <FormError className="shadow-sm" message={error} />;
  }

  if (success) {
    return (
      <p
        aria-atomic="true"
        aria-live="polite"
        className="bg-success/20 text-success-icon text-body-sm leading-base w-full rounded-sm px-4 py-3 font-sans font-medium tracking-normal shadow-sm"
        role="status"
      >
        {success}
      </p>
    );
  }

  return null;
}
