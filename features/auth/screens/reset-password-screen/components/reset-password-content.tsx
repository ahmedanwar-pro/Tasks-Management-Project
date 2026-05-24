import type { ReactElement } from 'react';
import { ResetPasswordForm } from './reset-password-form';
import { ResetPasswordIntro } from './reset-password-intro';

export function ResetPasswordContent(): ReactElement {
  return (
    <div className="relative flex w-full max-w-120 flex-col gap-8 md:max-w-lg md:gap-0">
      <ResetPasswordIntro variant="mobile" />

      <div className="relative">
        <div
          aria-hidden="true"
          className="bg-surface-low -top-0-75 absolute inset-x-0 bottom-1.25 hidden rounded-md md:block"
        />

        <div className="bg-surface border-border-strong relative w-full rounded-md border px-8.25 pt-8.25 pb-12.25 shadow-[0px_24px_24px_rgba(4,27,60,0.06)] md:min-h-169.5 md:px-12 md:pt-9 md:pb-8 md:shadow-[0px_24px_48px_-12px_rgba(4,27,60,0.06)] md:backdrop-blur-md">
          <ResetPasswordIntro variant="desktop" />
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}
