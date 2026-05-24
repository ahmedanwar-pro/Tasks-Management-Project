import type { ReactElement } from 'react';

export function ResetPasswordSuccessMessage(): ReactElement {
  return (
    <p
      aria-atomic="true"
      aria-live="polite"
      className="bg-success/20 text-success-icon text-body-sm leading-base w-full rounded-sm px-4 py-3 font-sans font-medium tracking-normal"
      role="status"
    >
      Your password has been updated successfully. You can now log in
    </p>
  );
}
