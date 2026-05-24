import type { ReactElement } from 'react';

type ResetPasswordIntroProps = {
  variant: 'desktop' | 'mobile';
};

export function ResetPasswordIntro({
  variant,
}: ResetPasswordIntroProps): ReactElement {
  return (
    <header
      className={
        variant === 'mobile'
          ? 'flex flex-col items-center gap-2 text-center md:hidden'
          : 'hidden flex-col items-start gap-4 md:flex'
      }
    >
      <h1 className="text-text-primary tracking-heading text-(length:--text-headline-md) leading-7.5 font-semibold">
        Create a New Password
      </h1>
      <p className="text-body-sm leading-base text-text-secondary flex min-h-10.5 max-w-76.25 items-center md:min-h-0 md:max-w-103.5 md:items-start">
        <span>
          Create a new, strong password to secure your workstation{' '}
          <br className="hidden md:block" />
          access.
        </span>
      </p>
    </header>
  );
}
