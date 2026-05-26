import type { ReactElement } from 'react';
import { FormError } from '@/components/ui';

type ProjectFormToastProps = {
  error?: string;
  success?: string;
};

export function ProjectFormToast({
  error,
  success,
}: ProjectFormToastProps): ReactElement | null {
  if (error) {
    return (
      <div className="mx-auto mb-6 w-full max-w-2xl lg:mb-4">
        <FormError className="shadow-sm" message={error} />
      </div>
    );
  }

  if (success) {
    return (
      <p
        aria-atomic="true"
        aria-live="polite"
        className="bg-success/20 text-success-icon text-body-sm leading-base mx-auto mb-6 w-full max-w-2xl rounded-sm px-4 py-3 font-sans font-medium tracking-normal shadow-sm lg:mb-4"
        role="status"
      >
        {success}
      </p>
    );
  }

  return null;
}
