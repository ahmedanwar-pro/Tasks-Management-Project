'use client';

import { useEffect, useRef } from 'react';
import type { ReactElement } from 'react';
import { FormError } from '@/components/ui';

type AcceptInvitationFeedbackProps = {
  error?: string;
  success?: string;
};

export function AcceptInvitationFeedback({
  error,
  success,
}: AcceptInvitationFeedbackProps): ReactElement | null {
  const successRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (success) {
      successRef.current?.focus();
    }
  }, [success]);

  if (error) {
    return <FormError className="mb-4" message={error} />;
  }

  if (success) {
    return (
      <p
        aria-atomic="true"
        aria-live="polite"
        className="bg-success/20 text-success-icon text-body-sm leading-base mb-4 w-full rounded-sm px-4 py-3 font-sans font-medium tracking-normal"
        ref={successRef}
        role="status"
        tabIndex={-1}
      >
        {success}
      </p>
    );
  }

  return null;
}
