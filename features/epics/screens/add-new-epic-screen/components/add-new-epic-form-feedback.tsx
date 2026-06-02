import type { ReactElement } from 'react';
import { FormError } from '@/components/ui';

type AddNewEpicFormFeedbackProps = {
  error?: Error | null;
  success: boolean;
};

export function AddNewEpicFormFeedback({
  error,
  success,
}: AddNewEpicFormFeedbackProps): ReactElement | null {
  if (error) {
    return (
      <FormError
        className="shadow-sm"
        message={`Failed to create epic: ${error.message}`}
      />
    );
  }

  if (success) {
    return (
      <p
        aria-atomic="true"
        aria-live="polite"
        className="bg-success/20 text-success-icon text-body-sm leading-base w-full rounded-sm px-4 py-3 font-sans font-medium tracking-normal shadow-sm"
        role="status"
      >
        Epic created successfully
      </p>
    );
  }

  return null;
}
