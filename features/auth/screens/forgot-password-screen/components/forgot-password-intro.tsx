import type { ReactElement } from 'react';
import { PasswordResetIcon } from './forgot-password-icons';

export function ForgotPasswordIntro(): ReactElement {
  return (
    <>
      <div className="flex h-18 w-12 items-start pb-6 md:hidden">
        <div className="bg-primary-container-muted text-primary-container flex size-12 items-center justify-center rounded-lg">
          <PasswordResetIcon />
        </div>
      </div>

      <div className="flex flex-col items-center pb-8 text-center md:items-start md:gap-1.75 md:pb-0 md:text-left">
        <h1 className="leading-section text-text-primary md:leading-display text-[length:var(--text-headline-md)] font-semibold tracking-normal md:text-[length:var(--text-headline-lg)]">
          Forgot password?
        </h1>
        <p className="text-body-sm leading-base text-text-secondary mt-2 max-w-53.25 md:mt-0 md:max-w-none md:leading-[22.75px]">
          No worries, we&apos;ll send you reset instructions.
        </p>
      </div>
    </>
  );
}
